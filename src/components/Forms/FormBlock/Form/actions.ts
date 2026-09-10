"use server";

import { decrementFormSubmissionLimit } from "@/Utils/datafetcher";
import { decrementFormCheckboxLimits } from "@/Utils/datafetcher";
import { decrementFormSelectLimits } from "@/Utils/datafetcher";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { headers } from "next/headers";
import { env } from "@/env.mjs";

const parsePositiveID = (value: string, label: string) => {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw new Error(`Invalid ${label}`);
  }
  return parsed;
};

const relationID = (value: unknown) => {
  if (value && typeof value === "object" && "id" in value) {
    return String((value as { id: string | number }).id);
  }
  return String(value);
};

const assertRecentSubmission = async (formID: number, submissionID: number) => {
  const payload = await getPayload({ config: configPromise });
  const submission = await payload.findByID({
    collection: "form-submissions",
    id: submissionID,
  });
  const createdAt = new Date(submission.createdAt).getTime();

  if (relationID(submission.form) !== String(formID)) {
    throw new Error("Submission does not belong to this form");
  }
  if (!Number.isFinite(createdAt) || Date.now() - createdAt > 5 * 60_000) {
    throw new Error("Submission is too old to process");
  }
};

export async function decrementSubmissionLimit(
  formID: string,
  submissionID: string
): Promise<number> {
  const parsedFormID = parsePositiveID(formID, "form ID");
  const parsedSubmissionID = parsePositiveID(submissionID, "submission ID");
  const payload = await getPayload({ config: configPromise });
  try {
    await assertRecentSubmission(parsedFormID, parsedSubmissionID);
    return await decrementFormSubmissionLimit(formID);
  } catch (err) {
    payload.logger.error(
      `[decrementSubmissionLimit] Failed to decrement submission limit for form ${formID}: ${err}`
    );
    throw err;
  }
}

export async function decrementChoiceLimits(
  formID: string,
  submissionID: string,
  submissionData: Record<string, unknown>
): Promise<void> {
  const parsedFormID = parsePositiveID(formID, "form ID");
  const parsedSubmissionID = parsePositiveID(submissionID, "submission ID");
  const payload = await getPayload({ config: configPromise });
  try {
    await assertRecentSubmission(parsedFormID, parsedSubmissionID);
    await Promise.all([
      decrementFormCheckboxLimits(formID, submissionData),
      decrementFormSelectLimits(formID, submissionData),
    ]);
  } catch (err) {
    payload.logger.error(
      `[decrementChoiceLimits] Failed to decrement choice limits for form ${formID}: ${err}`
    );
    throw err;
  }
}

export async function submitConfiguredWebhook(
  formID: string,
  submissionID: string,
  submissionData: Record<string, unknown>
): Promise<void> {
  const parsedFormID = parsePositiveID(formID, "form ID");
  const parsedSubmissionID = parsePositiveID(submissionID, "submission ID");
  const payload = await getPayload({ config: configPromise });

  const [form, submission] = await Promise.all([
    payload.findByID({ collection: "forms", id: parsedFormID }),
    payload.findByID({
      collection: "form-submissions",
      id: parsedSubmissionID,
    }),
  ]);

  if (relationID(submission.form) !== String(parsedFormID)) {
    throw new Error("Submission does not belong to this form");
  }
  const createdAt = new Date(submission.createdAt).getTime();
  if (!Number.isFinite(createdAt) || Date.now() - createdAt > 5 * 60_000) {
    throw new Error("Submission is too old to send a webhook");
  }
  if (!form.webhook) return;

  const serverURL = env.NEXT_PUBLIC_SERVER_URL;
  if (!serverURL) throw new Error("NEXT_PUBLIC_SERVER_URL is required");

  const appOrigin = new URL(serverURL).origin;
  const webhookURL = new URL(form.webhook, appOrigin);
  const requestHeaders = await headers();
  const isInternalGoogleSheetsWebhook =
    webhookURL.origin === appOrigin &&
    webhookURL.pathname.startsWith("/api/webhooks/google-sheets/");
  const isAllowedZapierWebhook =
    webhookURL.protocol === "https:" &&
    webhookURL.hostname === "hooks.zapier.com";

  if (!isInternalGoogleSheetsWebhook && !isAllowedZapierWebhook) {
    throw new Error("Configured webhook destination is not allowed");
  }

  const response = await fetch(webhookURL, {
    body: JSON.stringify(submissionData),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(isInternalGoogleSheetsWebhook
        ? {
            Authorization: `Bearer ${env.PAYLOAD_SECRET}`,
            "X-Internal-Client-IP":
              requestHeaders.get("x-real-ip") ??
              requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ??
              "unknown",
          }
        : {}),
    },
  });

  if (!response.ok) {
    throw new Error(`Configured webhook failed with ${response.status}`);
  }
}

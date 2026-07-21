import Newsletter from "../../emails/general";
import type { Individual } from "@/payload-types";
import { resend } from "@/Utils/resend";
import type { Payload } from "payload";

type SendDistributionEmailArgs = {
  payload: Payload;
  distributionList: unknown;
  subject: unknown;
  contentHtml: unknown;
};

function getRelationshipId(value: unknown): number | string | null {
  if (typeof value === "number" || typeof value === "string") return value;

  if (
    value &&
    typeof value === "object" &&
    "id" in value &&
    (typeof value.id === "number" || typeof value.id === "string")
  ) {
    return value.id;
  }

  return null;
}

function getAudienceId() {
  return (
    process.env.RESEND_AUDIENCE_ID || process.env.NEXT_PUBLIC_RESEND_AUDIENCE_ID
  );
}

export async function sendDistributionEmail({
  payload,
  distributionList,
  subject,
  contentHtml,
}: SendDistributionEmailArgs) {
  const listId = getRelationshipId(distributionList);
  const safeSubject = typeof subject === "string" ? subject.trim() : "";
  const safeContentHtml =
    typeof contentHtml === "string" ? contentHtml.trim() : "";

  if (!listId) throw new Error("A distribution list is required.");
  if (!safeSubject) throw new Error("An email subject is required.");
  if (!safeContentHtml) throw new Error("Email content is required.");

  const list = await payload.findByID({
    collection: "distribution-list",
    id: listId,
    depth: 1,
  });

  if (list.listName.trim().toLowerCase() === "newsletter") {
    const audienceId = getAudienceId();
    if (!audienceId) {
      throw new Error("RESEND_AUDIENCE_ID is not configured.");
    }

    const { data, error } = await resend.broadcasts.create({
      audienceId,
      from: "WLU MSA <admin@wlumsa.org>",
      subject: safeSubject,
      react: Newsletter({ firstName: "", content: safeContentHtml }),
    });

    if (error) throw new Error(`Unable to create broadcast: ${error.message}`);

    const { error: sendError } = await resend.broadcasts.send(data.id);
    if (sendError) {
      throw new Error(`Unable to send broadcast: ${sendError.message}`);
    }

    return;
  }

  const recipients = list.emails
    .filter((entry): entry is Individual => typeof entry === "object")
    .filter(
      (entry, index, entries) =>
        entries.findIndex((candidate) => candidate.email === entry.email) ===
        index
    );

  if (recipients.length === 0) {
    throw new Error("The selected distribution list has no recipients.");
  }

  for (let index = 0; index < recipients.length; index += 100) {
    const batch = recipients.slice(index, index + 100).map((recipient) => ({
      from: "WLU MSA <admin@wlumsa.org>",
      to: [recipient.email],
      subject: safeSubject,
      react: Newsletter({
        firstName: recipient.firstName,
        content: safeContentHtml,
      }),
    }));

    const { error } = await resend.batch.send(batch);
    if (error) throw new Error(`Unable to send email batch: ${error.message}`);
  }
}

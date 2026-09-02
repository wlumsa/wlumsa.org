import { NextRequest, NextResponse } from "next/server";
import { auth, sheets as createSheetsClient } from "@googleapis/sheets";
import { timingSafeEqual } from "node:crypto";
import { env } from "@/env.mjs";
import { resend } from "@/Utils/resend";

export const runtime = "nodejs";

type Params = Promise<{ form: string }>;

type FlatValue = string | number | boolean | null | undefined;

type JsonRecord = Record<string, unknown>;

const MAX_BODY_BYTES = 32 * 1024;
const MAX_FLATTENED_FIELDS = 100;
const MAX_NESTING_DEPTH = 8;
const RATE_LIMIT = 10;
const RATE_WINDOW_MS = 60_000;

type RateLimitEntry = { count: number; resetAt: number };

const rateLimits = new Map<string, RateLimitEntry>();

const getClientIP = (request: NextRequest) =>
  request.headers.get("x-internal-client-ip") ??
  request.headers.get("x-real-ip") ??
  request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
  "unknown";

const isRateLimited = (request: NextRequest) => {
  const now = Date.now();
  const key = getClientIP(request);
  const current = rateLimits.get(key);

  if (!current || current.resetAt <= now) {
    rateLimits.set(key, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }

  current.count += 1;
  return current.count > RATE_LIMIT;
};

const isAuthorized = (request: NextRequest) => {
  const authorization = request.headers.get("authorization");
  if (!authorization?.startsWith("Bearer ")) return false;

  const provided = Buffer.from(authorization.slice("Bearer ".length));
  const expected = Buffer.from(env.PAYLOAD_SECRET);
  return (
    provided.length === expected.length && timingSafeEqual(provided, expected)
  );
};

const escapeHTML = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        '"': "&quot;",
        "'": "&#039;",
        "<": "&lt;",
        ">": "&gt;",
      }[character]!)
  );

const isEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254;

const flattenValues = (
  input: unknown,
  prefix = "",
  depth = 0
): Record<string, FlatValue> => {
  if (depth > MAX_NESTING_DEPTH) {
    throw new RangeError("Request nesting is too deep");
  }

  if (input === null || input === undefined) {
    return {};
  }

  if (Array.isArray(input)) {
    return { [prefix]: input.map((value) => String(value)).join(", ") };
  }

  if (typeof input === "object") {
    return Object.entries(input as Record<string, unknown>).reduce(
      (acc, [key, value]) => {
        const nextPrefix = prefix ? `${prefix}.${key}` : key;
        return { ...acc, ...flattenValues(value, nextPrefix, depth + 1) };
      },
      {} as Record<string, FlatValue>
    );
  }

  return { [prefix]: input as FlatValue };
};

const getValueByPath = (input: JsonRecord, path: string): unknown => {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (!acc || typeof acc !== "object") {
      return undefined;
    }
    return (acc as JsonRecord)[key];
  }, input);
};

const formatDaysList = (value: unknown) => {
  if (Array.isArray(value)) {
    return value.map((item) => String(item)).join(", ");
  }

  if (value === null || value === undefined) {
    return "";
  }

  return String(value);
};

const normalizeUrl = (value: string) => {
  if (!value) {
    return value;
  }

  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value;
  }

  return `https://${value}`;
};

const getSheetsClient = () => {
  const credentials = new auth.JWT({
    email: env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return createSheetsClient({ version: "v4", auth: credentials });
};

const getHeaderRow = async (
  sheets: ReturnType<typeof getSheetsClient>,
  spreadsheetId: string,
  sheetName: string
) => {
  const header = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${sheetName}!1:1`,
  });

  return header.data.values?.[0] ?? [];
};

const updateHeaderRow = async (
  sheets: ReturnType<typeof getSheetsClient>,
  spreadsheetId: string,
  sheetName: string,
  headers: string[]
) => {
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `${sheetName}!1:1`,
    valueInputOption: "RAW",
    requestBody: {
      values: [headers],
    },
  });
};

export async function POST(
  request: NextRequest,
  segmentData: { params: Params }
) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (isRateLimited(request)) {
    return NextResponse.json(
      { error: "Too many submissions" },
      { status: 429 }
    );
  }

  if (!request.headers.get("content-type")?.includes("application/json")) {
    return NextResponse.json(
      { error: "Content-Type must be application/json" },
      { status: 415 }
    );
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json(
      { error: "Request is too large" },
      { status: 413 }
    );
  }

  try {
    const params = await segmentData.params;
    const formTitle = decodeURIComponent(params.form);
    const normalizedForm = formTitle.trim().toLowerCase();
    const spreadsheetId = env.GOOGLE_SHEETS_SPREADSHEET_ID;
    const sheetName = env.GOOGLE_SHEETS_SHEET_NAME ?? "Sheet1";
    const body = await request.json();

    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json(
        { error: "Expected a JSON object" },
        { status: 400 }
      );
    }

    if (JSON.stringify(body).length > MAX_BODY_BYTES) {
      return NextResponse.json(
        { error: "Request is too large" },
        { status: 413 }
      );
    }

    const payload = {
      // _formTitle: formTitle,
      _submittedAt: new Date().toISOString(),
      ...body,
    };

    let flattened: Record<string, FlatValue>;
    try {
      flattened = flattenValues(payload);
    } catch (error) {
      if (error instanceof RangeError) {
        return NextResponse.json(
          { error: "Request nesting is too deep" },
          { status: 400 }
        );
      }
      throw error;
    }
    const keys = Object.keys(flattened);

    if (!keys.length) {
      return NextResponse.json(
        { error: "No fields provided" },
        { status: 400 }
      );
    }
    if (keys.length > MAX_FLATTENED_FIELDS) {
      return NextResponse.json(
        { error: "Too many fields provided" },
        { status: 400 }
      );
    }

    const sheets = getSheetsClient();
    const existingHeader = await getHeaderRow(sheets, spreadsheetId, sheetName);

    const header = [...existingHeader];
    keys.forEach((key) => {
      if (!header.includes(key)) {
        header.push(key);
      }
    });

    if (!existingHeader.length || header.length !== existingHeader.length) {
      await updateHeaderRow(sheets, spreadsheetId, sheetName, header);
    }

    const row = header.map((key) => {
      const value = flattened[key];
      if (value === null || value === undefined) {
        return "";
      }
      return String(value);
    });

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${sheetName}!A1`,
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values: [row],
      },
    });

    if (normalizedForm === "iftar" || normalizedForm === "cancel") {
      const emailPath = "contactInfo.email";
      const firstNamePath = "contactInfo.first_name";
      const daysPath = "days";
      const cancelLink = normalizeUrl("wlumsa.org/forms/iftar-cancellation");
      const email = getValueByPath(body, emailPath);
      const firstName =
        String(getValueByPath(body, firstNamePath) ?? "").trim() || "there";
      const daysValue = getValueByPath(body, daysPath);
      const daysList = formatDaysList(daysValue);
      if (typeof email === "string" && isEmail(email)) {
        const safeFirstName = escapeHTML(firstName.slice(0, 100));
        const safeDaysList = escapeHTML(daysList.slice(0, 500));
        try {
          if (normalizedForm === "iftar") {
            const html = `
            <p>Asalamu alaykum ${safeFirstName},</p>

            <p>We have received your request for Iftar this week. 
            You are registered for the following days: ${
              safeDaysList || "N/A"
            }</p>

            <p>If you need to cancel, please click 
            <a href="${cancelLink}">here</a>.</p>
          `;

            await resend.emails.send({
              from: "WLU MSA <admin@wlumsa.org>",
              to: email,
              subject: "Iftar confirmation",
              html,
            });
          } else if (normalizedForm === "cancel") {
            const html = `
              <p>Asalamu alaykum ${safeFirstName},</p>
              <p>You have cancelled your iftar for ${
                safeDaysList || "the selected day(s)"
              }.
              JazakAllahu khair for letting us know.</p>

            `;
            await resend.emails.send({
              from: "WLU MSA <admin@wlumsa.org>",
              to: email,
              subject: "Iftar cancellation",
              html,
            });
          }
        } catch (emailError) {
          console.error("Webhook email failed:", emailError);
        }
      } else {
        console.warn("Webhook email skipped: missing contact email", {
          formTitle,
        });
      }
    }

    return NextResponse.json(
      { message: "Submission saved to Google Sheets" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Google Sheets webhook error:", error);
    return NextResponse.json(
      { error: "Failed to write to Google Sheets" },
      { status: 500 }
    );
  }
}

export async function OPTIONS(request: NextRequest) {
  if (!isAuthorized(request)) return new NextResponse(null, { status: 401 });
  return new NextResponse(null, { status: 204, headers: { Allow: "POST" } });
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(
    { message: "Google Sheets webhook is running" },
    { status: 200 }
  );
}

import { google } from "googleapis";

export const googleAuth = async () => {
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!clientEmail || !privateKey) {
    throw new Error("Missing Google credentials.");
  }

  return google.auth.getClient({
    credentials: {
      client_email: clientEmail,
      private_key: privateKey,
    },
    scopes: [
      "https://www.googleapis.com/auth/spreadsheets",
    ],
  });
};

export const updateSheetData = async (data: any,spreadsheetId:string) => {
  if (typeof window !== "undefined") {
    throw new Error("This function can only be run on the server side.");
  }

  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!clientEmail || !privateKey) {
    throw new Error("Missing Google credentials.");
  }

  try {
    const sheets = google.sheets({
      auth: await googleAuth(),
      version: "v4",
    });

    // Extract values from submissionData
    const submissionData = data.submissionData;
    const values = Object.values(submissionData).flat();

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "A1:C1",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [values],
      },
    });
    return {
      success: true,
      errors: null,
    };
  } catch (error: unknown) {
    console.error("Error appending data to Google Sheets:", error);
    if (error instanceof Error) {
      console.error("Error message:", error.message);
    }
    return {
      success: false,
      errors: ["An error occurred."],
    };
  }
};
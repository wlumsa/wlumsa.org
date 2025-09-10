import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { name, email, newsletter } = await request.json();

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    // Only add to Resend if newsletter is checked
    if (newsletter) {
      const response = await fetch("https://api.resend.com/contacts", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          first_name: name,
          audience_id: process.env.RESEND_AUDIENCE_ID,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error("Resend API error:", error);
        return NextResponse.json(
          { error: "Failed to add contact to Resend", details: error },
          { status: 400 }
        );
      }

      const result = await response.json();
      console.log("Successfully added contact to Resend:", result);
    }

    return NextResponse.json({
      success: true,
      message: newsletter ? "Contact added to newsletter" : "Contact saved"
    });

  } catch (error) {
    console.error("Error in addContact API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

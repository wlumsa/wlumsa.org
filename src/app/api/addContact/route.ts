import { NextRequest, NextResponse } from "next/server";
import { addMember, addIndividualToList } from '@/Utils/datafetcher';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { name, email, newsletter, studentId } = await request.json();

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    // Split name into first and last name
    const nameParts = name.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    // Add as general member in CMS (using studentId if provided, otherwise use email as identifier)
    const memberId = studentId || email.split('@')[0]; // Use studentId or email prefix as identifier
    const addMemberRes = await addMember(firstName, lastName, email, memberId, newsletter);

    if (!addMemberRes) {
      return NextResponse.json(
        { error: "Failed to add member to CMS" },
        { status: 400 }
      );
    }

    // Only add to Resend if newsletter is checked
    if (newsletter) {
      // Add to newsletter distribution list
      await addIndividualToList("Newsletter", {
        email,
        first_name: firstName,
        last_name: lastName
      });

      // Add to Resend audience
      await resend.contacts.create({
        email,
        first_name: firstName,
        last_name: lastName,
        audience_id: process.env.RESEND_AUDIENCE_ID!,
        unsubscribed: false
      });

      console.log("Successfully added contact to Resend and newsletter list");
    }

    return NextResponse.json({
      success: true,
      message: newsletter ? "Contact added to newsletter and member database" : "Contact added to member database"
    });

  } catch (error) {
    console.error("Error in addContact API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

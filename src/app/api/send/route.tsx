import { resend } from "../../../Utils/resend";
import Email from "@/components/emails/newsletter";
import { NextRequest, NextResponse } from "next/server";
import { collection, query, where, getDocs } from "firebase/firestore";
import db from "@/firebase";
interface EmailListItem {
  email: string;
  firstName: string;
  lastName: string;
}
type EmailEntryContent =
  | EmailEntryImages
  | EmailEntryText
  | EmailEntryAttachments;
type EmailEntryImages = {
  type: "images";
  value: string[];
};

type EmailEntryText = {
  type: "text";
  value: string;
};
type EmailEntryAttachments = {
  type: "attachments";
  value: string[];
};
interface EmailListItem {
  email: string;
  firstName: string;
  lastName: string;
}
export async function POST(request: Request) {
  const body = await request.json();
  let { name, subject, content, status, distributionList, created_on } = body;
  let emailRecipients;
  emailRecipients = distributionList.trim().split(/[\s\n]+/);

  const emailList: EmailListItem[] = [];
  if (distributionList === "Members") {
    const membersCollection = collection(db, "Members");
    const newsletterMembersQuery = query(
      membersCollection,
      where("Newsletter", "==", true)
    );
    const querySnapshot = await getDocs(newsletterMembersQuery);

    querySnapshot.forEach((doc) => {
      const memberData = doc.data();
      emailList.push({
        email: memberData.Email,
        firstName: memberData.FirstName,
        lastName: memberData.LastName,
      });
    });
  }
  const attachments = content
    .filter((entry: EmailEntryContent) => entry.type === "attachments")
    .flatMap((entry: EmailEntryAttachments) => entry.value)
    .map((url: string) => ({ path: url }));

  try {
    
    if (distributionList != "Members") {
     
        await new Promise((resolve) => setTimeout(resolve, 3000)); // Wait for 1 second
        const data = await resend.emails.send({
          from: "admin@wlumsa.org",
          to: "admin@wlumsa.org",
          bcc:emailRecipients,
          subject: subject,
          react: <Email firstName={""} lastName={""} content={content} />,
          attachments: attachments,
          reply_to:"msa@wlu.ca"
        });
      
    } else {
      for (const member of emailList) {
        await new Promise((resolve) => setTimeout(resolve, 10000)); // Wait for 1 second
        const data = await resend.emails.send({
          from: "admin@wlumsa.org",
          to: member.email, // Send to the current member's email
          subject: subject,
          react: (
            <Email
              firstName={member.firstName}
              lastName={member.lastName}
              content={content}
            />
          ),
          attachments: attachments,
          reply_to:"msa@wlu.ca"
        });
      }
    }
    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "missing content" });
  }
}

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

function delay(time: number) {
  return new Promise(resolve => setTimeout(resolve, time));
}
function chunkArray(array: string[], chunkSize: number): string[][] {
  const chunks: string[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
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
    if (distributionList == "Members") {

      const emailData = emailList.map((member) => ({
        from: "admin@wlumsa.org",
        to: member.email,
        subject: subject,
        react: <Email firstName={member.firstName} lastName={member.lastName} content={content} />, // Adjust this line according to how you convert the component to HTML or use the right format
        attachments: attachments,
        reply_to: "msa@wlu.ca",
      }));
      console.log()

      // Send the batch email
      const response = await resend.batch.send(
        emailData
      );
      console.log(response)
    } else {
      const chunkSize = 40; // BCC limit
      const emailChunks = chunkArray(emailRecipients, chunkSize);
      const delayTime = 10000; // Adjust delay time as needed
      for (const batch of emailChunks) {
        const response = await resend.emails.send({
          from: "admin@wlumsa.org",
          to: "admin@wlumsa.org", // Necessary if 'to' is required but will not see the email
          bcc: batch,
          subject: subject,
          react: <Email firstName={""} lastName={""} content={content} />,
          attachments: attachments,
          reply_to: "msa@wlu.ca",
        });
        console.log(`Batch sent to ${batch.length} recipients. ${response}`);

        // Delay between sends, if necessary, to avoid rate limits
        await delay(delayTime);
      }
    }


    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "missing content" });
  }
}

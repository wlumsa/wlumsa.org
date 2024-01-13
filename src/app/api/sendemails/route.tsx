import { Resend } from "resend";
import Email from "@/components/emails/newsletter";

import { collection, query, where, getDocs } from "firebase/firestore";
import db from "@/firebase";

const resend = new Resend(process.env.RESEND_API_KEY);
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

export async function POST(request: Request) {
  let emailRecipients = [];
  try {
    const { name, subject, content, status, distributionList } =
      await request.json();

    if (distributionList === "Members") {
      const membersCollection = collection(db, "Members");
      const newsletterMembersQuery = query(
        membersCollection,
        where("Newsletter", "==", true)
      );
      const querySnapshot = await getDocs(newsletterMembersQuery);

      const emailList: EmailListItem[] = [];

      querySnapshot.forEach((doc) => {
        const memberData = doc.data();
        emailList.push({
          email: memberData.Email,
          firstName: memberData.FirstName,
          lastName: memberData.LastName,
        });
      });

      emailList.forEach((member, index) => {
        setTimeout(() => {
          resend.emails.send({
            from: "admin@wlumsa.org",
            to: member.email,
            subject: name,
            react: (
              <Email
                firstName={member.firstName}
                lastName={member.lastName}
                content={content}
              />
            ),
          });
        }, index * 1000);
      });
    } else {
      emailRecipients = distributionList.trim().split(/[\s\n]+/);
      emailRecipients.forEach((email: string, index: number) => {
        console.log(email);
        setTimeout(() => {
          const attachments = content
            .filter((entry: EmailEntryContent) => entry.type === "attachments")
            .flatMap((entry: EmailEntryAttachments) => entry.value)
            .map((url: string) => ({ path: url }));

          resend.emails.send({
            from: "admin@wlumsa.org",
            to: email,
            subject: subject,
            react: <Email firstName={""} lastName={""} content={content} />,
            attachments: attachments,
          });
        }, index * 1000);
      });
    }

    return new Response("Success!", {
      status: 200,
    });
  } catch (error) {
    return new Response(`Webhook error`, {
      status: 400,
    });
  }
}

import { Resend } from 'resend';
import Email from '../emails/newsletter';
import type { NextApiRequest, NextApiResponse } from "next";
import { collection, query, where, getDocs } from "firebase/firestore";
import db from "../../firebase";
const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);
interface EmailListItem {
    email: string;
    firstName: string;
    lastName: string;
  }
type EmailEntryContent = EmailEntryImages | EmailEntryText | EmailEntryAttachments;
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
  
export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        // If not POST, return a 405 Method Not Allowed error
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
   
    try {
       
      const { name,subject,content,status,distributionList } = req.body;
        console.log(name)
        console.log(content)
        let emailRecipients = [];
        if (distributionList === 'Members') {
        
            const membersCollection = collection(db, "Members");
            const newsletterMembersQuery = query(membersCollection, where("Newsletter", "==", true));
            const querySnapshot = await getDocs(newsletterMembersQuery);

            const emailList: EmailListItem[] = [];

            querySnapshot.forEach(doc => {
                const memberData = doc.data();
                emailList.push({
                    email: memberData.Email,
                    firstName: memberData.FirstName,
                    lastName: memberData.LastName,
                });
            });

            emailList.forEach((member, index) => {
                setTimeout(() => {
                    resend.sendEmail({
                        from: "admin@wlumsa.org",
                        to: member.email,
                        subject: name,
                        react: <Email firstName={member.firstName} lastName={member.lastName} content={content} />,
                    });
                }, index * 1000);
            });
            
        } else {
            emailRecipients = distributionList.trim().split(/[\s\n]+/);
            emailRecipients.forEach((email: string, index: number) => {
                console.log(email)
                setTimeout(() => {
                    const attachments = content
                        .filter((entry: EmailEntryContent) => entry.type === 'attachments')
                        .flatMap((entry: EmailEntryAttachments) => entry.value)
                        .map((url: string) => ({ path: url })); 
            
                    resend.sendEmail({
                        from: 'admin@wlumsa.org',
                        to: email,
                        subject: subject,
                        react: <Email firstName={''} lastName={''} content={content} />,
                        attachments: attachments
                    });
                }, index * 1000);
            });
        }

        res.status(200).json({ message: "Email sending finished" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

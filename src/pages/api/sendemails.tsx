
import Email from "../emails/welcome";
import { Resend } from "resend";
import { collection, query, where, getDocs } from "firebase/firestore";
import db from "../../firebase";
import type { NextApiRequest, NextApiResponse } from "next";

const resend = new Resend(process.env.RESEND_API_KEY);

interface EmailListItem {
  email: string;
  firstName: string;
  lastName: string;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const membersCollection = collection(db, "Members");
    const newsletterMembersQuery = query(membersCollection, where("Newsletter", "==", true));
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
      setTimeout(async () => {
        await resend.emails.send({
          from: "WLU MSA <admin@wlumsa.org>",
          to: [member.email],
          subject: "One Week left!",
          react: Email({
            firstName: member.firstName,
            lastName: member.lastName,
          }),
        });
      }, index * 1000);
    });

    res.status(200).json({ message: "Email sending finished" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
import type { NextApiRequest, NextApiResponse } from 'next';
import Email from '../emails/welcome';
import { Resend } from 'resend';
import { collection, getDocs } from 'firebase/firestore';
import db from '../../firebase';

// Define an interface for the email list
interface EmailListItem {
  email: string;
  firstName: string;
  lastName: string;
}

const resend = new Resend(process.env.RESEND_API_KEY);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Fetch member data from the Firestore "Members" collection
    const membersRef = collection(db, 'Members');
    const querySnapshot = await getDocs(membersRef);

    // Define emailList with an explicit type
    const emailList: EmailListItem[] = [];

    querySnapshot.forEach((doc) => {
      const memberData = doc.data();
      emailList.push({
        email: memberData.email,
        firstName: memberData.firstName,
        lastName: memberData.lastName,
      });
    });

    // Loop through the emailList and send emails using resend
    for (const member of emailList) {
      await resend.emails.send({
        from: 'admin@wlumsa.org',
        to: [member.email],
        subject: 'Hello, ' + member.firstName + ' ' + member.lastName,
        react: Email({ firstName: member.firstName, lastName: member.lastName }),
      });
    }

    res.status(200).json({ message: 'Emails sent successfully' });
  } catch (error) {
    console.error('Error sending emails:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

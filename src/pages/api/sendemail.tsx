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

    // Use the map method to create the emailList array
    const emailList: EmailListItem[] = querySnapshot.docs.map((doc) => {
      const memberData = doc.data();
      return {
        email: memberData.Email, // Use correct field name "Email"
        firstName: memberData.FirstName, // Use correct field name "FirstName"
        lastName: memberData.LastName, // Use correct field name "LastName"
      };
    });

    console.log('Email List:', emailList);

    // Loop through the emailList and send emails using resend
    for (const member of emailList) {
      const data = await resend.emails.send({
        from: 'admin@wlumsa.org',
        to: [member.email],
        subject: 'MSA week at a glance',
        react: Email({ firstName: member.firstName, lastName: member.lastName }),
      });
      // You can handle the email response data here if needed.
      console.log('Email sent:', data);
    }

    res.status(200).json({ message: 'Emails sent successfully' });
  } catch (error) {
    console.error('Error sending emails:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
  return (
    <div>
      emails sent
    </div>
  )
};

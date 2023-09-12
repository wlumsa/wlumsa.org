
import React, { useState, useEffect } from 'react';
import Email from '../emails/welcome';
import { Resend } from 'resend';
import { collection, getDocs } from 'firebase/firestore';
import db from '../../firebase';
const resend = new Resend("");
// Define an interface for the email list
interface EmailListItem {
  email: string;
  firstName: string;
  lastName: string;
}


import type { NextApiRequest, NextApiResponse } from 'next';


export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Fetch member data from the Firestore "Members" collection
    const membersRef = collection(db, 'Members');
    const querySnapshot = await getDocs(membersRef);
  
    // Define emailList with an explicit type
    const emailList: EmailListItem[] = [];

    querySnapshot.forEach((doc) => {
      const memberData = doc.data();
      console.log(memberData);
      emailList.push({
      email: memberData.Email, // Use correct field name "Email"
      firstName: memberData.FirstName, // Use correct field name "FirstName"
      lastName: memberData.LastName, // Use correct field name "LastName"
      });
      });
    console.log(emailList) 
    // Loop through the emailList and send emails using resend
    
    for (const member of emailList) {
     const data = await resend.emails.send({
        from: 'admin@wlumsa.org',
        to: [member.email],
        subject: 'Salam, ' + member.firstName + ' ' + member.lastName,
        react: Email({ firstName: member.firstName, lastName: member.lastName }),
      });
      console.log(data)
    }

      res.status(200).json({ message: 'Emails sent successfully' });
  } catch (error) {
    console.error('Error sending emails:', error);
    // Send an error response
    res.status(500).json({ error: 'Internal server error' });
  }
};






/*
import type { NextApiRequest, NextApiResponse } from 'next';
import { EmailTemplate } from '../../components/EmailTemplate';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const data = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: ['delivered@resend.dev'],
      subject: 'Hello world',
      react: EmailTemplate({ firstName: 'John' }),
    });

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};
*/

/*
const SendEmailPage: React.FC = () => {
  const [emailStatus, setEmailStatus] = useState<string | null>(null);

  useEffect(() => {
    const sendEmails = async () => {
      try {
        // Fetch member data from the Firestore "Members" collection
        const membersRef = collection(db, 'Members');
        const querySnapshot = await getDocs(membersRef);
      
        // Define emailList with an explicit type
        const emailList: EmailListItem[] = [];
    
        querySnapshot.forEach((doc) => {
  const memberData = doc.data();
  console.log(memberData);
  emailList.push({
    email: memberData.Email, // Use correct field name "Email"
    firstName: memberData.FirstName, // Use correct field name "FirstName"
    lastName: memberData.LastName, // Use correct field name "LastName"
  });
});
        console.log(emailList) 
        // Loop through the emailList and send emails using resend
        
        for (const member of emailList) {
         const data = await resend.emails.send({
            from: 'admin@wlumsa.org',
            to: [member.email],
            subject: 'Salam, ' + member.firstName + ' ' + member.lastName,
            react: Email({ firstName: member.firstName, lastName: member.lastName }),
          });
        }
    
        setEmailStatus("Send successfully")
      } catch (error) {
        console.error('Error sending emails:', error);
        setEmailStatus('Internal server error');
      }
    };

    // Trigger the sendEmails function when the page loads
    sendEmails();
  }, []);

  return (
    <div>
      <h1>Send Emails Page</h1>
      <p>{emailStatus}</p>
    </div>
  );
};

export default SendEmailPage;
*/
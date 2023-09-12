// pages/sendEmail.tsx

import React, { useState, useEffect } from 'react';
import Email from './emails/welcome';
import { Resend } from 'resend';
import { collection, getDocs } from 'firebase/firestore';
import db from '../firebase';

// Define an interface for the email list
interface EmailListItem {
  email: string;
  firstName: string;
  lastName: string;
}

const resend = new Resend("re_8PrH7zRa_5LvApiWmyD2Fe5HMJy2xS1FF");

const SendEmailPage: React.FC = () => {
  const [emailStatus, setEmailStatus] = useState<string | null>(null);

  useEffect(() => {
    const sendEmails = async () => {
      try {
        // Fetch member data from the Firestore "Members" collection
        const membersRef = collection(db, 'Members');
        const querySnapshot = await getDocs(membersRef);

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
            subject: 'Salam, ' + member.firstName + ' ' + member.lastName,
            react: Email({ firstName: member.firstName, lastName: member.lastName }),
          });
        }

        setEmailStatus('Emails sent successfully');
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

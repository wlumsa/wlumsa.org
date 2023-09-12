
import React, { useState, useEffect } from 'react';
import Email from './emails/welcome';
import { Resend } from 'resend';
import { collection, getDocs } from 'firebase/firestore';
import db from '../firebase';
const resend = new Resend("re_8eU8sooD_LqabRwXcFEzRbjnh233ETvkxp");
// Define an interface for the email list
interface EmailListItem {
  email: string;
  firstName: string;
  lastName: string;
}



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

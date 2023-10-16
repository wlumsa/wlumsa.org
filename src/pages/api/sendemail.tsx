import React, { useState, useEffect } from 'react';
import Email from '../emails/welcome';
import { Resend } from 'resend';
import { collection, getDocs } from 'firebase/firestore';
import db from '../../firebase';

const resend = new Resend("re_51vyJ382_CWXZhGar5T3LAtpTR8sp6CJE");

// Define an interface for the email list
interface EmailListItem {
  email: string;
  firstName: string;
  lastName: string;
}

import type { NextApiRequest, NextApiResponse } from 'next';

// ... [rest of the imports and setup]

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
        email: memberData.Email,
        firstName: memberData.FirstName,
        lastName: memberData.LastName,
      });
    });
    console.log(emailList);

  
    

    // Send emails in the background with rate limiting
    emailList.forEach((member, index) => {
      setTimeout(async () => {
        const data = await resend.emails.send({
          from: 'WLU MSA <admin@wlumsa.org>',
          to: [member.email],
          subject: '🤫 Can You Guess What We\'ve Planned for You?',
          react: Email({ firstName: member.firstName, lastName: member.lastName }),
        });
        console.log(data);

        
      }, index * 1000); // 1 second delay between each email
    });
    res.status(200).json({ message: 'Email sending finished' });

  } catch (error) {
    console.error('Error initiating email send:', error);
    // Send an error response
    res.status(500).json({ error: 'Internal server error' });
  }
};

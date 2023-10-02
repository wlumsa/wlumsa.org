import React, { useState, useEffect } from 'react';
import Email from '../emails/welcome';
import { Resend } from 'resend';
import { collection, getDocs } from 'firebase/firestore';
import db from '../../firebase';

const resend = new Resend("re_Fj16zkCY_8gBC1ZBbm8Ewwo7vPfSQyQJY");

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
      emailList.push({
        email: memberData.Email,
        firstName: memberData.FirstName,
        lastName: memberData.LastName,
      });
    });
    console.log(emailList);

    // Extract all emails for BCC
    const bccEmails = emailList.map(member => member.email);

    // Send the email to the entire list using BCC
    const data = await resend.emails.send({
      from: 'WLU MSA <admin@wlumsa.org>',
      to:'ahme2085@mylaurier.ca',
      bcc: bccEmails, // Use the entire list for BCC
      subject: 'Salam to all members',
      react: Email({ firstName: 'Member', lastName: '' }), // Generic greeting
    });
    console.log(data);

    res.status(200).json({ message: 'Emails sent successfully' });
  } catch (error) {
    console.error('Error sending emails:', error);
    // Send an error response
    res.status(500).json({ error: 'Internal server error' });
  }
};

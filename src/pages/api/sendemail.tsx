import { Resend } from 'resend';
import type { NextApiRequest, NextApiResponse } from 'next';

// Initialize the Resend client with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      // Extract the member details from the request body
      const { firstName, lastName, email, studentId, issue , category} = req.body;
        console.log(category)
      // Define the email content
      const subject = ` ${category} Request from ${firstName} ${lastName} `;
      const textContent = `Student ID: ${studentId}\nIssue/Concern: ${issue} \nEmail: ${email}`;

      // Send the email using Resend
      const response = await resend.emails.send({
        from: `${category} Email <admin@wlumsa.org>`,
        to: ['wlumsa.admin@gmail.com'],
        subject: subject,
        text: textContent,
        headers: {
            'X-Priority': '1', // Some email clients treat '1' as high priority.
          },
        // If you have any attachments or special headers, add them here
      });

      // Handle the response from the Resend service
      console.log(response);
      res.status(200).json({ message: 'Email sent successfully', response });

    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Internal server error', details: error });
    }
  } else {
    // Handle any non-POST requests
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

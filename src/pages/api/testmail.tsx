import { Resend } from 'resend';
import Email from '../emails/welcome';
import type { NextApiRequest, NextApiResponse } from "next";
const resend = new Resend(process.env.RESEND_API_KEY);
/*

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      
        resend.sendEmail({
            from: 'admin@wlumsa.org',
            to: 'ahme2085@mylaurier.ca',
            subject: 'hello world',
            react: <Email firstName='Syed' lastName='Ahmed' />,
          });
  
      
  
      res.status(200).json({ message: "Email sending finished" });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };*/
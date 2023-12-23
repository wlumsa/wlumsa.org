import { Resend } from 'resend';
import Email from '../emails/welcome';
import type { NextApiRequest, NextApiResponse } from "next";
const resend = new Resend(process.env.RESEND_API_KEY);

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
       
      const { firstName, lastName, content, name, header_image } = req.body;
        console.log(name)

        resend.sendEmail({
            from: 'admin@wlumsa.org',
            to: 'syedahmedd.02@gmail.com',
            subject: `${name}`,
            react: <Email firstName={firstName} lastName={lastName} content={content} />,
        });

        res.status(200).json({ message: "Email sending finished" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

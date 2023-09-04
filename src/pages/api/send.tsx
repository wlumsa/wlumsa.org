import type { NextApiRequest, NextApiResponse } from 'next';
import VercelInviteUserEmail from '../emails/welcome';
import { Resend } from 'resend';

const resend = new Resend('re_SGcCUCa6_GE71LJap8TmXBGREDwfVZkcy');

export default async (req: NextApiRequest, res: NextApiResponse) => {
    
  try {
    const data = await resend.emails.send({
      from: 'admin@wlumsa.org',
      to: ['ahme2085@mylaurier.ca'],
      subject: 'Hello world',
    
      react: VercelInviteUserEmail({ firstName: 'John' }),
    });

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
  return (
    <div>Sucess</div>
  )
};

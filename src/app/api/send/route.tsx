import { Resend } from 'resend';

import WelcomeEmail from 'emails/signup.tsx';
import { fetchEmailData } from "@/Utils/datafetcher";

const resend = new Resend(process.env.RESEND_API_KEY);
//const resend = new Resend("re_a4Chuui1_5MzcEdVbdi5d626LGU3gWVyr" );

export const POST = async (req: Request) => {
  try {
  
    const { first, last, email, studentId, newsLetter} = await req.json();

    //const res = await fetchEmailData("1"); //get email from cms
    //const email_content= res[0]?.content|| [];
    //console.log("email data:", res);
    //console.log(res[0]?.Subject)
    console.log("First name", first)
    console.log("newsletter", newsLetter)

    //const email_subject = res[0]?.Subject; 
    const email_subject = "WLUMSA Member Signup Confirmation"
    const response = await resend.emails.send({
      from: `WLU MSA <admin@wlumsa.org>`,
      to: email,
      subject: email_subject || "",
      react:<WelcomeEmail firstName={first} lastName={last} email={email} studentId={studentId} newsletter={newsLetter}/>,
      headers: {
        "X-Priority": "1",
      },
    });

    console.log(response);
    return new Response("Success!", {
      status: 200,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(`Internal server error ${error}`, {
      status: 500,
    });
  }
};

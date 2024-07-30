//import { resend } from "../../../Utils/resend";
import Email from "@/emails/newsletter";
import { NextRequest, NextResponse } from "next/server";
import { fetchEmailData } from "@/Utils/datafetcher";
import { Resend } from "resend";
import { text } from "stream/consumers";
// Initialize the Resend client with your API key
const resend = new Resend(process.env.RESEND_API_KEY);
/*
Name: fullName,
            email: email,
            phoneNumber: phoneNumber,
            password: password,
            image: imageUrl,
            price:totalPrice,
            pickuptime: pickupTime === 'Other' ? customTime : pickupTime,
            products:products,
            */
            interface EmailEntryText {
                type: 'text';
                value: string;
              }
              
export async function POST(request: Request) {
  try {
    const {
      first,
      last,
      email,
      studentId,
      newsletter
    } = await request.json();
    //Get the confirmation email
    const res = await fetchEmailData("1");
    const content= res[0]?.content|| [];
    console.log("email data:", res);
    console.log(res[0]?.Subject)
//subject
    const subject = res[0]?.Subject;
    const textContent = `Name: ${first} ${last}\n
         student id: ${studentId}\n
         newsletter: ${newsletter} \n
         Email: ${email}\n`;
    
    const response =  await resend.emails.send({
      from: `WLU MSA <admin@wlumsa.org>`,
      to: ["moha5150@mylaurier.ca"],
      subject: subject,
      cc: email,
      react: <Email firstName={""} lastName={""} content={""} />,
      headers: {
        "X-Priority": "1",
      },
    });
    
    console.log(response)
    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ error: "missing content" });
  }
}

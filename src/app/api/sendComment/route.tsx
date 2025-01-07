import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

// Initialize the Resend client with your API key
const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);
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
export async function POST(request: Request) {
  try {
    const {
      postAuthorEmail,
      name,
      postTitle,
      message, 
    } = await request.json();
   
    const subject = ` WLU MSA Roommate Service -  New Comment on ${postTitle} `;
    const textContent = `You've received a new comment on your  listing, ${postTitle} from: ${name} \n
    Message: ${message} \n
    `;

    const response =  await resend.emails.send({
      from: `WLU MSA <admin@wlumsa.org>`,
      to: [`${postAuthorEmail}`,"moha5150@mylaurier.ca", "admin@wlumsa.org"],
      subject: subject,
      text: textContent,
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

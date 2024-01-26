import { Resend } from "resend";
import type { NextApiRequest, NextApiResponse } from "next";

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
    // Extract the member details from the request body
    const {
      Name,
      email,
      phoneNumber,
      password,
      image,
      price,
      pickuptime,
      products,
    } = await request.json();
    const productsString = products
      .map(
        (product: {
          id: string;
          name: string;
          quantity: number;
          size: string;
        }) =>
          `\tItem: ${product.name}, Quantity: ${product.quantity}, Size: ${product.size}`
      )
      .join("\n");

    const subject = ` Receipt Confirmation `;
    const textContent = `Name: ${Name}\n
        Phone Number: ${phoneNumber}\n
        E-Transfer Email: ${email}\n
        E-Transfer Password ${password}\n
        Total: $${price}\n
        Pickup Time: ${pickuptime}\n
        Products: \n${productsString}\n`;

    // Send the email using Resend
    const response = await resend.emails.send({
      from: `Order from ${Name} <admin@wlumsa.org>`,
      to: ["msa@wlu.ca","moha5150@mylaurier.ca"],
      subject: subject,
      cc: email,
      text: textContent,
      headers: {
        "X-Priority": "1",
      },
    });
    console.log('worked!')
    return new Response("Success!", {
      status: 200,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(`Internal server error ${error}`, {
      status: 500,
    });
  }
}

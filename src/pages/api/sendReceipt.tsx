import { Resend } from "resend";
import type { NextApiRequest, NextApiResponse } from "next";

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
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
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
      } = req.body;
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
        Products: \n${productsString}\n
        Image: ${image}\n
        `;

      // Send the email using Resend
      const response = await resend.emails.send({
        from: `Order from ${Name} <admin@wlumsa.org>`,
        to: ["msa@wlu.ca"],
        subject: subject,
        cc: email,
        text: textContent,
        headers: {
          "X-Priority": "1",
        },
      });

      console.log(response);
      res.status(200).json({ message: "Email sent successfully", response });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Internal server error", details: error });
    }
  } else {
    // Handle any non-POST requests
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

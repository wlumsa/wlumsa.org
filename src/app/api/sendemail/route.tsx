import { Resend } from "resend";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    // Extract the member details from the request body
    const { fullName, email, studentId, summary, category, phoneNumber } =
      await request.json();
    console.log(category);

    const subject = ` ${category} Request from ${fullName} `;
    const textContent = `Student ID: ${studentId}\nIssue/Concern: ${summary} \nEmail: ${email}\nPhone:${phoneNumber}`;

    const response = await resend.emails.send({
      from: `${category} Email <admin@wlumsa.org>`,
      to: ["msa@wlu.ca"],
      subject: subject,
      text: textContent,
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
}

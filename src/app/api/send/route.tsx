import { resend } from "../../../Utils/resend";
import Email from "@/components/emails/newsletter";
import { NextRequest, NextResponse } from "next/server";
import { collection, query, where, getDocs } from "firebase/firestore";
import db from "@/firebase";

interface EmailListItem {
  email: string;
  firstName: string;
  lastName: string;
}
export async function POST(request: Request) {
  const body = await request.json();
  console.log(body);
  let {
    name,
    subject,
    content,
    status,
    distributionList,
    created_on,
  }= body;
  let emailRecipients;
  console.log(typeof(distributionList))
  emailRecipients = distributionList;

  try {
    'use client'
    console.log("test");
    const data = await resend.emails.send({
      from: "admin@wlumsa.org",
      to: emailRecipients,
      subject: subject,
      react: <Email firstName={""} lastName={""} content={content} />,
    });
    console.log(data)
    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "missing content" });
  }
}

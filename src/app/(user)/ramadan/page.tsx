import React from "react";
import Link from "next/link";
import { getPayload } from 'payload'
import configPromise from "@payload-config";
import CountdownComponent from "./CountdownComponent";
import { FormBlock } from "@/components/Forms/FormBlock/Form";
import { Form as FormType } from "@payloadcms/plugin-form-builder/types";
import { notFound } from "next/navigation";

export default async function CountdownPage() {

  const payload = await getPayload({ config: configPromise });

  const payment = await payload.find({
    collection: 'forms',
    where: {
      "slug": {
        equals: "ramadan"
      },
    },
    draft: false,
    overrideAccess: false,
  })
  const id = payment.docs[0]?.id.toString()
  const page = payment.docs[0] as unknown as null | FormType

  if (page === null) {
    return notFound()
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gray-100 mt-10">
      <h1 className="text-4xl font-bold text-[#203B5D] mb-6">Countdown to Ramadan 2025</h1>
      <CountdownComponent />
      <p className="text-2xl mt-4">
        The blessed month of Ramadan is approaching! We need your help to fund iftars
      </p>
      <FormBlock id={id || ""} form={page} />
      <Link href="/ramadan/2024">
        <button className="mt-8 px-6 py-3 bg-[#203B5D] text-white font-bold rounded hover:bg-[#1a2f4b]">
          Go to Ramadan 2024 Page
        </button>
      </Link>
    </div>
  );
}

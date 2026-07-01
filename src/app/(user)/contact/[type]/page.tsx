"use client";
import React from "react";
import { useParams } from "next/navigation";

import CtaForm from "@/components/Forms/CtaForm";

/**
 * This is a dynamic route page, to learn more about dynamic routes visit the nextjs docs below
 * https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes
 * Renders a dynamic contact page based on the specified type.
 * @returns The JSX element representing the dynamic contact page.
 */
export default function DynamicContactPage() {
  const params = useParams<{ type: string }>();
  const type = params ? params.type : "Contact";

  return (
    <div className="flex min-h-screen flex-col">
      <div className="mt-20 flex flex-grow flex-col items-center">
        <div className="mb-10 max-w-2xl text-center">
          <h1 className="font-heading pt-4 text-4xl font-bold capitalize text-primary duration-200 hover:scale-105 md:text-5xl lg:pt-0">
            {type} Form
          </h1>
          <p className="font-body mt-4 text-center text-lg leading-relaxed text-base-content/80">
            Fill out the form and Inshallah we will get back to you soon
          </p>
        </div>
        <CtaForm category={type} />
      </div>
    </div>
  );
}

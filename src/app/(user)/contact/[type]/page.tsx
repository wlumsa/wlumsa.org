"use client"
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
  const type = params ? params.type : 'Contact';

  return (
    <div className="flex min-h-screen flex-col">
      <div className="mt-20 flex flex-col items-center flex-grow">
        <div className="mb-10">
          <h3 className="pt-4 text-center text-3xl font-bold text-primary duration-200 hover:scale-105 lg:pt-0">
            {type} Form!
          </h3>
          <p className="text-center text-neutral lg:text-lg">
            Fill out the form and Inshallah we will get back to you soon
          </p>
        </div>
        <CtaForm category={type} />
      </div>
    </div>
  );
};



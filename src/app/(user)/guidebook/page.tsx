import React from "react";
import MemberSignup from "@/components/UI/MemberSignup";
import { getMedia } from '@/Utils/datafetcher';
import Image from "next/image";

export default async function page() {
  const mediaDocs = await getMedia("GuideBook");
  return (
    <div>
      <div className="mx-auto mt-32 flex flex-col md:flex-row items-center md:items-start">
        <div className="mx-auto md:max-w-sm text-center md:text-left md:mr-40">
          <h1 className="mb-3 text-xl font-bold">MSA Guidebook</h1>
          <p>Ever wondered where the prayer rooms are?</p>
          <p>What foods are Halal on and around campus?</p>
          <p>How to stay in the loop on campus events?</p>
          <p>What accommodations are available for Muslims?</p>
          <p>We have been there, that's why we decided to create the MSA Guidebook</p>
          <button
            type="submit"
            className="btn mt-4 md:mt-6 px-6 py-2 border-0 bg-primary text-white shadow duration-200 hover:scale-105 hover:bg-secondary rounded-md"
          >
            Get my free Guidebook
          </button>
        </div>
        <div className="mx-auto mt-6 md:mt-0 md:ml-40">
          <Image 
            src={mediaDocs[0]?.url || ''}
            alt={mediaDocs[0]?.alt || "GuideBook Image"}
            className="rounded-md shadow-md"
            width={300}
            height={300}
          />
        </div>
      </div>

      <MemberSignup />
    </div>
  );
}
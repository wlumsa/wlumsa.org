import React from "react";
import MemberSignup from "@/components/UI/MemberSignup";
import { getMedia } from '@/Utils/datafetcher';
import Image from "next/image";
import Link from "next/link";

export default async function page() {
  const mediaDocs = await getMedia("GuideBook");
  return (
    <div>
      <div className="mx-auto mt-32 mb-16 flex flex-col md:flex-row items-center md:items-start">
        <div className="mx-auto md:max-w-sm text-center md:text-left md:mr-40">
          <h1 className="mb-3 text-4xl font-bold text-primary">MSA Resource Guide</h1>
          <p>Looking for prayer rooms on campus?</p>
          <p>What foods are Halal on and around campus?</p>
          <p>How to stay in the loop on campus events?</p>
          <p>Need to know about accommodations for Muslims?</p>
          <p>We have been there, that's why we decided to create the MSA Resource Guide!</p>
          <p className="my-2"><strong className="text-primary">Sign up to recieve a free resource guide below</strong></p>
          
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

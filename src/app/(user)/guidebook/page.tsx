import React from "react";
import MemberSignup from "@/components/UI/MemberSignup";
import { getMedia } from '@/Utils/datafetcher';
import Image from "next/image";
import Link from "next/link";

export default async function page() {
  const mediaDocs = await getMedia("GuideBook");
  return (
    <div>
      <div className="mx-auto mt-32 mb-16 px-4 max-w-6xl">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-16">
          <div className="flex-1 text-center lg:text-left max-w-2xl">
            <h1 className="mb-6 text-4xl md:text-5xl font-heading font-bold text-primary">
              MSA Resource Guide
            </h1>

            <div className="mb-6 space-y-3 font-body text-lg text-base-content/80">
              <p className="font-semibold text-xl text-base-content">
                Are you a new student wondering about:
              </p>
              <ul className="space-y-2 text-left pl-4">
                <li>• Looking for prayer rooms on campus?</li>
                <li>• What foods are Halal on and around campus?</li>
                <li>• How to stay in the loop on campus events?</li>
                <li>• Need to know about accommodations for Muslims?</li>
              </ul>
            </div>

            <p className="mb-6 font-body text-lg text-base-content/80 leading-relaxed">
              We have been there, that's why we decided to create the MSA Resource Guide!
            </p>

            <div className="bg-primary/10 p-4 rounded-lg border-l-4 border-primary">
              <p className="font-body text-lg">
                <strong className="text-primary font-semibold">
                  Sign up to receive a free resource guide below
                </strong>
              </p>
            </div>
          </div>

          <div className="flex-shrink-0">
            <Image
              src={mediaDocs[0]?.url || ''}
              alt={mediaDocs[0]?.alt || "MSA Resource Guide cover showing campus resources and Islamic accommodations"}
              className="rounded-lg shadow-lg"
              width={350}
              height={350}
            />
          </div>
        </div>
      </div>

      <MemberSignup />
    </div>
  );
}

import React from "react";

import { TextGenerateEffect } from "./text-generate-effect";
import Image from "next/image";
import { FadeText } from "./FadeText";
import { getHeroUrl, fetchSocialLinks } from "@/utils/supabase/datafetcher";

const Hero: React.FC = async (
) => {
  const heroUrl = await getHeroUrl();
  const socialLinks = await fetchSocialLinks();
  return (
    <div id="hero" className="hero min-h-screen">
      <Image
        src={heroUrl}
        alt="hero"
        fill
        style={{
          objectFit: "cover",
        }}
      />
      <div className="hero-overlay bg-neutral bg-opacity-50" />
      <div className="hero-content text-center">
        <div className="max-w-md">
          <FadeText className="mb-5 text-6xl font-bold text-secondary duration-200 hover:scale-105" direction="right" text="Salam!" />

          <TextGenerateEffect className="mb-5 text-white " words={" \"The believers are but brothers, so make settlement between your brothers. And fear Allāh that you may receive mercy.\" (Quran 49:10)"} />



          <div className="flex flex-row items-center justify-center gap-4">
            {socialLinks.map((social, index) => (
              <a
                href={typeof social.link === 'object' ? social.link.url : '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="duration-200 hover:scale-105"
                key={index}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 50 50"
                  className="h-8 w-8 fill-base-100 stroke-neutral hover:fill-base-200"
                >
                  <path key={index} d={social.icon}></path>
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
  
export default Hero;
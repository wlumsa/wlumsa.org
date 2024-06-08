import React from "react";
import GradualSpacing from "./gradual-spacing-animation";
import { TextGenerateEffect } from "./text-generate-effect";
import Image from "next/image";
interface SocialLink {
  name: string;
  link: string;
  icon: string;
}

const Hero: React.FC<{ socialLinks: SocialLink[]; heroUrl: string }> = ({
  socialLinks,
  heroUrl,
}) => {
  return (
    <div id="hero" className="hero min-h-screen">
      {/* Hero Image */}
      <Image
        src={heroUrl}
        alt="hero"
        fill
        style={{
          objectFit: "fill",
        }}
      />

      {/* Hero Overlay */}
      <div className="hero-overlay bg-neutral bg-opacity-50" />

      {/* Hero Content */}
      <div className="hero-content text-center">
        <div className="max-w-md">
          <GradualSpacing className="mb-5 text-6xl font-bold text-secondary duration-200 hover:scale-105" text="Salam!" duration={1}/>
           
          <TextGenerateEffect className="mb-5 text-white " words = {" \"The believers are but brothers, so make settlement between your brothers. And fear Allāh that you may receive mercy.\" (Quran 49:10)"}/>
             
          

          {/* Social Links */}
          <div className="flex flex-row items-center justify-center gap-4">
            {socialLinks &&
              socialLinks.map((social, index) => (
                <a
                  href={social.link}
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

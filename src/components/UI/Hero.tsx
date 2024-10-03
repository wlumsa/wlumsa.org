"use client"
import React from "react";
import { TextEffect } from "../Animations/text-effect";
import Image from "next/image";
import { FadeText } from "../Animations/FadeText";
import { Social, Media } from "@/payload-types";

interface HeroProps {
  socialLinks: Social[];
  mediaDocs: Media[];
}
const Hero: React.FC<HeroProps> = ({ mediaDocs, socialLinks }) => {

  return (
    <div id="hero" className="hero min-h-screen relative overflow-hidden">
      <Image
        fill
        src={mediaDocs[0]?.url || ''}
        alt={mediaDocs[0]?.alt || "Hero Image"}
        className="object-cover w-full h-fit blur-sm scale-105"

      />
      <div className="hero-overlay bg-neutral bg-opacity-50" />
      <div className="hero-content text-center">
        <div className="max-w-md">
          <FadeText className="mb-5 text-6xl font-bold text-secondary duration-200 hover:scale-105" direction="right" text="Salam!" />

          <TextEffect   className="mb-5 text-white" per="char" as="h2">"The believers are but brothers, so make settlement between your brothers. And fear Allāh that you may receive mercy." (Quran 49:10)</TextEffect>
          <div className="flex flex-row m-4 justify-center mb-6" >
            <button className="btn btn-primary text-white  mx-4"><a href="https://docs.google.com/forms/d/e/1FAIpQLSfwn-5xuz58a9nzINqZoofyiMr-C7lphMs5KesnzVOB1jrXNg/viewform">Donate</a></button>
            <button className=" btn btn-secondary mx-4 "><a href="/guidebook">Become a Member</a></button>
          </div>
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
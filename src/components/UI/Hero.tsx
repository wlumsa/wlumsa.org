import React from "react";
import { TextEffect } from "../Animations/text-effect";
import Image from "next/image";
import { FadeText } from "../Animations/FadeText";
import { Social, Media } from "@/payload-types";
import Link from "next/link";
import { GetStartedButton } from "./button"

interface HeroProps {
  socialLinks: Social[];
  mediaDocs: Media[];
}
const Hero: React.FC<HeroProps> = ({ mediaDocs, socialLinks }) => {

  return (
    <div id="hero" className="hero min-h-screen relative overflow-hidden">
      {mediaDocs[0]?.url ? (
        <Image
          fill
          src={mediaDocs[0].url}
          alt={mediaDocs[0]?.alt || "Hero Image"}
          className="object-cover w-full h-fit blur-sm scale-105"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />
      )}
      <div className="hero-overlay bg-neutral bg-opacity-50" />
      <div className="hero-content text-center">
        <div className="max-w-md">
          <FadeText className="mb-5 text-6xl font-bold text-secondary duration-200 hover:scale-105" direction="right" text="Salam!" />
          <TextEffect
            className="mb-5 text-white"
            per="word"           // Animate by word instead of character for faster loading
            as="h2"
            delay={0.1}          // Start animation quickly after page load
            variants={{
              container: {
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.04, // 0.04s between words = ~0.4s total animation
                  },
                },
              },
              item: {
                hidden: { opacity: 0, y: 8 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.3,
                    ease: "easeOut"
                  }
                },
              },
            }}
          >
            "The believers are but brothers, so make settlement between your brothers. And fear Allāh that you may receive mercy." (Quran 49:10)
          </TextEffect>
          <div className="flex flex-row m-4 justify-center mb-6 items-center gap-4" >
            {/* Keep consistent styling for main CTA buttons regardless of theme */}
            <button className="btn btn-primary text-yellow-400 text-bold h-12 px-6 py-3 duration-200 hover:scale-105 hover:bg-primary/90">
              <Link href="https://docs.google.com/forms/d/e/1FAIpQLSfwn-5xuz58a9nzINqZoofyiMr-C7lphMs5KesnzVOB1jrXNg/viewform">Donate</Link>
            </button>
            <Link href="/guidebook"> <GetStartedButton variant="secondary" className="h-12 px-6 py-3">
              Become a Member
            </GetStartedButton> </Link>
          </div>
          <div className="flex flex-row items-center justify-center gap-4">
            {/* Keep consistent styling for social media icons regardless of theme */}
            {socialLinks.map((social, index) => (
              <Link
                href={typeof social.link === 'object' ? social.link.url : '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="duration-200 hover:scale-105"
                key={index}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 50 50"
                  className="h-8 w-8 fill-secondary stroke-gray-600 hover:fill-secondary-focus"
                >
                  <path key={index} d={social.icon}></path>
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

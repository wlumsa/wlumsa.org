import React from "react";

import Image from "next/image";
import { SocialLinks } from "@/utils/types";

/**
 * Hero component displays a hero section with an image, overlay, content, and social links.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {SocialLink[]} props.socialLinks - An array of social links.
 * @param {string} props.heroUrl - The URL of the hero image.
 * @returns {JSX.Element} The rendered Hero component.
 */

const Hero: React.FC<{ socialLinks: SocialLinks; heroUrl: string }>= ({
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
          {/* Hero Title */}
          <h1 className="mb-5 text-6xl font-bold text-secondary duration-200 hover:scale-105">
            Salam!
          </h1>

          {/* Hero Description */}
          <p className="mb-5 text-white" style={{ textShadow: '2px 2px 2px #000000' }}>
            "The believers are but brothers, so make settlement between your brothers. And fear Allāh that you may receive mercy." (Quran 49:10)
          </p>

          {/* Social Links */}
          <div className="flex flex-row items-center justify-center gap-4">
            {socialLinks &&
              socialLinks.map((social, index) => (
                <a
                  href={social.url}
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

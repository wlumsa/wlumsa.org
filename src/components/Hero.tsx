import React, { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import db, { storage } from "../firebase";
import { ref, getDownloadURL } from "firebase/storage";

interface SocialLink {
  name: string;
  link: string;
  icon: string;
}

const Hero: React.FC<{ socialLinks: SocialLink[], heroUrl: string }> = ({ socialLinks, heroUrl }) => {
  return (
    <div
      id="hero"
      className="hero min-h-screen"
      style={{ backgroundImage: `url(${heroUrl})` }}
    >
      <div className="hero-overlay bg-neutral bg-opacity-50" />
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-6xl font-bold text-secondary duration-200 hover:scale-105">
            Salam!
          </h1>
          <p className="mb-5 text-base-100">
            "The believers are but brothers, so make settlement between your
            brothers. And fear Allāh that you may receive mercy." (Quran 49:10)
          </p>
          <div className="flex flex-row items-center justify-center gap-4">
            {socialLinks && socialLinks.map((social, index) => (
              <a
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="duration-200 hover:scale-105"
                key = {index}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 50 50"
                  className="h-8 w-8 fill-base-100 stroke-neutral hover:fill-base-200"
                >
                  <path key = {index} d={social.icon}></path>
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

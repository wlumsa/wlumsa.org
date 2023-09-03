import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import db, { storage } from "../firebase";
import { ref, getDownloadURL } from "firebase/storage";

interface SocialLink {
  name: string;
  link: string;
  icon: string;
}


const Hero: React.FC = () => {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [heroUrl, setHeroUrl] = useState('');

  useEffect(() => {
    const fetchSocialLinks = async () => {
      const socialsCollectionRef = collection(db, "Socials");
      const querySnapshot = await getDocs(socialsCollectionRef);
      
      const socialLinksData = querySnapshot.docs.map(doc => {
        const socialData = doc.data() as SocialLink;
        return socialData;
      });
    
      setSocialLinks(socialLinksData);
    };

    const fetchHeroUrl = async () => {
      const heroRef = ref(storage, 'images/hero.jpg');
      const url = await getDownloadURL(heroRef);
      setHeroUrl(url);
    }

    fetchHeroUrl();
    fetchSocialLinks();
  }, []);

  return (
    <div id="hero" className="hero min-h-screen" style={{backgroundImage: `url(${heroUrl})`}}>
        <div className="hero-overlay bg-opacity-50 bg-neutral" />
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-6xl font-bold text-secondary hover:scale-105 duration-200">Salam!</h1>
            <p className="mb-5 text-base-100">"The believers are but brothers, so make settlement between your brothers. And fear Allāh that you may receive mercy." (Quran 49:10)</p>
            <div className="flex flex-row gap-4 items-center justify-center">
              {socialLinks.map((social, index) => (
                <a href={social.link} target='_blank' rel='noopener noreferrer' className="hover:scale-105 duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" className="w-8 h-8 stroke-neutral fill-base-100 hover:fill-base-200">
                    <path d={social.icon}></path>
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

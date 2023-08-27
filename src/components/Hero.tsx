import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import db, { storage } from "../firebase";
import Link from "next/link";
import { ref, getDownloadURL } from "firebase/storage";

interface SocialLink {
  name: string;
  link: string;
  icon: string;
}

const Hero: React.FC = () => {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]); // Specify the type here
  const [heroUrl, setHeroUrl] = useState('');


  useEffect(() => {
    const fetchSocialLinks = async () => {
      const socialsCollectionRef = collection(db, "Socials");
      const querySnapshot = await getDocs(socialsCollectionRef);
      
      const socialLinksData = querySnapshot.docs.map(doc => doc.data() as SocialLink); // Use type assertion
      setSocialLinks(socialLinksData);
    };
    const fetchHeroUrl = async () => {
      const heroRef = ref(storage, 'gs://wlumsa-website-f73df.appspot.com/hero.jpg');
      const url = await getDownloadURL(heroRef);
      setHeroUrl(url);
  }
    fetchHeroUrl();
    fetchSocialLinks();
  }, []);

  return (
    <div className="hero min-h-screen" style={{backgroundImage: `url(${heroUrl})`}}>
        <div className="hero-overlay bg-opacity-50 bg-neutral" />
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-6xl font-bold text-secondary">Salam!</h1>
            <p className="mb-5 text-base-100">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
            <div className="join">
              {socialLinks.map((social, index) => (
                <button key={index} className="btn btn-ghost text-base-100 border-0 hover:bg-transparent">
                  <Link href={social.link} target='_blank' rel='noopener noreferrer'>
                    <img className="w-8 h-8" src={social.icon}  alt={social.name}/>
                  </Link>  
                </button>
              ))}
            </div>
          </div>
        </div>
    </div>
  );
};

export default Hero;

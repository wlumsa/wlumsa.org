import React, { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import db, { storage } from "../firebase";
import logo from "public/logo.png";
interface FooterItem {
  name: string;
  link: string;
}

interface SocialLink {
  name: string;
  link: string;
  icon: string;
}

interface Other {
  name: string;
  link: string;
}
const Footer: React.FC = () => {
  const [resources, setResources] = useState<FooterItem[]>([]);
  const [forms, setForms] = useState<FooterItem[]>([]);
  const [localMosques, setLocalMosques] = useState<FooterItem[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [otherLinks, setOtherLinks] = useState<Other[]>([]);

  useEffect(() => {
    const fetchFooterItems = async (
      collectionName: string,
      setState: Function
    ) => {
      const collectionRef = collection(db, collectionName);
      const querySnapshot = await getDocs(collectionRef);

      const itemsData = querySnapshot.docs.map(
        (doc) => doc.data() as FooterItem | SocialLink
      );
      setState(itemsData);
    };

    const fetchSocialLinks = async () => {
      const socialsCollectionRef = collection(db, "Socials");
      const socialQuery = query(socialsCollectionRef, orderBy("date", "asc"));
      const querySnapshot = await getDocs(socialQuery);

      const socialLinksData = querySnapshot.docs.map((doc) => {
        const socialData = doc.data() as SocialLink;
        return socialData;
      });

      setSocialLinks(socialLinksData);
    };

    fetchFooterItems("Resources", setResources);
    fetchFooterItems("Forms", setForms);
    fetchFooterItems("LocalMosques", setLocalMosques);
    fetchFooterItems("Other", setOtherLinks);
    fetchSocialLinks();
  }, []);

  return (
    <>
      <footer id="member" className="footer bg-base-100 p-10 text-base-content">
        <div>
          <span className="footer-title">Resources</span>
          {resources.map((item, index) => (
            <a
              key={index}
              href={item.link}
              className="link-hover link"
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.name}
            </a>
          ))}
        </div>
        <div>
          <span className="footer-title">Forms</span>
          {forms.map((item, index) => (
            <a
              key={index}
              href={item.link}
              className="link-hover link"
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.name}
            </a>
          ))}
        </div>
        <div>
          <span className="footer-title">Local Mosques</span>
          {localMosques.map((item, index) => (
            <a
              key={index}
              href={item.link}
              className="link-hover link"
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.name}
            </a>
          ))}
        </div>
        <div>
          <span className="footer-title">Other</span>
          {otherLinks.map((item, index) => (
            <a
              key={index}
              href={item.link}
              className="link-hover link"
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.name}
            </a>
          ))}
        </div>
      </footer>

      <footer className="footer border-0 bg-base-100 px-10 py-4 text-base-content">
        <div className="grid-flow-col items-center">
          <img src={logo.src} alt="WLU MSA Logo" className="mr-2 h-6 w-6" />
          <p>
            Wilfrid Laurier University <br />
            Muslim Students' Association
          </p>
        </div>
        <div className="md:place-self-center md:justify-self-end">
          <div className="flex flex-row items-center justify-center gap-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="duration-200 hover:scale-105"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 50 50"
                  className="hover:fill-neutral-focus h-6 w-6 fill-neutral"
                >
                  <path key={index} d={social.icon}></path>
                </svg>
              </a>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;

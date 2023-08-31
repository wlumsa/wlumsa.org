import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import db, { storage } from "../firebase";
import logo from "public/logo.png"
interface FooterItem {
  name: string;
  link: string;
}

interface SocialLink {
    name: string;
    link: string;
    icon: string;
}

interface  Other  {
    name:string;
    link:string;
}
const Footer: React.FC = () => {
    const [resources, setResources] = useState<FooterItem[]>([]);
    const [forms, setForms] = useState<FooterItem[]>([]);
    const [localMosques, setLocalMosques] = useState<FooterItem[]>([]);
    const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
    const [otherLinks,setOtherLinks] = useState<Other[]>([]);
    

    useEffect(() => {
        const fetchFooterItems = async (collectionName: string, setState: Function) => {
            const collectionRef = collection(db, collectionName);
            const querySnapshot = await getDocs(collectionRef);
            
            const itemsData = querySnapshot.docs.map(doc => doc.data() as FooterItem | SocialLink);
            setState(itemsData);
        };
       
        const fetchSocialLinks = async () => {
            const socialsCollectionRef = collection(db, "Socials");
            const querySnapshot = await getDocs(socialsCollectionRef);
            
            const socialLinksData = await Promise.all(querySnapshot.docs.map(async (doc) => {
              const socialData = doc.data() as SocialLink;
              const iconURL = await getDownloadURL(ref(storage, socialData.icon)); // Assuming socialData.icon is the path to the icon in Firebase Storage
              return {...socialData, icon: iconURL };
            }));
            console.log(socialLinksData)
            setSocialLinks(socialLinksData);
          };
    
        fetchFooterItems("Resources", setResources);
        fetchFooterItems("Forms", setForms);
        fetchFooterItems("Mosques", setLocalMosques);
        fetchFooterItems("Other",setOtherLinks)
        fetchSocialLinks();
    }, []);
    

    return (
        <>
            <footer id="member" className="footer p-10 bg-base-100 text-base-content">
                <div>
                    <span className="footer-title">Resources</span> 
                    {resources.map((item, index) => (
                        <a key={index} href={item.link} className="link link-hover" target="_blank" rel="noopener noreferrer">{item.name}</a>
                    ))}
                </div> 
                <div>
                    <span className="footer-title">Forms</span> 
                    {forms.map((item, index) => (
                        <a key={index} href={item.link} className="link link-hover" target="_blank" rel="noopener noreferrer">{item.name}</a>
                    ))}
                </div> 
                <div>
                    <span className="footer-title">Local Mosques</span> 
                    {localMosques.map((item, index) => (
                        <a key={index} href={item.link} className="link link-hover" target="_blank" rel="noopener noreferrer">{item.name}</a>
                    ))}
                </div>
                <div>
                    <span className="footer-title">Other</span> 
                    {otherLinks.map((item, index) => (
                        <a key={index} href={item.link} className="link link-hover" target="_blank" rel="noopener noreferrer">{item.name}</a>
                    ))}
                </div>
            </footer>
            
            <footer className="footer px-10 py-4 bg-base-100 text-base-content border-0">
                <div className="items-center grid-flow-col">
                    <img src={logo.src} alt="WLU MSA Logo" className="h-6 w-6 mr-2" />
                    <p>Wilfrid Laurier University <br/>Muslim Students' Association</p>
                </div> 
                <div className="md:place-self-center md:justify-self-end">
                    <div className="grid grid-flow-col gap-4">
                        {socialLinks.map((social, index) => (
                            <a key={index} href={social.link} target='_blank' rel='noopener noreferrer'>
                                <svg className="fill-current text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <image xlinkHref={social.icon} width="24" height="24" />
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
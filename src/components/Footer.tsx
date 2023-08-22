import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import db, { storage } from "../firebase";

interface FooterItem {
  name: string;
  link: string;
}

interface SocialLink {
    name: string;
    link: string;
    icon: string;
}

const Footer: React.FC = () => {
    const [resources, setResources] = useState<FooterItem[]>([]);
    const [forms, setForms] = useState<FooterItem[]>([]);
    const [localMosques, setLocalMosques] = useState<FooterItem[]>([]);
    const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
    const [logoUrl, setLogoUrl] = useState('');

    useEffect(() => {
        const fetchFooterItems = async (collectionName: string, setState: Function) => {
            const collectionRef = collection(db, collectionName);
            const querySnapshot = await getDocs(collectionRef);
            
            const itemsData = querySnapshot.docs.map(doc => doc.data() as FooterItem | SocialLink);
            setState(itemsData);
        };
        const fetchLogoUrl = async () => {
            const logoRef = ref(storage, 'gs://wlumsa-website-f73df.appspot.com/logo.png');
            const url = await getDownloadURL(logoRef);
            setLogoUrl(url);
        }
    
        fetchFooterItems("Resources", setResources);
        fetchFooterItems("Forms", setForms);
        fetchFooterItems("LocalMosques", setLocalMosques);
        fetchFooterItems("Socials", setSocialLinks);
        fetchLogoUrl();
    }, []);
    

    return (
        <>
            <footer className="footer p-10 bg-base-100 text-base-content">
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
            </footer>
            
            <footer className="footer px-10 py-4 bg-base-100 text-base-content border-0">
                <div className="items-center grid-flow-col">
                    <img src={logoUrl} alt="WLU MSA Logo" className="h-6 w-6 mr-2" />
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
import React from 'react';
import { useState, useEffect} from 'react';
import CtaForm from '~/components/CtaForm';
import Navbar from '~/components/Navbar';
import Footer from '~/components/Footer';
import ResourceCollapse from '~/components/ResourceCollapse';
import { collection, getDocs } from "firebase/firestore";
import db from "../firebase";
import { NextPage } from 'next';

interface SocialLink {
    link: string;
    icon: string;
}
interface Resource{
    title:string,
    link:string;
}

const ResourcesPage:NextPage = () => {
    const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
    const [campusResources, setCampusResources] = useState<Resource[]>([]);
    const [religiousResources, setReligiousResources] = useState<Resource[]>([]);
    const [otherResources, setOtherResources] = useState<Resource[]>([]);
    const fetchCollection = async (name: string, set: Function) => {
        const ref = collection(db, name);
        const snapshot = await getDocs(ref);
        const data = snapshot.docs.map(doc => doc.data() as Resource);
        set(data);
    };
   
    useEffect(() => {
        fetchCollection("Socials", setSocialLinks);
        fetchCollection("CampusResources", setCampusResources);
        fetchCollection("ReligiousResources", setReligiousResources);
        fetchCollection("OtherResources", setOtherResources);
    }, []);

    return (
        <div className='flex flex-col items-center justify-center'>
            <Navbar/>
            <main className='max-w-full mt-24 flex flex-col items-center justify-center gap-6 px-10'>
                <h1 className='text-3xl font-bold text-primary'>Get In Touch</h1>
                <div className='flex flex-col lg:flex-row gap-6 items-center justify-center'>
                    <CtaForm />
                    <div className='flex flex-col gap-4 items-center justify-center'>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d574.5123406885597!2d-80.52840270038443!3d43.47394430083161!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882bf3f61b1f9a23%3A0xd224e64459372537!2sWilfrid%20Laurier%20University%20Waterloo%20Campus!5e0!3m2!1sen!2sca!4v1699381173730!5m2!1sen!2sca"
                            className="w-80 sm:w-96 max-w-full h-[30rem] rounded-lg shadow-md"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                        />
                        <div className="join join-horizontal shadow-md w-fit self-center">
                            {socialLinks.map((social, index) => (
                                <a key={index} className="btn join-item" href={social.link} target='_blank' rel='noopener noreferrer'>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" className="w-6 h-6 fill-primary">
                                        <path d={social.icon}></path>
                                    </svg>
                                </a> 
                            ))}
                        </div>
                    </div>
                </div>
                <div className="py-10 flex flex-col gap-4 w-full">
                    <h1 className="text-3xl font-bold text-primary">Resources We Offer</h1>
                    <ResourceCollapse resources={campusResources} header='Campus Resources' />
                    <ResourceCollapse resources={religiousResources} header='Religious Resources' />
                    <ResourceCollapse resources={otherResources} header='Other Resources' />
                </div>                             
            </main>
            <Footer/>
        </div>
    );
};
    
export default ResourcesPage;
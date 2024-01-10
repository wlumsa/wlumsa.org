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
    name: string;
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
        <div>
            <Navbar/>
            {/*Desktop*/}
            <div className='hidden md:flex md:flex-col mt-20  items-center'>
                <div className="grid grid-cols-2 gap-10 m-10 w-full ">
                    <div className="flex flex-col ">
                        <h3 className="text-3xl text-center font-bold text-primary pt-4 lg:pt-0 hover:scale-105 duration-200">Contact Us!</h3>
                        <p className="lg:text-lg text-center text-neutral">Fill out the form or shoot us a message on one of our social media accounts!</p>
                        <div className="flex flex-row">
                            <div className="flex flex-col"> 
                                {socialLinks.map((social, index) => (
                                <div key={index} className="flex items-center mt-[3.8rem] hover:scale-105 duration-200 mx-20">
                                    <a href={social.link} target='_blank' rel='noopener noreferrer' className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" className="w-6 h-6 fill-neutral hover:fill-neutral-focus mr-2">
                                        <path d={social.icon}></path>
                                    </svg>
                                    <span className="text-neutral">{social.name}</span>
                                    </a> 
                                </div>
                                ))}
                            </div>
                            <div className="mt-[3.8rem] w-full "> 
                                <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d574.5123406885597!2d-80.52840270038443!3d43.47394430083161!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882bf3f61b1f9a23%3A0xd224e64459372537!2sWilfrid%20Laurier%20University%20Waterloo%20Campus!5e0!3m2!1sen!2sca!4v1699381173730!5m2!1sen!2sca"
                                className="w-full h-full"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-center'>
                        <CtaForm/>
                    </div>
                </div>
            </div>
             {/* Section for small screens */}
             <div className="md:hidden flex flex-col items-center px-4 ">
                <h3 className="text-3xl mt-20 font-bold text-primary pt-4 lg:pt-0 hover:scale-105 duration-200">Contact Us!</h3>
                <p className="lg:text-lg text-center text-neutral mb-10">Fill out the form or send us a message on one of our social media accounts!</p>
                <CtaForm />
                <div className="w-full p-6">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d574.5123406885597!2d-80.52840270038443!3d43.47394430083161!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882bf3f61b1f9a23%3A0xd224e64459372537!2sWilfrid%20Laurier%20University%20Waterloo%20Campus!5e0!3m2!1sen!2sca!4v1699381173730!5m2!1sen!2sca"
                        className="w-full h-96"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                    ></iframe>
                </div>
            </div>
           

            {/* Resources */}
            <div className="p-10 flex flex-col gap-4">
                <h2 className="text-3xl font-bold text-primary">Resources We Offer</h2>
                <ResourceCollapse resources={campusResources} header='Campus Resources' />
                <ResourceCollapse resources={religiousResources} header='Religious Resources' />
                <ResourceCollapse resources={otherResources} header='Other Resources' />
            </div>                             
            <Footer/>
        </div>
    );
};
    
export default ResourcesPage;
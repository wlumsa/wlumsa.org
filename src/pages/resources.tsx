import React from 'react';

import { useState, useEffect} from 'react';

import CtaForm from '~/components/CtaForm';

import Navbar from '~/components/Navbar';

import Footer from '~/components/Footer';

import { collection, getDocs,query,orderBy } from "firebase/firestore";

import db from "../firebase";
import { NextPage } from 'next';

interface SocialLink {
    name: string;
    link: string;
    icon: string;
}

const ResourcesPage:NextPage = () => {
    const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
   
    useEffect(() => {
    
       
        const fetchSocialLinks = async () => {
            const socialsCollectionRef = collection(db, "Socials");
            const socialQuery = query(socialsCollectionRef,orderBy("date","asc"))
            const querySnapshot = await getDocs(socialQuery);
            
            const socialLinksData = querySnapshot.docs.map(doc => {
              const socialData = doc.data() as SocialLink;
              return socialData;
            });
          
            setSocialLinks(socialLinksData);
          };
        fetchSocialLinks();
    }, []);

    return (
        <div className="">
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
                <div className="w-full my-6">
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
            <div className="m-10 mx-20">
                
                <h2 className="text-3xl  font-bold text-primary pt-4 lg:pt-0 hover:scale-105 duration-200 mb-10">Resources Avaliable</h2>
                    <div tabIndex={0} className="collapse collapse-plus border border-base-300 bg-base-200">
                        <div className="collapse-title text-xl font-medium">
                            Campus Resources
                        </div>
                        <div className="collapse-content"> 
                            <ul>
                                <li>Item 1</li>
                                <li>Item 2</li>
                                <li>Item 3</li>
                                <li>Item 4</li>
                                <li>Item 5</li>
                            </ul>
                         </div>
                    </div>
                    <div tabIndex={0} className="collapse collapse-plus border border-base-300 bg-base-200">
                        <div className="collapse-title text-xl font-medium">
                            Religious  Resources
                        </div>
                        <div className="collapse-content"> 
                        <ul>
                                <li>Item 1</li>
                                <li>Item 2</li>
                                <li>Item 3</li>
                                <li>Item 4</li>
                                <li>Item 5</li>
                            </ul>
                        </div>
                    </div>
                    <div tabIndex={0} className="collapse collapse-plus border border-base-300 bg-base-200">
                        <div className="collapse-title text-xl font-medium">
                            Other
                        </div>
                        <div className="collapse-content"> 
                        <ul>
                                <li>Item 1</li>
                                <li>Item 2</li>
                                <li>Item 3</li>
                                <li>Item 4</li>
                                <li>Item 5</li>
                            </ul>
                        </div>
                    </div>
                </div>                             
            <Footer/>
           
        </div>

    );
};
    
    export default ResourcesPage;

/*
 <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d574.5123406885597!2d-80.52840270038443!3d43.47394430083161!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882bf3f61b1f9a23%3A0xd224e64459372537!2sWilfrid%20Laurier%20University%20Waterloo%20Campus!5e0!3m2!1sen!2sca!4v1699381173730!5m2!1sen!2sca" width="600" height="450"  ></iframe>
md

<div className="container">
            <Navbar/>
            <div className='flex flex-col mt-20'>
                <div className="grid grid-cols-2 gap-10 m-10 mx-20">
                    <div className="flex flex-col">
                        <h3 className="text-3xl font-bold mb-4">Contact Us!</h3>
                        <div className="flex">
                            <div className="flex flex-col mr-4"> 
                                {socialLinks.map((social, index) => (
                                <div key={index} className="flex items-center mt-[3.8rem] hover:scale-105 duration-200">
                                    <a href={social.link} target='_blank' rel='noopener noreferrer' className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" className="w-6 h-6 fill-neutral hover:fill-neutral-focus mr-2">
                                        <path d={social.icon}></path>
                                    </svg>
                                    <span className="text-neutral">{social.name}</span>
                                    </a> 
                                </div>
                                ))}
                            </div>
                            <div className="mt-[3.8rem]"> 
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d574.5123406885597!2d-80.52840270038443!3d43.47394430083161!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882bf3f61b1f9a23%3A0xd224e64459372537!2sWilfrid%20Laurier%20University%20Waterloo%20Campus!5e0!3m2!1sen!2sca!4v1699381173730!5m2!1sen!2sca" width="600" height="450"  ></iframe>
                            </div>
                        </div>
                    </div>
                    <div>
                        <CtaForm/>
                    </div>
                </div>
            </div>
            <section className="m-10 mx-20">
                            <h2 className="text-2xl font-bold mb-4">Resources</h2>
                            <div tabIndex={0} className="collapse collapse-plus border border-base-300 bg-base-200">
                                <div className="collapse-title text-xl font-medium">
                                    Campus Resources
                                </div>
                                <div className="collapse-content"> 
                                    <p>Tadsdwadsa</p>
                                </div>
                            </div>
                            <div tabIndex={0} className="collapse collapse-plus border border-base-300 bg-base-200">
                                <div className="collapse-title text-xl font-medium">
                                    Religious  Resources
                                </div>
                                <div className="collapse-content"> 
                                    <p>adssadwae</p>
                                </div>
                            </div>
                            <div tabIndex={0} className="collapse collapse-plus border border-base-300 bg-base-200">
                                <div className="collapse-title text-xl font-medium">
                                    Other
                                </div>
                                <div className="collapse-content"> 
                                    <p>asdsadable</p>
                                </div>
                            </div>
                        </section>
                                          
            <Footer/>
           
        </div>


 */



        /*
        
         <div className='mt-20 lg:hidden'>
                
         <div className='flex flex-col justify-center items-center m-10 mx-20'>
         <h3 className="text-3xl font-bold mb-4">Contact Us!</h3>
             <div className=''>
                 <CtaForm/>
             </div>
             <div className="mt-10"> 
                 <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d574.5123406885597!2d-80.52840270038443!3d43.47394430083161!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882bf3f61b1f9a23%3A0xd224e64459372537!2sWilfrid%20Laurier%20University%20Waterloo%20Campus!5e0!3m2!1sen!2sca!4v1699381173730!5m2!1sen!2sca"  width="300" height="250"  ></iframe>
             </div>
         </div>
     </div>
     */
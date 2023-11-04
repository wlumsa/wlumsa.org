import React, { useState } from 'react';

import CtaForm from '~/components/CtaForm';

import Navbar from '~/components/Navbar';

import { collection, getDocs,query,orderBy } from "firebase/firestore";

import db from "../firebase";
import Footer from '~/components/Footer';


interface SocialLink {
    name: string;
    link: string;
    icon: string;
}

const ResourcesPage: React.FC = () => {
    // Define state hooks for each form field
    
   

    return (
        <div className="container mx-auto ">
            <Navbar/>
            <div className='flex flex-col mt-20'>
        
                {/* ... other sections ... */}

                
                <div className="grid grid-flow-col">
                    <div>
                        
                        <div className="flex flex-col gap-[3.85rem] ml-10 py-2 justify-center my-8 bg-neutral">
                           
                        </div>
                    </div>
                    <CtaForm/>
                </div>
                

                <section className="p-4">
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
                



                {/* Immediate Support Form Section */}
                
                {/* ... other sections for Special Constable Form, Diversity at WLU, SafeHawk App ... */}
                {/* ... */}
                
                {/* ... Additional Links ... */}
                {/* ... */}
            </div>
            <Footer/>
            {/* ... Footer ... */}
            {/* ... */}
        </div>
    );
};

export default ResourcesPage;
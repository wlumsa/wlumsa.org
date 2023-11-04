import React, { useState } from 'react';
import axios from 'axios';
import CtaForm from '~/components/CtaForm';

const ResourcesPage: React.FC = () => {
    // Define state hooks for each form field
    

    return (
        <div className="container mx-auto px-4">
            <main>
                {/* ... other sections ... */}
                <section className="my-8">
                    <CtaForm/>
                </section>
                

                <section className="p-4">
                    <h2 className="text-2xl font-bold mb-4">Resources</h2>
                    <div tabIndex={0} className="collapse collapse-plus border border-base-300 bg-base-200">
                        <div className="collapse-title text-xl font-medium">
                            Focus me to see content
                        </div>
                        <div className="collapse-content"> 
                            <p>tabindex="0" attribute is necessary to make the div focusable</p>
                        </div>
                    </div>
                    <div tabIndex={0} className="collapse collapse-plus border border-base-300 bg-base-200">
                        <div className="collapse-title text-xl font-medium">
                            Focus me to see content
                        </div>
                        <div className="collapse-content"> 
                            <p>tabindex="0" attribute is necessary to make the div focusable</p>
                        </div>
                    </div>
                </section>
                



                {/* Immediate Support Form Section */}
                
                {/* ... other sections for Special Constable Form, Diversity at WLU, SafeHawk App ... */}
                {/* ... */}
                
                {/* ... Additional Links ... */}
                {/* ... */}
            </main>
            
            {/* ... Footer ... */}
            {/* ... */}
        </div>
    );
};

export default ResourcesPage;
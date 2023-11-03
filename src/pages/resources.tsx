import React, { useState } from 'react';
import axios from 'axios';
import CtaForm from '~/components/CtaForm';

const ResourcesPage: React.FC = () => {
    // Define state hooks for each form field
    

    return (
        <div className="container mx-auto px-4">
            <main>
                {/* ... other sections ... */}
                
                {/* Immediate Support Form Section */}
                <section className="my-8">
                    <CtaForm/>
                </section>
                
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
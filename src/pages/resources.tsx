// pages/resources.tsx
import React, { useState } from 'react';
import axios from 'axios';

const ResourcesPage: React.FC = () => {
    // Define state hooks for each form field
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [studentId, setStudentId] = useState('');
    const [issue, setIssue] = useState(''); // State hook for the issue/concern
    const [category, setCategory] = useState('');
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        // Package the form data, including the new category field
        const formData = {
            firstName,
            lastName,
            email,
            studentId,
            issue,
            category, 
        };
    
        // Send the form data to your backend API
        try {
            const response = await axios({
                method: 'post',
                url: '/api/sendemail', // Your backend endpoint to send emails
                data: formData,
            });
            console.log(response.data);
            // Clear the form fields after successful submission
            setFirstName('');
            setLastName('');
            setEmail('');
            setStudentId('');
            setIssue('');
            setCategory('Contact'); // Reset the category to the default value
        } catch (error) {
            console.error("Error sending form: ", error);
        }
    };
    

    return (
        <div className="container mx-auto px-4">
            <main>
                {/* ... other sections ... */}
                
                {/* Immediate Support Form Section */}
                <section className="my-8">
                    <h2 className="text-2xl font-bold text-neutral mb-4">Title</h2>
                    <div className="flex items-center justify-center w-full py-2 bg-base-100">
                        <div className="w-[30rem] px-2">
                            <form className="card-body" onSubmit={handleSubmit}>
                                <h3 className="card-title text-3xl lg:text-4xl text-primary hover:scale-105 duration-200 ">Reach out to us!</h3>
                                <p className="lg:text-lg text-neutral">Send us a message</p>
                                <div className="flex flex-col gap-2 py-2">
                                <input 
                            type="text" 
                            required
                            placeholder="First Name" 
                            className="input input-bordered w-full text-neutral focus:border-secondary"
                            onChange={(e)=>setFirstName(e.target.value) } value = {firstName} />   
                        <input 
                            type="text" 
                            required
                            placeholder="Last Name" 
                            className="input input-bordered w-full text-neutral focus:border-secondary" 
                            onChange={(e)=>setLastName(e.target.value) } value = {lastName}
                            />
                        <input 
                            type="email" 
                            required
                            placeholder="MyLaurier Email" 
                            className="input input-bordered w-full text-neutral focus:border-secondary" 
                            onChange={(e)=>setEmail(e.target.value) } value = {email}
                            />
                        <input 
                            type="string" 
                            required
                            placeholder="Student ID" 
                            className="input input-bordered w-full text-neutral focus:border-secondary"
                            onChange={(e)=>setStudentId(e.target.value.toString()) } value = {studentId} />
                            <select
                                required
                                className="select select-bordered w-full text-neutral focus:border-secondary"
                                onChange={(e) => setCategory(e.target.value)} value={category}>
                                <option value="Contact">Contact</option>    
                                <option value="Service">Service</option>
                                <option value="Request">Request</option>
                            </select>
                        <textarea
                            required
                            placeholder="Message"
                            className="textarea textarea-bordered w-full text-neutral focus:border-secondary"
                            rows={4}
                            onChange={(e) => setIssue(e.target.value)} value={issue}>
                        </textarea>
                                </div>
                                <div className="card-actions justify-end">
                                    <button type="submit" className="btn text-secondary bg-primary hover:bg-secondary hover:text-primary border-0 shadow hover:scale-105 duration-200">Submit ➜</button>
                                </div>
                            </form>
                        </div>
                    </div>
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

import React, { useState } from 'react';
import axios from 'axios';

const CtaForm: React.FC = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [studentId, setStudentId] = useState('');
    const [summary, setSummary] = useState('');
    const [category, setCategory] = useState('Contact');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = {
            fullName,
            email,
            phoneNumber,
            studentId,
            summary,
            category,
        };
        
        try {
            const response = await axios.post('/api/sendemail', formData);
            console.log(response.data);
            setFullName('');
            setEmail('');
            setPhoneNumber('');
            setStudentId('');
            setSummary('');
            setCategory('Contact');
        } catch (error) {
            console.error("Error sending form: ", error);
        }
    };

    // Return the form JSX
    return (
        <div>
        <section className="my-8">
            
            <div className="flex items-center justify-end px-10 w-full py-2 bg-base-100">
                <div className="w-[30rem] px-2 bg-primary rounded-xl">
                    <form className="card-body" onSubmit={handleSubmit}>
    
                        <div className="flex flex-col gap-2 py-2">
                            <input 
                                type="text" 
                                required
                                placeholder="Full Name" 
                                className="input input-bordered w-full text-neutral focus:border-secondary"
                                onChange={(e) => setFullName(e.target.value)} value={fullName}
                            />
                            <input 
                                type="email" 
                                required
                                placeholder="MyLaurier Email" 
                                className="input input-bordered w-full text-neutral focus:border-secondary" 
                                onChange={(e)=>setEmail(e.target.value) } value = {email}
                            />
                            <input 
                                type="tel" 
                                required
                                placeholder="Phone Number" 
                                className="input input-bordered w-full text-neutral focus:border-secondary" 
                                onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber}
                            />
                            <input 
                                type="string" 
                                required
                                placeholder="Student ID" 
                                className="input input-bordered w-full text-neutral focus:border-secondary"
                                onChange={(e)=>setStudentId(e.target.value.toString()) } value = {studentId} 
                            />
                            <select
                                required
                                className="select select-bordered w-full text-neutral focus:border-secondary"
                                onChange={(e) => setCategory(e.target.value)} value={category}>
                                <option value="Contact">Contact</option>    
                                <option value="Service">Support</option>
                                <option value="Request">General</option>
                            </select>
                            <textarea
                                required
                                placeholder="Message"
                                className="textarea textarea-bordered w-full text-neutral focus:border-secondary"
                                rows={4}
                                onChange={(e) => setSummary(e.target.value)} value={summary}>
                            </textarea>
                        </div>
                        <div className="card-actions justify-end">
                            <button type="submit" className="btn text-primary bg-secondary hover:text-base-100 border-0 shadow hover:scale-105 duration-200">Submit ➜</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    </div>
    );
}

export default CtaForm;

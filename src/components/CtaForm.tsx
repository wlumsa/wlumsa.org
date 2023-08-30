import { useState } from "react";
import axios from "axios";
const CtaForm: React.FC = () => {
    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [email,setEmail] = useState('');
    const [studentId,setStudentId] = useState('')
    const handleSubmit=(e:any)=>{
        e.preventDefault();
        const data = {
            FirstName:firstName,
            LastName:lastName,
            Email:email,
            StudentId:studentId
        }
        axios.post('https://sheet.best/api/sheets/5502fc5d-8381-4c20-b0f3-73ec81f8e376',data).then((response)=>{
        console.log(response);
        setFirstName('');
        setLastName('');
        setEmail('');
        setStudentId('');
    })}
    return (
        <div className="flex items-center justify-center w-full py-2 bg-base-100">
            <div className="max-w-xl px-2">
                <form className="card-body" onSubmit={handleSubmit}>
                    <h3 className="card-title text-3xl lg:text-4xl text-primary">Become a member!</h3>
                    <p className="lg:text-lg text-neutral">You'll receive all the latest news and information.</p>
                    <div className="flex flex-col gap-2 py-2">
                        <input 
                            type="text" 
                            placeholder="First Name" 
                            className="input input-bordered w-full text-neutral focus:border-secondary"
                            onChange={(e)=>setFirstName(e.target.value) } value = {firstName} />   
                        <input 
                            type="text" 
                            placeholder="Last Name" 
                            className="input input-bordered w-full text-neutral focus:border-secondary" 
                            onChange={(e)=>setLastName(e.target.value) } value = {lastName}
                            />
                        <input 
                            type="email" 
                            placeholder="MyLaurier Email" 
                            className="input input-bordered w-full text-neutral focus:border-secondary" 
                            onChange={(e)=>setEmail(e.target.value) } value = {email}
                            />
                        <input 
                            type="number" 
                            placeholder="Student ID" 
                            className="input input-bordered w-full text-neutral focus:border-secondary"
                            onChange={(e)=>setStudentId(e.target.value.toString()) } value = {studentId} />
                    </div>
                    <div className="card-actions justify-end">
                        <button type="submit" className="btn text-secondary bg-primary hover:bg-secondary hover:text-primary border-0 shadow duration-200">Submit ➜</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CtaForm;
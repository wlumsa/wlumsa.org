import { useState } from "react";
import axios from "axios";
import { collection, addDoc } from "firebase/firestore"; 
import db from "../firebase"


const CtaForm: React.FC = () => {
    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [email,setEmail] = useState('');
    const [studentId,setStudentId] = useState('')
    const handleSubmit= async(e:any)=>{
        e.preventDefault();
        const data = {
            FirstName:firstName,
            LastName:lastName,
            Email:email,
            StudentId:studentId
        }
        try {
            const docRef = await addDoc(collection(db, "users"), {data}).then((response)=>{
                console.log(response);
                setFirstName('');
                setLastName('');
                setEmail('');
                setStudentId('');
            });
            console.log("Document written", docRef);
          } catch (e) {
            console.error("Error adding document: ", e);
          }    
    }
    return (
        <div className="flex items-center justify-center w-full py-2 bg-base-100">
            <div className="max-w-xl px-2">
                <form className="card-body" onSubmit={handleSubmit}>
                    <h3 className="card-title text-3xl lg:text-4xl text-primary">Become a member!</h3>
                    <p className="lg:text-lg text-neutral">You'll receive all the latest news and information.</p>
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
                            type="number" 
                            required
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
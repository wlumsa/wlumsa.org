"use client"
import React, { useState } from "react";
import {  z } from 'zod'
import toast from "react-hot-toast";
import Link from "next/link";
import { userOnboarding } from "@/Utils/actions";
/**
 * CtaForm component represents a form used for submitting a call-to-action.
 * @param {CtaFormProps} props - The component props.
 * @param {string} props.category - The category of the call-to-action.
 * @returns {JSX.Element} The rendered CtaForm component.
 */
export  const OnboardingForm = () => {
 const [submitted, setSubmitted] = useState(false);
const [formData, setFormData] = useState({
    isStudent: "",
    firstName: "",
    lastName: "",
    studentId: "",
    laurier_email: "",
    newsletter: false,
    program: "",
    year: "",
    category: "",
  });

//validation
const categoryOptions = [ "Landlord", "Parent" , "Business", "Alumni"] as const
const yearOptions = ["1", "2", "3", "4", "5+"] as const

const StudentSchema = z.object({
    isStudent: z.string()  ,
    firstName: z.string().min(1, { message: "First name is required" })  ,
    lastName: z.string().min(1, { message: "Last name is required" }) ,
    studentId: z.string().min(1, { message: "Student ID is required" }) ,
    newsletter: z.boolean() ,
    program: z.string(),
    year: z.string(),
    });
const NonStudentSchema = z.object({
    isStudent: z.string() ,
    firstName: z.string().min(1, { message: "First name is required" }) ,
    lastName: z.string().min(1, { message: "Last name is required" })  ,
    category: z.string() ,
    });


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
            if(e.target.name === "isStudent") {
                setFormData({
                    isStudent: e.target.value,
                    firstName: "",
                    lastName: "",
                    studentId: "",
                    laurier_email: "",
                    newsletter: false,
                    program: "",
                    year: "",
                    category: "" ,
                })
            } else if(e.target.name === "newsletter") {
                setFormData({
                    ...formData,
                    [e.target.name]: !e.target.value
                })
            }
            else{
                setFormData({
                    ...formData,
                    [e.target.name]: e.target.value
                })
            }
       
    
        }


  /**
   * Handles the form submission.
   * @param {React.FormEvent<HTMLFormElement>} e - The form event.
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

   

    try {
        if(formData.isStudent === "Yes") {
            const validatedFields = StudentSchema.safeParse(formData);
            if (validatedFields.error) {
                toast.error(` ${Object.values(validatedFields.error.flatten().fieldErrors).join(", ")}`);
                return;
                }
            
        } else {
            const validatedFields = NonStudentSchema.safeParse(formData);
            if (validatedFields.error) {
                toast.error(` ${Object.values(validatedFields.error.flatten().fieldErrors).join(", ")}`);
                return;
                }
        }
    //  const response = await axios.post("/api/contact", formData);
    const response = await userOnboarding(formData);
    if (response.errors) {
      toast.success("An error occurred.");

      return;
    } else {
      toast.success("Form submitted successfully!");
    }

    


    console.log(`Form submitted: ${JSON.stringify(formData)}`);
     setFormData({
        isStudent: "",
        firstName: "",
        lastName: "",
        studentId: "",
        laurier_email: "",
        newsletter: false,
        program: "",
        year: "",
        category: "",
      });
      setSubmitted(true);
    
    } catch (error) {
      console.error("Error sending form: ", error);
    }
  };

  return (
    <div>
      <div className="flex items-center">
        <div className="w-full   px-2 md:w-[30rem]">
         {!submitted  && (<form className="card-body" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2 py-2">
                <label className="label ">Are you a student?</label>
                <select
                  name="isStudent"
                  className="select select-bordered w-full"
                  onChange={handleInputChange}
                  value={formData.isStudent}
                  
                >
                  <option disabled value="">
                    Select an option
                  </option>
                  {["Yes", "No"].map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
            {formData.isStudent === "Yes" && (
            <div>

             <div className="flex flex-row gap-2">
                <div className="flex flex-col  py-2">
                    <label className="label ">First Name: </label>
                    <input
                        type="text"
                        required
                         name="firstName"
                        placeholder="First Name"
                        className="input input-bordered w-full text-neutral focus:border-secondary"
                        onChange={handleInputChange}
                        value={formData.firstName}
                    />
              </div>
            <div className="flex flex-col  py-2"> 
            <label className="label ">Last Name: </label>  
                <input
                    type="text"
                    name="lastName"
                    required
                    placeholder="Last Name"
                    className="input input-bordered w-full text-neutral focus:border-secondary"
                    onChange={handleInputChange}
                    value={formData.lastName}
                />
            </div> 
             </div> 
             <div className="flex flex-col py-2">
                <label className=""> Laurier email: </label>   
                <input
                    type="email"
                    name="laurier_email"
                    required
                    placeholder=" msa@mylaurier.ca "
                    className="input input-bordered w-full text-neutral focus:border-secondary"
                    onChange={handleInputChange}                    
                    value={formData.laurier_email} 
                /> 
            </div>
            <div className="flex flex-col py-2">

             <label className="py-2">Student ID: </label>   
              <input
                type="string"
                name="studentId"
                required
                placeholder="Student ID"
                className="input input-bordered w-full text-neutral focus:border-secondary"
                onChange={handleInputChange}
                value={formData.studentId}
              />
            </div>
            <div className="flex flex-col py-2">
                <label className="py-2">What program are you in?</label>   
               <input
                type="string"
                name="program"
                required
                placeholder="Computer Science"
                className="input input-bordered w-full text-neutral focus:border-secondary"
                onChange={handleInputChange}                
                value={formData.program}
              />
            </div>
            <div className="flex flex-col py-2">
                <label className="py-4">Year</label>
                <select name="year" className="select select-bordered w-full " onChange={handleInputChange} value={formData.year} >
                <option disabled value=""  >Year</option>
                {yearOptions.map((year, index) => (
                            <option key={index}  value={year} >{year}</option>
                   ))}
                </select>
            </div>

    
              <label className="label ">
              <span className="label-text">Newsletter Signup</span>
              <input

                type="checkbox"
                name="newsletter"
                value={formData.newsletter.toString()}
                onChange={handleInputChange}
                className="toggle"
                defaultChecked={false}
              />
            </label> 

            </div>
            ) 
            }  { formData.isStudent === "No"  && (
                <div>
                    <div className="flex flex-row gap-2">
                       <div className="flex flex-col gap-2 ">
                            <label className="label ">First Name: </label>
                            <input
                                type="text"
                                required
                                name="firstName"
                                placeholder="First Name"
                                className="input input-bordered w-full text-neutral focus:border-secondary"
                                onChange={handleInputChange}
                                value={formData.firstName}
                            />
                    </div>
                    <div className="flex flex-col py-2 ">

                            <label className="label">Last Name: </label>
                            <input
                                type="text"
                                name="lastName"
                                required
                                placeholder="Last Name"
                                className="input input-bordered w-full text-neutral focus:border-secondary"
                                onChange={handleInputChange}   
                                value={formData.lastName}
                            />
                    </div>

                       
                    </div> 

                     <div className="flex flex-col py-2">
                <label className="py-4">Select the option that best describes you</label>
                <select name="category" className="select select-bordered w-full " onChange={handleInputChange} value={formData.category} >
                <option disabled value=""  >Select an option</option>
                {categoryOptions.map((option, index) => (
                            <option key={index}  value={option.toLowerCase()} >{option}</option>
                   ))}
                </select>
            </div>


                </div>

            )
            }
              </div>
            <div className="card-actions justify-end">
              <button
                type="submit"
                className="btn border-0 bg-secondary text-primary shadow duration-200 hover:scale-105 hover:text-base-100"
              >
                Submit ➜
              </button>
            </div>
          </form>)} {
            submitted && (
                <div>
                 <div className="flex flex-col gap-2 mt-8 text-center">
                  <Link href="/roommate-service">
                      <button className="btn btn-primary text-white">View Roommate Listings</button>
                  </Link> 
                  <Link href="/create-post">
                     <button className="btn btn-primary text-white">Create Roommate Listing</button>

                  </Link> 
                </div>
                </div>
            )
          }
        </div>
      </div>
    </div>
  );
};


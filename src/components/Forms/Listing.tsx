import React from 'react'
import {date, z} from 'zod'
import { useState } from 'react'
import toast from 'react-hot-toast'
import {X} from 'lucide-react'
const genderOptions = ["Sister", "Brother"] as const
const propertyTypeOptions = ["House", "Apartment", "Condo", "Townhouse"] as const
const depositOptions = ["Yes", "No"] as const
const furnishingOptions = ["Furnished", "Unfurnished", "Partially furnished"] as const
const contactOptions = ["Email", "Phone", "Instagram", "Facebook", "Discord"]
////for form validation
type Gender = typeof genderOptions[number]
type PropertyType = typeof propertyTypeOptions[number]
type Deposit = typeof depositOptions[number]
type furnishingOptions = typeof furnishingOptions[number]
type contactOptions = typeof contactOptions[number]
const listingSchema = z.object({
    title: z.string().min(1, "Title is required").max(120, "Title is too long"),
    address: z.string().min(1, "Address is required"),
    propertyType: z.enum(propertyTypeOptions, { errorMap: () => ({ message: "Please select a property type" }) }),
    furnishingOptions: z.enum(furnishingOptions, { errorMap: () => ({ message: "Please select a furnishing option" }) }),
    deposit: z.enum(depositOptions, { errorMap: () => ({ message: "Please select a deposit option" }) }),
    monthlyRent: z.string().min(1, "Monthly rent is required"),
    gender: z.enum(genderOptions, { errorMap: () => ({ message: "Please select a gender" }) }),
    dateAvailable: z.string().min(1, "Date available is required"),
    description: z.string().min(1, "Description is required"),
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email"),
    phone: z.string().min(10, "Phone number is required"),
})
const Listing = () => { 
    const [currentStep, setCurrentStep] = useState(0)  

    // const [formData, setFormData] = useState({
    //     title: "",
    //     address: "",
    //     description: "",
    //     gender: "",
    //     dateAvailable: "",
    //     propertyType: "",
    //     furnishingOptions: "",
    //     deposit: "",
    //     monthlyRent: "",
    //     firstName: "",
    //     lastName: "",
    //     email: "",
    //     phone: "",
    //     facebook: "",
    //     instagram: "",
    //     discord: "",
    //     whatsapp: "",

    // })
    const handleNextStep = () => {
        setCurrentStep(currentStep + 1)
    }
    const handlePreviousStep = () => { 
        if(currentStep > 0) {
            setCurrentStep(currentStep - 1)
        }
    }
    const handleSubmit = () => { 
        //close the modal
        //e.preventDefault()
        const modal = document.getElementById('my_modal_1') as HTMLDialogElement;
        if (modal) {
            modal.close();
        }
        //send the data to the backend
        //validate the form
        toast.success('Successfully submitted!')

    }
  return (
    <div className=' flex flex-col items-center justify-center w-full px-8 '>
        <div className='flex justify-end w-full'>
            <button className='btn btn-ghost' onClick={() => {
                const modal = document.getElementById('my_modal_1') as HTMLDialogElement;
                if (modal) {
                    modal.close();
                }
            }}>
                <X size={24} />
            </button>
        </div>
        <h1 className='font-bold text-primary text-xl text-center'>New Listing</h1>
        <form className='flex flex-col'>
            {/* Step 1 - Listing Information */}
           {currentStep == 0 && <div>
            <div className='text-primary font-bold'>Listing info</div>
                <div className='flex flex-col md:flex-row gap-4 py-2'>
                <div className='flex flex-col py-2 md:w-1/2'>
                    <label htmlFor="listingTitle" className='font-semibold' >Listing Title</label>
                    <input id="listingTitle" type="text" placeholder="ex: 2 Rooms at Lazardis Hall " className="input input-bordered h-[2rem]   bg-[#F2F2F2] border-none" />
                </div>
                <div className='flex flex-col py-2 md:w-1/2'>
                    <label htmlFor="name" className='font-semibold'>Address</label>
                    <input type="text" placeholder="ex: 75 University Ave. " className="input input-bordered  h-[2rem] max-w-xs bg-[#F2F2F2] border-none" />
                </div>
                </div>
                <div className='flex flex-col md:flex-row gap-4 py-2'>
                <div className='flex flex-col md:w-1/2 '>
                    <label htmlFor="name" className='font-semibold'>Property Type</label>
                    <select className="select select-bordered w-full max-w-xs min-h-[2rem] h-[2rem] bg-[#F2F2F2]  border-none ">
                        <option value="" disabled selected>Select a Property Type</option>
                        {propertyTypeOptions.map((option) => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                </div>
                <div className='md:w-1/2'>
                    <label htmlFor="gender" className='font-semibold' >Furnishing</label>
                    <select className="select select-bordered w-full max-w-xs min-h-[2rem] h-[2rem] bg-[#F2F2F2] border-none " >
                        <option value="" disabled selected> Select an option</option>
                        {furnishingOptions.map((option) => (
                            <option key={option} value={option}>{option}</option>
                        ))} 

                    </select>
                </div>
                </div>
                <div className='flex flex-col md:flex-row gap-4 py-2'>

                
                    <div className=' flex flex-col md:w-1/2'>
                        <label htmlFor="gender" className='font-semibold' >Gender</label>
                        <select className="select select-bordered min-h-[2rem] h-[2rem] bg-[#F2F2F2]  border-none max-w-xs" >
                            <option value="" disabled selected > Select a Gender</option>
                            {genderOptions.map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))} 

                        </select>
                    </div>
                    <div className='md:w-1/2'>
                        <label htmlFor="dateAvailable" className='font-semibold'>Date Available</label>
                        <input type="date" className="input input-bordered w-full max-w-xs h-[2rem]  bg-[#F2F2F2] border-none" />
                    </div> 
                </div>  
                <div className='flex flex-col md:flex-row gap-4'>

                
                    <div className='flex flex-col py-2 md:'>
                        <label htmlFor="name" className='font-semibold'>Deposit</label>
                        <input type="text" placeholder="$1000.00" className="input input-bordered w-full max-w-xs h-[2rem]  bg-[#F2F2F2]  border-none" />
                    </div>
                    <div className='flex flex-col py-2 md:w-1/2'>
                        <label htmlFor="name" className='font-semibold'>Monthly Rent price</label>
                        <input type="text" placeholder="$1000.00" className="input input-bordered w-full max-w-xs h-[2rem]  bg-[#F2F2F2]  border-none" />
                    </div>

                </div>
                <div className='py-2'>
                    <label htmlFor="name" className='font-semibold' >Listing Description</label>
                    <textarea placeholder="Write a detailed, informative description" className="textarea textarea-bordered h-[2rem] w-full bg-[#F2F2F2]  border-none" />
                </div>
                <div className='py-2 flex flex-col'>
                    <label className='font-semibold'>Upload Supporting Images</label>
                    <input type="file" className="file-input file-input-md file-input-primary w-full h-[2rem] bg-[#F2F2F2] border-none" accept="image/png, image/jpeg" />

                </div>
                <div className=' flex py-2 justify-end'>
                    <button className='btn btn-secondary ' onClick={handleNextStep}>Next →</button>
                </div>
            </div>
            }
            {/* Step 2 - Contact Information */}
            {currentStep == 1 && <div className='flex flex-col gap-4'>
                <h1 className='font-bold font-primary text-primary' >Contact Info</h1>
                <div className='flex flex-col md:flex-row gap-4'>
                <div className='flex flex-col md:w-1/2'>
                        <label htmlFor="name" className='font-semibold'>First Name</label>
                        <input type="text" placeholder="First name" className="input input-bordered  max-w-xs  h-[2rem] w-full bg-[#F2F2F2] border-none " />
                    </div>
                    <div className='flex flex-col md:w-1/2'>
                        <label htmlFor="name" className='font-semibold'>Last Name</label>
                        <input type="text" placeholder="Last name" className="input input-bordered  max-w-xs  h-[2rem] w-full bg-[#F2F2F2] border-none" />
                    </div>
                </div>
                <div className='flex flex-col md:flex-row gap-4'>
                <div className='flex flex-col md:w-1/2'>
                        <label htmlFor="email" className='font-semibold'>Email</label>
                        <input type="text" placeholder="example@mylaurier.ca" className="input input-bordered max-w-xs  h-[2rem] w-full bg-[#F2F2F2] border-none" />
                    </div>
                    <div className='flex flex-col md:w-1/2'>
                        <label htmlFor="name" className='font-semibold'>Phone number</label>
                        <input type="tel" placeholder="519-123-3456" className="input input-bordered  max-w-xs  h-[2rem] w-full bg-[#F2F2F2] border-none" />
                    </div>
                </div>

               <h1 className='font-semibold text-primary'>Social Media links (optional)</h1>
               <div className='flex flex-col md:flex-row gap-4'>
                <div>
                <label className="input input-bordered flex items-center gap-2 h-[2rem] w-fit bg-[#F2F2F2] border-none">
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                  <input type="text" className=" h-[2rem] w-fit bg-[#F2F2F2]" placeholder='Facebook link'/>
                </label>
                </div>
<div>
                <label className="input input-bordered flex items-center gap-2 h-[2rem] border-none w-fit bg-[#F2F2F2]">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>                  <input type="text" className=" h-[2rem] w-fit bg-[#F2F2F2]" placeholder='Instagram link'/>
                </label>
                </div>
                </div>
            <div className='flex flex-col md:flex-row gap-4'>
                <div>
                <label className="input input-bordered border-none flex items-center gap-2 h-[2rem] w-fit bg-[#F2F2F2]">
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 127.14 96.36"  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-facebook"><path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"></path></svg>
                  <input type="text" className=" h-[2rem] w-fit bg-[#F2F2F2]" placeholder='Discord link'/>
                </label>
                </div>
                <div>
                <label className="input input-bordered flex items-center gap-2 h-[2rem] w-fit bg-[#F2F2F2] border-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                  <input type="text" className=" h-[2rem] w-fit bg-[#F2F2F2]" placeholder='Whatsapp number'/>
                </label>
                </div>
                </div>

                <div className=' flex py-2 justify-between'>
                    <button className='btn  ' onClick={handlePreviousStep}>← Back</button>
                    <button className='btn btn-secondary ' onClick={handleSubmit}>Submit →</button>
                </div>

            </div>}
           
        </form>

    </div>
  )
}

export default Listing
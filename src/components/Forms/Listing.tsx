import React from 'react'
import { date, z } from 'zod'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { createPost } from '@/Utils/actions'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation';
import { RoommatePost } from '@/payload-types'


const genderOptions = ["Female", "Male"] as const
const propertyTypeOptions = ["House", "Apartment", "Condo", "Townhouse"] as const
const furnishingOptions = ["Furnished", "Unfurnished", "Partially furnished"] as const
const utilitiesOptions = ["Wifi", "Electricity, water, gas", "Laundry (in unit)", "Laundry (on site)", "Heating", "Air conditioning"] as const
const amenitiesOptions = ["Parking available", "Recreational spaces (gym, pool, lounge)", "Pets allowed", "Private kitchen", "Private bathroom"] as const

//Form validation
const StepOneSchema = z.object({
    title: z.string().min(1, "Title is required").max(120, "Title is too long"),
    address: z.string().min(1, "Address is required"),
    description: z.string().min(1, "Description is required"),
    gender: z.string().min(1, "Gender is required"),
    propertyType: z.string().min(1, "Property type is required"),
    furnishingType: z.string().min(1, "Furnishing type is required"),
    rent: z.string().min(1, "Monthly rent is required"),
    availableDate: z.string().min(1, "Date available is required"),

})

const UploadedFileSchema = z.array(z.object({
    file: z.instanceof(File, { message: "Must be a valid file" }),
    preview: z.string().url("Preview must be a valid URL"),
}),
).min(1, "At least one image is required");


interface UploadedFile {
    file: File;
    preview: string;
}

const Listing = () => {
    const router = useRouter();


    const [files, setFiles] = useState<UploadedFile[]>([]);
    const [formData, setFormData] = useState<RoommatePost>({
        id: 0, // Default value, can be updated later
        userId: 0, // Set this to the appropriate user ID when available
        title: '',
        address: '',
        description: '',
        rent: 0,
        deposit: 0,
        gender: '1', // Assuming '1' or '2' are the only valid values
        propertyType: '1', // Assuming '1', '2', '3', or '4' are valid values
        furnishingType: '1', // Assuming '1', '2', or '3' are valid values
        utilities: [], // Initialize as an empty array
        amenities: [], // Initialize as an empty array
        images: [] as string[],
        availableDate: '',
        contactEmail: false,
        facebook: '',
        phoneNumber: '', // Changed to match the schema
        instagram: '',
        whatsapp: '',
        createdAt: new Date().toISOString(), // Set current date/time
        updatedAt: new Date().toISOString(), // Set current date/time
    });
    const [currentStep, setCurrentStep] = useState(0)
    const removeImage = (index: number) => {
        setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));

    }
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files); // Convert FileList to an array
            const oversizedFiles = selectedFiles.some(file => file.size / (1024 * 1024) > 100);
            const newFiles = selectedFiles.map(file => ({
                file: file,
                preview: URL.createObjectURL(file),
            }));
            if (oversizedFiles) {
                alert(`One or more files exceed 200MB. Please select smaller files.`);
                return;
            }
            setFiles(prevFiles => [...prevFiles, ...newFiles]);

        }
    };
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // const handleCheckBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     if(e.target.name === "amenitiesOptions") {
    //         setFormData({
    //             ...formData,
    //             selectedAmenities: [...e.target.value]
    //         })

    // } else if (e.target.name === "utilitiesOptions") {
    //     setFormData({
    //         ...formData,
    //         selectedUtilities: [...e.target.value]
    //     })

    // }

    //   }
    const handleCheckBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, checked } = e.target;

        setFormData((prevData) => {
            if (name === "amenitiesOptions") {
                return {
                    ...prevData,
                    selectedAmenities: checked
                        ? [...(prevData.amenities || []), value]
                        : (prevData.amenities || []).filter((item) => item !== value)
                };
            } else if (name === "utilitiesOptions") {
                return {
                    ...prevData,
                    selectedUtilities: checked
                        ? [...(prevData.utilities || []), value]
                        : (prevData.utilities || []).filter((item) => item !== value)
                };
            }
            return prevData;
        });
    };


    const handleNextStep = (e: React.FormEvent) => {
        e.preventDefault();
        if (currentStep === 0) {
            const validatedFields = StepOneSchema.safeParse(formData);
            const validatedFiles = UploadedFileSchema.safeParse(files);
            if (!validatedFields.success && !validatedFiles.success) {
                toast.error(` ${Object.values(validatedFields.error.flatten().fieldErrors).join(", ")}, Upload at least one image`);
                return;
            }
            if (validatedFields.error) {
                toast.error(` ${Object.values(validatedFields.error.flatten().fieldErrors).join(", ")}`);
                return;
            }
            if (validatedFiles.error) {
                toast.error(`Upload at least one image`);
                return;
            }

        }
        setCurrentStep(currentStep + 1)


    }
    const handlePreviousStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1)
        }
    }

    const handleSubmit = async () => {
        console.log(formData);
        // Validate
        //  const validatedFields = StepThreeSchema.safeParse(formData);
        // if (!validatedFields.success) {
        //     toast.error(`${Object.values(validatedFields.error.flatten().fieldErrors).join(", ")}`);
        //     return;
        // }

        // upload image to database , retreive image url
        const uploadImage = async (image: File, folderName: string) => {
            const filePath = `${folderName}/${Date.now()}_${image.name}`;
            const { data, error } = await supabase.storage
                .from(process.env.S3_BUCKET || "wlumsa_storage_bucket_test")
                .upload(`${filePath}`, image);

            if (error) {
                console.error("Error uploading image to Supabase storage:", error);
                return null;
            }
            const imageData = supabase.storage
                .from(process.env.S3_BUCKET || "wlumsa_storage_bucket_test")
                .getPublicUrl(`${filePath}`);

            console.log(imageData);
            return imageData.data.publicUrl;
        };

        try {
            // Upload all images and gather URLs
            const imageUrls = await Promise.all(
                files.map(file => uploadImage(file.file, "RoommateService"))
            );

            const validImageUrls = imageUrls.filter(url => url !== null);

            setFormData(prevData => ({
                ...prevData,
                images: [...prevData.images, ...validImageUrls],
            }));

            const res = await createPost({
                ...formData,
                images: [...formData.images, ...validImageUrls],
            });

            if (res.res) {
                toast.success("Post created successfully!");
                router.push('/roommateservice');


            } else {
                console.error("Error creating post:", res.message);
                toast.error("Failed to create post.");
            }
        } catch (error) {
            console.error("Error during submission:", error);
            toast.error("Failed to create post..");
        }
    };

    return (
        <div className=' flex flex-col items-center justify-center w-full px-8 md:w-[550px] mx-auto '>

            <h1 className='font-bold text-primary text-xl text-center'>New Listing</h1>
            <form className='flex flex-col'>
                {/* Step 1 - Listing Information */}
                {currentStep == 0 && <div>
                    <div className='text-primary font-bold'>Listing info</div>
                    <div className='flex flex-col md:flex-row gap-4 py-2'>
                        <div className='flex flex-col py-2 md:w-1/2'>
                            <label htmlFor="listingTitle" className='font-semibold' >Listing Title</label>
                            <input id="title" name="title" value={formData.title} onChange={handleInputChange} type="text" placeholder="ex: 2 Rooms at Lazardis Hall " className="input input-bordered h-[2rem]   bg-[#F2F2F2] border-none" aria-describedby="title-error" />
                        </div>
                        <div className='flex flex-col py-2 md:w-1/2'>
                            <label className='font-semibold'>Address</label>
                            <input type="text" name="address" value={formData.address} onChange={handleInputChange} placeholder="ex: 75 University Ave." className="input input-bordered h-[2rem] max-w-xs bg-[#F2F2F2] border-none" />
                        </div>
                    </div>
                    <div className='flex flex-col md:flex-row gap-4 py-2'>
                        <div className='flex flex-col md:w-1/2 '>
                            <label htmlFor="propertyType" className='font-semibold'>Property Type</label>
                            <select name="propertyType" value={formData.propertyType} onChange={handleInputChange} className="select select-bordered w-full max-w-xs min-h-[2rem] h-[2rem] bg-[#F2F2F2]  border-none ">
                                <option value="" disabled>Select a Property Type</option>
                                {propertyTypeOptions.map((option, index) => (
                                    <option key={index + 1} value={index + 1}>{option}</option>
                                ))}
                            </select>
                        </div>
                        <div className='md:w-1/2'>
                            <label className='font-semibold' >Furnishing</label>
                            <select name="furnishingType" value={formData.furnishingType} onChange={handleInputChange} className="select select-bordered w-full max-w-xs min-h-[2rem] h-[2rem] bg-[#F2F2F2] border-none " >
                                <option value="" disabled > Select an option</option>
                                {furnishingOptions.map((option, index) => (
                                    <option key={index + 1} value={index + 1}>{option}</option>
                                ))}

                            </select>
                        </div>
                    </div>
                    <div className='flex flex-col md:flex-row gap-4 py-2'>


                        <div className=' flex flex-col md:w-1/2'>
                            <label className='font-semibold' >Gender</label>
                            <select name="gender" value={formData.gender} onChange={handleInputChange} className="select select-bordered min-h-[2rem] h-[2rem] bg-[#F2F2F2]  border-none max-w-xs" >
                                <option value="" disabled  > Select a Gender</option>
                                {genderOptions.map((option, index) => (
                                    <option key={index + 1} value={index + 1}>{option}</option>
                                ))}

                            </select>
                        </div>
                        <div className='md:w-1/2'>
                            <label className='font-semibold'>Date Available</label>
                            <input name="availableDate" value={formData.availableDate} onChange={handleInputChange} type="date" className="input input-bordered w-full max-w-xs h-[2rem]  bg-[#F2F2F2] border-none" />
                        </div>
                    </div>
                    <div className='flex flex-col md:flex-row gap-4'>


                        <div className='flex flex-col py-2 md:w-1/2'>
                            <label className='font-semibold'>Deposit</label>
                            <div className='flex flex-row items-center'>
                                <span className='mr-2'>$</span>
                                <input
                                    type="number"
                                    name="deposit"
                                    value={formData.deposit ?? ''}
                                    onChange={handleInputChange}
                                    placeholder="500"
                                    className="input input-bordered w-full max-w-xs h-[2rem] bg-[#F2F2F2] border-none"
                                />
                            </div>
                        </div>
                        <div className='flex flex-col py-2 md:w-1/2'>
                            <label className='font-semibold'>Monthly Rent price</label>
                            <div className='flex flex-row items-center'>
                                <span className='mr-2'>$</span>
                                <input type="number" name="rent" value={formData.rent} onChange={handleInputChange} placeholder="1000" className="input input-bordered w-full max-w-xs h-[2rem]  bg-[#F2F2F2]  border-none" />
                            </div>
                        </div>

                    </div>

                    <div className='py-2'>
                        <label htmlFor="name" className='font-semibold' >Listing Description</label>
                        <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Write a detailed, informative description" className="textarea textarea-bordered h-[3rem] max-h-[12rem] w-full bg-[#F2F2F2]  border-none" />
                    </div>
                    <div className='py-2 flex flex-col'>
                        <label className='font-semibold'>Upload Supporting Images - png, jpeg, jpg files only</label>
                        <div className="flex items-center gap-2">
                            <div className=''>
                                <input type="file" id="files" className="hidden" multiple onChange={handleImageUpload} accept="image/png, image/jpeg, image/jpg" />
                                <label htmlFor="files" className='btn btn-primary cursor-pointer'>Upload file</label>
                            </div>

                            <span className="text-sm">
                                {files.length > 0 ? `${files.length} file(s) selected` : 'No files chosen'}
                            </span>
                        </div>

                    </div>
                    <div>
                        {files.length > 0 && (
                            <div className=" mt-4">
                                <h1 className=' text-bold font-primary '>Preview Images</h1>
                                <div className='grid grid-cols-3 gap-2'>

                                    {files.map((file, index) => (
                                        <div key={index} className=" my-2 text-left overflow-scroll  ">
                                            <img
                                                height={100}
                                                width={100}
                                                src={URL.createObjectURL(file.file)}
                                                alt={`Preview ${index}`}
                                                className="rounded-md"
                                            />
                                            <button className='underline' onClick={() => removeImage(index)} >Remove Image</button>

                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className=' flex py-2 justify-end'>
                        <button className='btn btn-secondary ' onClick={handleNextStep}>Next →</button>
                    </div>
                </div>
                }
                {currentStep == 1 && <div>
                    <div className='py-2'>
                        <h1>Select available utilities</h1>

                        <div className='grid grid-cols-2 gap-4 py-4'>
                            {utilitiesOptions.map((option, index) => (
                                <div key={index + 1} className="form-control">
                                    <label className="cursor-pointer label">
                                        <span className="label-text">{option}</span>
                                        <input type="checkbox" name="utilitiesOptions" className="checkbox  checkbox-primary " onChange={handleCheckBoxChange} value={index + 1} />
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='py-4 '>
                        <h1>Select other amenities</h1>
                        <div className='grid grid-cols-2 gap-4 py-2'>
                            {amenitiesOptions.map((option, index) => (
                                <div key={index + 1} className="form-control">
                                    <label className="cursor-pointer label">
                                        <span className="label-text">{option}</span>
                                        <input type="checkbox" name="amenitiesOptions" className="checkbox  checkbox-primary " onChange={handleCheckBoxChange} value={index + 1} />
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className=' flex py-2 justify-between'>
                        <button className='btn btn-secondary' onClick={handlePreviousStep}>← Previous</button>
                        <button className='btn btn-primary' onClick={handleNextStep}>Next → </button>
                    </div>
                </div>

                }
                {/* Step 2 - Contact Information */}
                {currentStep == 2 && <div className='flex flex-col gap-4'>
                    <h1 className='font-bold font-primary text-primary' >Contact Info (optional)</h1>
                    {/* <div className='flex flex-col md:flex-row gap-4'>
                        <div className='flex flex-col md:w-1/2'>
                            <label htmlFor="name" className='font-semibold'>First Name</label>
                            <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="First name" className="input input-bordered  max-w-xs  h-[2rem] w-full bg-[#F2F2F2] border-none " />
                        </div>
                        <div className='flex flex-col md:w-1/2'>
                            <label htmlFor="name" className='font-semibold'>Last Name</label>
                            <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Last name" className="input input-bordered  max-w-xs  h-[2rem] w-full bg-[#F2F2F2] border-none" />
                        </div>
                    </div> */}
                    <div className='flex flex-col md:flex-row gap-4'>
                        {/* <div className='flex flex-col md:w-1/2'>
                            <label htmlFor="email" className='font-semibold'>Email</label>
                            <input type="text" name="contactEmail" value={formData.contactEmail} onChange={handleInputChange} placeholder="example@mylaurier.ca" className="input input-bordered max-w-xs  h-[2rem] w-full bg-[#F2F2F2] border-none" />
                        </div> */}
                        {/* <div className='flex flex-col md:w-1/2'>
                            <label htmlFor="name" className='font-semibold'>Phone number</label>
                            <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="519-123-3456" className="input input-bordered  max-w-xs  h-[2rem] w-full bg-[#F2F2F2] border-none" />
                        </div> */}
                    </div>

                    <h1 className='font-semibold text-primary'>Contact Information</h1>
                    <div className='flex flex-col md:flex-row gap-4'>
                        <div>
                            <label className="input input-bordered flex items-center gap-2 h-[2rem] w-fit bg-[#F2F2F2] border-none">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                                <input
                                    type="text"
                                    name="facebook"
                                    value={formData.facebook ?? ''}
                                    onChange={handleInputChange}
                                    className="h-[2rem] w-fit bg-[#F2F2F2]"
                                    placeholder='Facebook link'
                                />
                            </label>
                        </div>
                        <div>
                            <label className="input input-bordered flex items-center gap-2 h-[2rem] border-none w-fit bg-[#F2F2F2]">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram">
                                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                                </svg>
                                <input
                                    type="text"
                                    name="instagram"
                                    value={formData.instagram ?? ''}
                                    onChange={handleInputChange}
                                    className="h-[2rem] w-fit bg-[#F2F2F2]"
                                    placeholder='Instagram link'
                                />
                            </label>
                        </div>

                    </div>
                    <div className='flex flex-col md:flex-row gap-4'>

                        <div>
                            <label className="input input-bordered flex items-center gap-2 h-[2rem] w-fit bg-[#F2F2F2] border-none">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                                </svg>
                                <input
                                    type="text"
                                    name="whatsapp"
                                    value={formData.whatsapp ?? ''}
                                    onChange={handleInputChange}
                                    className="h-[2rem] w-fit bg-[#F2F2F2]"
                                    placeholder='Whatsapp number'
                                />
                            </label>
                        </div>
                        <div className='flex flex-col md:w-1/2'>
                            <input
                                type="tel"
                                name="phoneNumber"
                                value={formData.phoneNumber ?? ''}
                                onChange={handleInputChange}
                                placeholder="Phone number"
                                className="input input-bordered max-w-xs h-[2rem] w-full bg-[#F2F2F2] border-none"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="label ">
                            <span className="label-text">Would you like your email to be displayed? </span>
                            <input
                                type="checkbox"
                                name="contactEmail"
                                onChange={(e) => setFormData({ ...formData, contactEmail: e.target.checked })}
                                className="toggle"
                                defaultChecked={false}
                            />
                        </label>
                    </div>

                    <div className=' flex py-2 justify-between'>
                        <button className='btn  ' onClick={handlePreviousStep}>← Back</button>
                        <button onClick={(e) => { e.preventDefault(); handleSubmit(); }} className='btn btn-secondary '>Submit →</button>
                    </div>

                </div>}

            </form>

        </div>
    )
}

export default Listing
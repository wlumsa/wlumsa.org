"use client";
import React, { useState, useEffect } from "react";
import db from "@/firebase";

import {
   
    collection,
    addDoc,
 
} from "firebase/firestore";

import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";



const UploadPhotoForm: React.FC = () => {
    const [gender, setGender] = useState<string>("");
    const [images, setImages] = useState<File[]>([]); 
    const fileInputRef = React.useRef<HTMLInputElement>(null); 
    const [uploadProgress, setUploadProgress] = useState<number>(0); 
    const [uploadStarted, setUploadStarted] = useState<boolean>(false); 
    async function handleImage(image: File, gender: string) {
        let imageUrl = "";

        const storage = getStorage();
        const storageRef = ref(storage, `photos/${gender}/${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);

        await new Promise((resolve, reject) => {
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setUploadProgress(progress); // Update the progress state
                    console.log("Upload is " + progress + "% done");
                },
                (error) => {
                    console.error("Error uploading image: ", error);
                    reject(error);
                },
                async () => {
                    imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
                    resolve(imageUrl);
                }
            );
        });

        return imageUrl;
    }
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {

        if (event.target.files) {
            const files = Array.from(event.target.files);
            const oversizedFiles = files.some(file => file.size / (1024 * 1024) > 200);
            if (oversizedFiles) {
                alert(`One or more files exceed 200MB. Please select smaller files.`);
            } else {
                setImages(files); // Set the state to the list of files
            }
        }
    };
    const handleGender = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setGender(event.target.value);
    };
    async function handleSubmit() {
        setUploadStarted(true);
        try {
            const imageUrls = [];
            for (const image of images) {
                const imageUrl = await handleImage(image, gender);
                if (!imageUrl) {
                    throw new Error('Image upload failed');
                }
                imageUrls.push(imageUrl);
            }
            for (const imageUrl of imageUrls) {
                await addDoc(collection(db, `${gender}Photos`), {
                    image: imageUrl,
                    goodPhoto: false,
                });
            }
            if(imageUrls.length > 0 ){
                alert('Images have been uploaded successfully!');
            }
            setGender("");
            setImages([]); // Clear the images
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
            
        } catch (error) {
            console.error('Error in handleSubmit: ', error, '\n please contact msa@wlu.ca with an image of this error');
        }
    };

    return (
        <div>
            <div className="flex items-center">
                <div className="w-full rounded-xl px-2  md:w-[30rem] bg-primary text-secondary">
                    <form className="card-body" action={handleSubmit}>
                        <div className="flex flex-col gap-2 ">

                            <p>Please note by accepting, you allow us to use your photo and/or video for marketing content</p>
                            <label className="form-control w-full max-w-xs">
                                <input ref={fileInputRef} type="file" accept="image/*,video/*" onChange={handleImageUpload} multiple /> {/* Add multiple attribute */}
                            </label>
                            <select
                                required
                                className="input input-bordered w-full text-neutral focus:border-secondary"
                                value={gender}
                                onChange={handleGender}
                            >
                                <option disabled value="">
                                    Brother or Sister
                                </option>
                                <option value="Brothers">Brother</option>
                                <option value="Sisters">Sister</option>
                            </select>

                        </div>
                        <div className="card-actions justify-end">
                            <button type="submit" className="btn btn-secondary text-primary ">
                                Submit ➜
                            </button>
                        </div>
                        {uploadStarted && <div>Upload progress: {Math.round(uploadProgress)}% <br/> Please keep this tab open</div>} 
                    </form>
                    
                </div>
            </div>
        </div>
    );
};

export default UploadPhotoForm;




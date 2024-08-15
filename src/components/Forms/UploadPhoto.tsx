"use client";
import React, { useState, useEffect } from "react";

import { createClient } from "@/Utils/client";
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'


export async function uploadFile(file: File) {
    const client = createClient();
      const { data, error } = await client.storage.from('wlumsa_storage_bucket_testbucket_name').upload('photos', file)
    if (error) {
      console.log(error);
    } else {
      console.log(data);
    }
  }

/**
 * UploadPhotoForm component for uploading photos.
 */
const UploadPhotoForm: React.FC = () => {
    const [gender, setGender] = useState<string>("");
    const [images, setImages] = useState<File[]>([]); 
    const fileInputRef = React.useRef<HTMLInputElement>(null); 
    const [uploadProgress, setUploadProgress] = useState<number>(0); 
    const [uploadStarted, setUploadStarted] = useState<boolean>(false); 

    /**
     * Handles the upload of an image file.
     * @param image - The image file to be uploaded.
     * @param gender - The gender associated with the image.
     * @returns The URL of the uploaded image.
     */
    async function handleImage(image: File, gender: string): Promise<string> {
        let imageUrl = "";

        
        const uploadCommand = new PutObjectCommand({
            Bucket: process.env.S3_BUCKET || 'default_bucket',
            Key: `photos/${gender}/${image.name}`,
            Body: image,
            ContentType: 'image/jpeg',
        })
        console.log(uploadCommand)
        imageUrl = uploadCommand.input.Metadata?.url || "";
        return imageUrl;
    }

    /**
     * Handles the upload of image files selected by the user.
     * @param event - The change event triggered by the file input.
     */
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

    /**
     * Handles the selection of the gender.
     * @param event - The change event triggered by the gender select input.
     */
    const handleGender = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setGender(event.target.value);
    };

    /**
     * Handles the form submission.
     */
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
           
            
            setGender("");
            setImages([]); // Clear the images
            
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




"use client"
import React from "react";
import Link from "next/link";
import { ref, getDownloadURL } from "firebase/storage";
import { useEffect, useState } from "react";
import { storage } from "@/firebase";
import { Timestamp } from "firebase/firestore";
import { format } from 'date-fns';


type BlogCard = {
  id: string;
  name: string;
  image: string;
  tagline: string;
  category:string;
  created_on: { seconds: number, nanoseconds: number };
};

const BlogCard  = ({ id, name, image, tagline, category, created_on }: BlogCard) => {
  const timestamp = new Timestamp(created_on.seconds, created_on.nanoseconds);
  const date = timestamp.toDate();
  const formattedDate = format(date, 'MMMM dd, yyyy'); // Example format, adjust as needed

  //const date = created_on.toDate();
  //const formattedDate = format(created_on, 'MMMM dd, yyyy'); // Example format, adjust as needed

  const [imageUrl, setImageUrl] = useState("");
  useEffect(() => {
    const fetchImageUrl = async () => {
      const imageRef = ref(storage, image); // Create a reference to the image file
      try {
        const url = await getDownloadURL(imageRef);
        setImageUrl(url); // Set the URL in the state
      } catch (error) {
        console.error("Error fetching image URL:", error);
        setImageUrl(""); // Set a default or error image URL if needed
      }
    };

    if (image) {
      fetchImageUrl();
    }
  }, [image]); // Re-run the effect if 'image' prop changes
  return (
    <div className=" card cursor-pointer text-start items-center w-72 rounded-lg  bg-base-100 border duration-500 hover:scale-105 hover:shadow-xl ">
    <figure>
      <img src={imageUrl} className="object-cover h-48 w-full"/>
      </figure>
      <div className="card-body w-72 px-6 py-3">
        <div className="flex flex-row  text-slate-500">
        <p>{formattedDate}</p>

          <div className="badge badge-secondary text-primary font-semibold rounded-lg">{category}</div>

        </div>
        <h2 className="card-title  text-primary">{name}</h2>
        <p>{tagline.length >= 50 ? tagline.slice(0, 70) + "..." : tagline }
</p>
        <div className="card-actions justify-end">
          <Link href={`/blog/${id}`}>
            <button className="btn btn-primary text-secondary">Read More →</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;

"use client"
import { ref, getDownloadURL } from "firebase/storage";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { storage } from "@/firebase";

interface Product {
  productId: string;
  name: string;
  description: string;
  image: string;
  tags: string[];
}

const Products = ({ productId, name, description, image, tags }: Product) => {
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
    <div className="card w-72 rounded-xl bg-base-100 shadow-md duration-500 hover:scale-105 hover:shadow-xl">
      <figure>
        <img
          src={imageUrl}
          alt={name}
          className="h-80 w-72 rounded-t-xl object-cover"
        />
      </figure>
      <div className="card-body w-72 px-4 py-3">
        <h2 className="card-title">
          {name}
          {/* Check if tags is truthy, then map, ensuring each tag is a string and not just whitespace */}
          {tags &&
            tags.map((tag, index) => {
              if (tag) {
                const trimmedTag = tag.trim();
                return trimmedTag.length > 0 ? (
                  <div key={index} className="badge badge-secondary">
                    {trimmedTag}
                  </div>
                ) : null;
              }
              return null;
            })}
        </h2>
        <p>{description}</p>
        <div className="card-actions justify-end">
          <Link href={`/products/${productId}`}>
            <button className="btn btn-primary text-base-100">Buy Now</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Products;

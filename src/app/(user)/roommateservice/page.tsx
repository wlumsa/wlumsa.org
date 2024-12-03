"use server";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import RoommateCard from "@/components/UI/RoommateCard";
import Listing from "@/components/Forms/Listing";
import RoommatePostCard from "@/components/UI/RoommatePostCard";
import { fetchRoommatePosts } from "@/Utils/datafetcher";
import ListingPopup from "@/components/UI/ListingPopup";
// Define the structure of a RoommateProfile
interface RoommateProfile {
  id: number;
  name: string;
  age?: number;
  gender?: string;
  bio?: string;
  location?: string;
  interests?: string;
  created_at?: string;
}

  const RoommateServicePage = async () => {

const posts = await fetchRoommatePosts();
console.log(posts);
  return (
    <div className="flex flex-col items-center justify-center gap-6 p-6 mt-16 ">
      <div className="flex flex-col"> 
        <h1  className="text-primary text-3xl font-bold text-center " >Roommate Service</h1>
        <p className="w-fit">Looking to find accommodation in Waterloo? Trying to lease your apartment? Whatever the case is checkout our directory of postings  </p>
      </div>
      <div>
        <ListingPopup />
      </div>
     
 <div className="flex justify-center">
        <div className="max-w-sm md:max-w-4xl gap-2 grid grid-cols-1 md:grid-cols-3">
        {posts.map((post) => (
              <RoommatePostCard key={post.id} post={post}  />
            ))}
        </div>
      </div>
    </div>
    
  );
};

export default RoommateServicePage;

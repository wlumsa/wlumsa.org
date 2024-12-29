"use server";
import React from "react";
import { supabase } from "@/lib/supabaseClient";
import Listing from "@/components/Forms/Listing";
import RoommatePostCard from "@/components/UI/RoommatePostCard";
import { fetchRoommatePosts } from "@/Utils/datafetcher";
import { currentUser } from '@clerk/nextjs/server'
import Link from "next/link";

const RoommateServicePage = async () => {

  

  const posts = await fetchRoommatePosts();
  const user = await currentUser()
  console.log(posts);
  return (
    <div className="flex flex-col items-center justify-center gap-6 p-6 mt-16 ">
      <div className="flex flex-col">
        <h1 className="text-primary text-3xl font-bold text-center " >Roommate Service</h1>
        <p className="w-fit">Looking to find accommodation in Waterloo? Trying to lease your apartment? Whatever the case is checkout our directory of postings  </p>
      </div>
      <div>
        {user && <Link href='/create-post'><button className="btn btn-primary " >New Post</button></Link>}
        {/* <ListingPopup /> */}
      </div>

      <div className="flex justify-center">
        <div className="max-w-sm md:max-w-4xl gap-2 grid grid-cols-1 md:grid-cols-3">
          {posts.map((post) => (
            <RoommatePostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>

  );
};

export default RoommateServicePage;
// import React from 'react'

// const page = () => {
//   return (
//     <div>page</div>
//   )
// }

// export default page
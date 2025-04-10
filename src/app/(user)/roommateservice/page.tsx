"use server";
import React from "react";
import { supabase } from "@/lib/supabaseClient";
import Listing from "@/components/Forms/Listing";
import RoommatePostCard from "@/components/UI/RoommatePostCard";
import { fetchRoommatePosts } from "@/Utils/datafetcher";
import { currentUser } from '@clerk/nextjs/server'
import { useSearchParams } from "next/navigation";
import { RoommatePost } from "@/payload-types";
import Link from "next/link";


import RoommateFilter from "@/components/UI/RoommateFilters";
 type Params = Promise<{post:string}>
 type SearchParams = Promise<{[key:string]: string | undefined}>

const RoommateServicePage = async ( props: {params:Params, searchParams:SearchParams}) => {
 const params = await props.params
  const searchParams = await props.searchParams
  const slug = params.post
  const query = searchParams.query || '';
  const gender = searchParams?.gender
  const rent = searchParams?.rent
  const propertyType = searchParams?.propertyType
  const utilities = searchParams?.utilities


  const posts = await fetchRoommatePosts({ 
    query, 
    gender, 
    rent, 
    propertyType, 
    utilities 
  });
  const user = await currentUser()
  console.log(posts);
  return (
    <div className="flex flex-col items-center justify-center gap-6 p-6 mt-24  ">
      <div className="flex flex-col">
        <h1 className="text-primary text-3xl font-bold text-center " >Roommate Service</h1>
        <p className="w-fit">Looking to find accommodation in Waterloo? Trying to lease your apartment? Whatever the case is checkout our directory of postings  </p>
      </div>
      <div className="flex gap-4 justify-end  md:w-full pr-[12rem] ">
        {user && <Link href='/create-post'><button className="btn btn-primary text-white  " >Create a Post</button></Link>}
        {user && <Link href='/dashboard'><button className="btn btn-primary  text-white" >View my posts</button></Link>}

      </div>
      <RoommateFilter />

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
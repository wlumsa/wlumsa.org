import React from 'react'

const page = () => {
  return (
    <div>page</div>
  )
}

export default page
// "use server";
// import React from "react";
// import { supabase } from "@/lib/supabaseClient";
// import Listing from "@/components/Forms/Listing";
// import RoommatePostCard from "@/components/UI/RoommatePostCard";
// import {findUser, fetchRoommatePostsByUser} from "@/Utils/datafetcher";
// import { currentUser } from '@clerk/nextjs/server'
// import Link from "next/link";
// import type { RoommatePost } from '@/payload-types';
// const RoommateServicePage = async () => {

//     const user = await currentUser()
//     const clerkId = user?.id
//     const clerkUser = await findUser(clerkId || "")

//     if (!clerkUser.docs[0]?.id) {
//         console.log(' Cannot fetch posts.');
//         return;
//     }

// const posts = await fetchRoommatePostsByUser(clerkUser.docs[0]?.id);
//   console.log(posts);
//   return (
//     <div className="flex flex-col items-center justify-center gap-6 p-6 mt-16 ">
//       <div className="flex flex-col">
//         <h1 className="text-primary text-3xl font-bold text-center " >Your  Roommate Service listings</h1>
//         <p className="w-fit text-center">View and modify your listings here. </p>
//       </div>
//       <div>
//         {user && <Link href='/create-post'><button className="btn btn-primary text-white" >Create a post</button></Link>}

//       </div>

//       <div className="flex justify-center">
//         <div className="max-w-sm md:max-w-4xl gap-2 grid grid-cols-1 md:grid-cols-3">
//           {posts.length > 0 && posts.map((post: RoommatePost) => (
//             <RoommatePostCard type={"edit"} key={post.id} post={post} />
//           ))}
//         </div>
//       </div>
//       {posts.length === 0 && <h1 className="text-primary text-3xl font-bold text-center " >No listings found</h1>}
//     </div>

//   );
// };

// export default RoommateServicePage;

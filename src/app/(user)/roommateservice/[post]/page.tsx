import React from "react";
import { fetchRoommatePostById, fetchCommentsByPostId, createComment } from "@/Utils/datafetcher";

import { format } from 'date-fns';
import CommentSection from "@/components/UI/CommentSection";
import { Building } from 'lucide-react';
import { CalendarDays } from 'lucide-react';
import Tag from "@/components/UI/Tag";
import { Banknote, Users, House, Armchair, Phone, Mail } from "lucide-react";
import ImageCarousel from "@/components/UI/ImageCarousel";
import { auth } from "@clerk/nextjs/server";


type Params = Promise<{ post: string }>
type SearchParams = Promise<{ [key: string]: string  | undefined }>

interface Comment
{
  id: number; 
  author: string;
  message: string;
  date: string;
}

const furnishingOptions: { [key: string]: string } = {
  1: "Furnished",
  2: "Unfurnished",
  3: "Partially Furnished"
}
const propertyTypeOptions: { [key: string]: string }  = {
  1: "House",
  2: "Apartment",
  3: "Condo",
  4: "Townhouse"
}

export default async function BlogPost(props: {
  params: Params
}) {
  const params = await props.params
 

  const id = decodeURIComponent(params.post)
  const res = await fetchRoommatePostById(id);

  console.log(res)
  const post = res[0]
 

  const date = post?.createdAt ? new Date(post?.createdAt) : null;
  const formattedDate = date ? format(date, 'MMMM dd, yyyy') : null;
  const formattedAvailableDate = post?.availableDate ? format(new Date(post?.availableDate), 'MMMM dd') : null;


    const comments = await fetchCommentsByPostId(id);
    let commentArray: Comment[] = [];
    commentArray = commentArray.concat(comments.map(comment => ({id: comment.id  ,  message: comment.comment, author: comment.author? comment.author : "" , date: comment.createdAt}))); 
    console.log("comments", comments) 



  return (

    <div className="mt-28">
      <div className="mx-auto md:max-w-screen-lg max-w-96 ">
        <main className="flex flex-col items-center text-gray-700">
          <div className="">
            <ImageCarousel images={post?.images || []} />

            <div className="px-4 lg:px-0 flex md:flex-row flex-col  md:justify-between max-w-[48em]">
              <div className=" flex flex-col">
                <h1 className=" mt-4 text-4xl font-bold text-primary text-center md:text-left">{post?.title} </h1>
                <p className="text-center md:text-left">Posted by {post?.name} on  {formattedDate ? formattedDate : ""}</p>
              </div>
            
              <div className="flex flex-col text-xl my-6 gap-2 text-center ">
                <div className="flex flex-row gap-2">
                  <Building size={24} color="#2e046d" />
                  <p> {post?.address} </p>
                </div>
                <div className="flex flex-row gap-2">
                  <CalendarDays size={24} color="#2e046d" />
                  <p>Available on {formattedAvailableDate}</p>
                </div>

              </div>

            </div>
            <div className="flex flex-row">
              <Tag text={"Sisters"} icon={<Users size={24} color="#2e046d" />} />
              <Tag text={'$'+ post?.rent + '/month'} icon={<Banknote size={24} color="#2e046d" />} />
              <Tag text={'$'+ post?.rent + " deposit"} icon={<Banknote size={24} color="#2e046d" />} />
              <Tag text={propertyTypeOptions[post.propertyType]} icon={<House size={24} color="#2e046d" />} />
              <Tag text={furnishingOptions[post.furnishingType]} icon={<Armchair size={24} color="#2e046d" />} />

            </div>
            <div className=" my-8 max-w-[48em] ">
              <h1 className="text-2xl text-primary font-bold my-2 ">Description</h1>
              <p>{post?.description}</p>
            </div>
            <div className="my-8 flex flex-row justify-between">
              <h1 className="text-2xl text-primary font-bold" >Get in Touch</h1>
              <div className="flex flex-row">
              <Tag text={post?.contactEmail} icon={<Mail size={24} color="#2e046d" />} />
              <Tag text={post?.phoneNumber} icon={<Phone size={24} color="#2e046d" />} />
              <Tag text={post?.whatsapp} icon={<Phone size={24} color="#2e046d" />} />
              <Tag text={post?.facebook} icon={<Phone size={24} color="#2e046d" />} />
              <Tag text={post?.instagram} icon={<Phone size={24} color="#2e046d" />} />

               
              </div>
              </div>

            <div className="my-8">
              <h1 className="text-2xl text-primary font-bold my-2">Comments</h1>
              <CommentSection comments={commentArray} postId={id} />

             
            </div>
          </div>
          <div className="flex flex-col px-8  lg:space-x-12  mb-4 md:mb-0 relative mx-auto  ">

          </div>
        </main>
      </div>
    </div>

  );
}
// import React from 'react'

// const page = () => {
//   return (
//     <div>page</div>
//   )
// }

// export default page
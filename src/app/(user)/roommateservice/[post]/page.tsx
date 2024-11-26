import React from "react";
import { fetchRoommatePostById, fetchCommentsByPostId } from "@/Utils/datafetcher";
import { format } from 'date-fns';
import Comment from "@/components/UI/Comment";
import { Building } from 'lucide-react';
import { CalendarDays } from 'lucide-react';
import Tag from "@/components/UI/Tag";
import { Banknote, Users, House, Armchair, Phone, Mail } from "lucide-react";
import { useState } from "react";
export default async function BlogPost({
  params,
}: {
  params: { post: string };
}) {
  const id = decodeURIComponent(params.post)
  const res = await fetchRoommatePostById(id);

  console.log(res)
  const post = res[0]
  const image = post?.images?.map((item) => {
    if (typeof item === 'object' && item !== null) {
      return item.url;
    } 
    return null;
  });

  const date = post?.createdAt ? new Date(post?.createdAt) : null;
  const formattedDate = date ? format(date, 'MMMM dd, yyyy'): null;
  const formattedAvailableDate =  post?.availableDate ? format(new Date(post?.availableDate), 'MMMM dd' ) : null;
  const imageCount = image?.length || 0;
  //const title = post?.meta?.title;
 // const description = post?.meta?.description || "";
const comments = await fetchCommentsByPostId(id);
console.log(comments)
   

  return (

    <div className="mt-28">
      <div className="mx-auto md:max-w-screen-lg p-4 ">
        <main className="flex flex-col items-center text-gray-700">
          <div className="">
               <img
                src={image? image[0]?.toString() : ""}
                className="object-cover lg:rounded "
                style={{ height: "26em", width: "48em" }}/> 
        <div>
        <div className="flex w-full justify-center gap-2 pt-4">
          {Array.from({length: imageCount }, (_, index) => (
            <button
              className="btn btn-xs border-primary bg-base-100 text-primary duration-200 hover:scale-105 hover:bg-base-200"
              key={index}
            >
              {index + 1}
            </button>
          ))}
        </div>
         </div>   
            <div className="px-4 lg:px-0 flex flex-row justify-between max-w-[48em]">
                <div className=" flex flex-col">
                    <h1 className=" mt-4 text-4xl font-bold text-primary ">{post?.title} </h1>
                    <p className="">Posted by {post?.name} on  {formattedDate ? formattedDate: ""}</p>
                </div>
                <div className="flex flex-col text-xl my-6 gap-2 ">
                    <div className="flex flex-row gap-2">
                        <Building size={24} color="#2e046d"/>
                        <p> {post?.address} </p>
                    </div>
                    <div className="flex flex-row gap-2">
                        <CalendarDays size={24} color="#2e046d"/>
                         <p>Available on {formattedAvailableDate}</p>
                    </div>
                
                </div>
                
            </div>
            <div className="flex flex-row">
            <Tag text={"Sisters"} icon={<Users size={24} color="#2e046d"/> }/>
            <Tag text={post?.rent + '/month'} icon={<Banknote  size={24} color="#2e046d"/> }/>
            <Tag text={3211 +" deposit" } icon={<Banknote  size={24} color="#2e046d"/> }/>
            <Tag text={post?.PropertyType} icon={<House  size={24} color="#2e046d"/> }/>
            <Tag text={post?.roomfurnishing} icon={<Armchair  size={24} color="#2e046d"/> }/>

            </div>
            <div className=" my-8 max-w-[48em] ">
                <h1 className="text-2xl text-primary font-bold my-2 ">Description</h1>
                <p>{post?.description}</p>
              </div>
              <div className="my-8 flex flex-row justify-between">
                <h1 className="text-2xl text-primary font-bold" >Get in Touch</h1>
                <div className="flex flex-row">
                <div className='p-2 m-2 bg-secondary text-primary font-bold rounded-full max-w-fit'>
                    <Mail size={24} color="#2e046d" />
                </div>
                <div className=' p-2 m-2 bg-secondary text-primary font-bold rounded-full max-w-fit'>
                    <Phone size={24} color="#2e046d"/>
                </div>
                </div>
              </div>
              <div className="my-8">
                <h1 className="text-2xl text-primary font-bold my-2">Comments</h1>
                <div className="">
                    <div className="flex flex-row gap-4 w-full"> 
                        <input type="text" placeholder="Write a comment..." className="border-2 border-gray-300 rounded-lg px-4 py-2 bg-gray-100 w-3/4"/>
                        <button className="bg-primary font-bold text-white rounded-lg px-4 py-2">Post</button>
                    </div>
                </div>
                <div className="my-8">
                    {comments.map((comment, index) => (

                        <Comment key={index} author={comment.author} message={comment.comment} date={format(new Date(comment.createdAt), 'MMMM dd' )}/>
                    ))}
                </div>
              </div>
          </div>
          <div className="flex flex-col px-8  lg:space-x-12  mb-4 md:mb-0 relative mx-auto  ">
              
          </div>
        </main>
      </div>
    </div>

  );
}
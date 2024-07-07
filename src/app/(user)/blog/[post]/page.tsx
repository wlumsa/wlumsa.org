
 import React from "react";
//import Markdown from "react-markdown";
import { getPost } from "@/Utils/datafetcher";
import { Markdown } from "@react-email/markdown";
import CommentForm from "@/components/Forms/CommentForm";
import RecommendedPosts from "@/components/UI/RecommendedPosts";
import { useState } from "react";

export default async function BlogPost({
  params,
}: {
  params: { post: string };
}) {
  const id = params.post;
  const { post, imageURL } = await getPost(id);
  if (!post) {
    return <div>Post not found</div>;
  }
  
  const categories = [
    "Professional development", 
    "Religious",
    "Academic Advice",
    "Advice"
]


  return (
    <div className="mt-20 ">
      
      <div className="mx-auto max-w-screen-lg px-4 py-8 lg:px-6 lg:py-16">
     <a href="/blog"> <button className="btn " >← See all posts</button> </a>
        <main className="">
          <div className="relative mx-auto mb-4 w-full md:mb-0 text-center">
            <div className="px-4 lg:px-0  text-center mx-auto">
           
              <h2 className="text-4xl text-center font-semibold leading-tight text-primary">
                 {post.name} 
              </h2>
              <p className="mt-4 text-slate-400 mb-5">June 20 2024 - {post.author}</p>
              <p className="badge text-primary font-bold">Academic Advice</p>
              <hr className="w-48 h-1 mx-auto my-2 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700"></hr>

              <a
                href="#"
                className="mb-2 inline-flex items-center justify-center py-2 text-secondary"> 
                {post.tagline}
              </a>
            </div>

            <img
              src={imageURL}
              className=" object-cover rounded w-90 h-90 "/>
          </div>

          <div className="flex flex-col items-center justify-center lg:flex-row lg:space-x-12">
            <div className="mt-12 w-full px-4 text-lg leading-relaxed text-gray-700 lg:w-3/4 lg:px-0">
              <div key={0} className=" mb-10 m-10 px-4  prose prose-xl  prose-headings:{text-primary} ">

               <Markdown >{post.content}</Markdown>  
              </div>
            </div>
          </div>
         
          <div>
              <hr></hr>
          </div>
           
            <div className=" flex items-center justify-center  ">
              {/* <CommentForm /> */}
            </div>
            <div>
              <RecommendedPosts/>
            </div>
          
        </main>
      </div>
    </div>
  );
} 


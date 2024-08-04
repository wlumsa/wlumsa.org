import React from "react";
//import Markdown from "react-markdown";

import type { Metadata } from 'next'
import { fetchBlogPostById, fetchBlogPostByTitle } from "@/Utils/datafetcher";
import RichText from "@/Utils/RichText";
import { format } from 'date-fns';
/* 
type Post = {
  params: {post: string}
}

export async function generateMetadata({ params }: Post): Promise<Metadata | undefined> {
  const id = decodeURIComponent(params.post);
  const {post} = await fetchBlogPostByTitle(id);  

  if(!post){
    return undefined;
  }
  return {
    title: post.name,
    description: post.tagline,
    openGraph: {
      title: post.name,
      description: post.tagline,
      images: [post.header_image],
      type: "article",
      locale: "en_US",
      publishedTime: post.created_on.toString(),
      authors: post.author,
      siteName: "WLUMSA",
      //image
      //url
    },
  }
} */

export default async function BlogPost({
  params,
}: {
  params: { post: string };
}) {
  // const id = params.post
  const id = decodeURIComponent(params.post)
  const res = await fetchBlogPostById(id);
  

  console.log(res)
  const post = res[0]

  const image = post?.header_image?.map((item) => {
    if (typeof item === 'object' && item !== null) {
      return item.url;
    }
    return null;
  });

  const content= post?.content || [];
  const date = new Date(post?.createdAt || "")
  const formattedDate = format(date, 'MMMM dd, yyyy');


  return (
    <div className="mt-28">
      <div className="mx-auto max-w-screen-lg">
        <main className="mt-10 flex flex-col justify-center items-center text-gray-700">
          <div className="relative mx-auto mb-4 md:mb-0">
            <div className="px-4 lg:px-0">
              <h2 className=" text-left my-6 text-4xl font-bold leading-tight text-primary  ">
                {post?.title} </h2>
              <p className="">
                Published - {formattedDate} </p>
              <p className="">
                Author -  {}
              </p>

  
              <p className="flex mb-2 py-2 text-gray-700">
                {post?.description}
              </p>
            </div>
            <div className="flex justify-center items-center ">
              <img
                src={image?.toString()}
                className="object-cover lg:rounded "
                style={{ height: "26em", width:"48em" }}
              />
            </div>
            
          </div>

          <div className="flex flex-col lg:flex-row lg:space-x-12 items-center justify-center min-h-screen">
              <div className="mt-12 w-full px-4 text-lg leading-loose  lg:w-3/4 lg:px-0 mx-auto">
                 <div key={0} className="  mb-10 items-center">
                     <RichText content={content} />
                  </div>
              </div>
          </div>
        </main>
      </div>
    </div>
  );
}
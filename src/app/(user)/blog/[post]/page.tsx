
 import React from "react";
//import Markdown from "react-markdown";
import { getPost } from "@/Utils/datafetcher";
import { Markdown } from "@react-email/markdown";
import CommentForm from "@/components/Forms/CommentForm";
import RecommendedPosts from "@/components/UI/RecommendedPosts";
import type { Metadata } from 'next'

type Post = {
  params: {post: string}
}

export async function generateMetadata({ params }: Post): Promise<Metadata | undefined> {
  const id = params.post;
  const {post} = await getPost(id);  

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
}


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
  
  return (
    <div className="my-10  ">
      <div className="mx-auto max-w-screen-lg px-4 py-8 lg:px-6 lg:py-16">
     {/* <a href="/blog"> <button className="btn " >← See all posts</button> </a> */}
        <main className="">
          <div className="relative mx-auto mb-4 w-full md:mb-0 m-10">
            <div className="px-4 lg:px-0   mx-auto">
            <p className="badge bg-secondary text-primary justify-start font-semibold">{post.category}</p>
              <h2 className="text-4xl  font-bold leading-tight text-primary py-4">
                 {post.name} 
              </h2>
              <p
                className="mb-2 inline-flex  justify-center py-2 "> 
                {/* {post.tagline} */}
              </p>
              <p className="mt-4  mb-5 ">June 20 2024 - By {post.author}</p>
            </div>
           
           <div className="flex items-center justify-center">
            <img
                src={imageURL}
                className="  rounded w-full h-3/4  "/>
           </div>
           
          </div>

          <div className="flex flex-col  justify-center lg:flex-row lg:space-x-12">
            <div className="mt-12 w-full px-4 text-lg leading-relaxed text-gray-700 lg:px-0">
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


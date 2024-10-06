import React from "react";
import { fetchBlogPostById, fetchBlogPostByTitle, fetchBlogPostsByCategory } from "@/Utils/datafetcher";
import RichText from "@/Utils/RichText";
import { format } from 'date-fns';
import Head from "next/head";
import { Metadata } from "next";
import BlogCard from "@/components/UI/BlogCard";


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
  //console.log(post?.categories?.title)
const relatedPosts = await fetchBlogPostsByCategory(post?.categories?.id, post?.id);
//console.log(categories)

  const image = post?.header_image?.map((item) => {
    if (typeof item === 'object' && item !== null) {
      return item.url;
    }
    return null;
  });

  const content = post?.content || [];
  const date = post?.createdAt ? new Date(post?.createdAt) : null;
  const formattedDate = date ? format(date, 'MMMM dd, yyyy'): null;

  const title = post?.meta?.title;
  const description = post?.meta?.description || "";

   

  return (

    <div className="mt-28">
      <div className="mx-auto md:max-w-screen-lg p-4 ">
        <main className="mt-10 flex flex-col justify-center items-center text-gray-700">
          <div className="relative mx-auto mb-4 md:mb-0">
            <div className="px-4 lg:px-0">
              <h2 className=" my-6 text-4xl font-bold leading-tight text-primary text-center  ">
                {post?.title} </h2>
              <div className="flex text-lg text-center ">
                <p className="text-center">
                   {formattedDate ? formattedDate: ""}
                </p>
              </div>
              <div>
                {post?.authors?.map((author, index) => (
                  <p  className = "text-lg" key={index}>{typeof author === 'object' ? `   Written by ${author.name}` : ''}
                  </p>))}
              </div>
              <p className="flex mb-2 py-2 text-gray-700 text-lg">
                {post?.description}
              </p>
            </div>
            <div className="flex justify-center items-center ">
              <img
                src={image?.toString()}
                className="object-cover lg:rounded "
                style={{ height: "26em", width: "48em" }}
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
          {/* UNCOMMENT RELATED POSTS HERE WHEN WE HAVE CONTENT */}
         {/*  <div>
            <h2 className="text-4xl font-bold text-primary py-8">Related Posts</h2>
          </div>
          <div className="flex justify-center">
            
        <div className="max-w-sm md:max-w-4xl gap-2 grid grid-cols-1 md:grid-cols-3">
          
         {relatedPosts.map((relatedPost) => (
              <BlogCard key={relatedPost.id} post={relatedPost} />
            ))}
           
        </div>
      </div>  */}
        </main>
      </div>
    </div>

  );
}
export async function generateMetadata({
  params,
}: {
  params: { post: string };
}): Promise<Metadata> {
  // const { isEnabled: isDraftMode } = draftMode()

  const id = decodeURIComponent(params.post)
  const res = await fetchBlogPostById(id);
  const post = res[0]

  return {
    title: post?.meta?.title,
    description: post?.meta?.description,
    openGraph: {
      title: post?.meta?.title || "WLU MSA ",
      description: post?.meta?.description || "Blog post",
      // images: [post.header_image],
      type: "article",
      locale: "en_US",
      //  publishedTime: ,
      //     authors: post?.authors ,
      siteName: "WLU MSA",
      //image
      //url
    },
  }
}

import React from "react";
//import Markdown from "react-markdown";

import type { Metadata } from 'next'
import { fetchBlogPostById, fetchBlogPostByTitle } from "@/utils/datafetcher";
import RichText from "@/utils/RichText";
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



  return (
    <div className="mt-20">
      <div className="mx-auto max-w-screen-lg">
        <main className="mt-10">
          <div className="relative mx-auto mb-4 w-full md:mb-0">
            <div className="px-4 lg:px-0">
              <h2 className="text-4xl font-semibold leading-tight text-primary">
                {post?.title}
              </h2>

              <a
                href="#"
                className="mb-2 inline-flex items-center justify-center py-2 text-secondary"
              >
                {post?.description}
              </a>
            </div>

            <img
              src={image?.toString()}
              className="w-full object-cover lg:rounded"
              style={{ height: "28em" }}
            />
          </div>

          <div className="flex flex-col lg:flex-row lg:space-x-12">
            <div className="mt-12 w-full px-4 text-lg leading-relaxed text-gray-700 lg:w-3/4 lg:px-0">
              <div key={0} className="mb-10">
                <RichText content={content} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
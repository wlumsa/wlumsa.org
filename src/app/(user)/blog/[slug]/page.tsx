import React from "react";
import { fetchBlogPostById, fetchBlogPostByTitle } from "@/Utils/datafetcher";
import RichText from "@/Utils/RichText";
import { format } from 'date-fns';
import Head from "next/head";
import { Metadata } from "next";

type Params = Promise<{ slug: string }>


export default async function BlogPost(props: {
  params: Params
}) {
  const params = await props.params
  const slug = params.slug
  const id = decodeURIComponent(slug)
  const res = await fetchBlogPostById(id);


  const post = res[0]

  const image = post?.header_image?.map((item) => {
    if (typeof item === 'object' && item !== null) {
      return item.url;
    }
    return null;
  });

  const content = post?.content || [];
  const date = new Date(post?.createdAt || "")
  const formattedDate = format(date, 'MMMM dd, yyyy');
  const title = post?.meta?.title;
  const description = post?.meta?.description || "";

   

  return (

    <div className="mt-28">
      <div className="mx-auto max-w-screen-lg">
        <main className="mt-10 flex flex-col justify-center items-center text-gray-700">
          <div className="relative mx-auto mb-4 md:mb-0">
            <div className="px-4 lg:px-0">
              <h2 className=" text-left my-6 text-4xl font-bold leading-tight text-primary  ">
                {post?.title} </h2>
              <div className="flexjustify-start text-lg">
                <p className="">
                  Published - {formattedDate}
                </p>
              </div>
              <div>
                {post?.authors?.map((author, index) => (
                  <p  className = "text-lg" key={index}>{typeof author === 'object' ? `   Author - ${author.name}` : ''}
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
              <div key={0} className="mb-10 items-center">
                <RichText content={content} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>

  );
}

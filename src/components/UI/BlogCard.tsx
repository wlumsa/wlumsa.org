import React from "react";
import Link from "next/link";
import { PostProps } from "@/Utils/types";
import { format } from 'date-fns';

/**
 * Represents a blog card component.
 * @param {string} id - The unique identifier of the blog.
 * @param {string} title - The title of the post.
 * @param {string} description - The description of the blog.
 * @returns {JSX.Element} The rendered blog card component.
 */


const BlogCard: React.FC<PostProps> = ({post}) => {


  const date = new Date(post.createdAt)
  const formattedDate = format(date, 'MMMM dd, yyyy');
  const image = post?.header_image?.map((item) => {
    if (typeof item === 'object' && item !== null) {
      return item.url;
    }
    return null;
  });
  return (
    <div className=" card cursor-pointer text-start items-center w-72 rounded-lg  bg-base-100 border duration-500 hover:scale-105 hover:shadow-xl ">
      <figure className="w-full">
       <img src={image?.toString()} className="object-cover h-48 w-full"/>
      </figure>
      <div className="card-body w-72 px-6 py-3">
      
        <div className="flex flex-row  text-slate-500">
         <p>{formattedDate}</p> 
            <div className="badge badge-secondary text-primary font-semibold rounded-lg">{}</div>
        </div>
        <h2 className="card-title  text-primary">{post.title}</h2>
        <p>{post.description ? post.description.length >= 50 ? post.description.slice(0, 70) + "..." : post.description: "" }</p>
        <div className="card-actions justify-end">
          <Link href={`/blog/${post.id}`}>
            <button className="btn btn-primary text-secondary">Read More →</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;

import React from "react";
import Link from "next/link";
import { RoommatePost } from "@/payload-types";
import { format } from 'date-fns';

/**
 * Represents a blog card component.
 * @param {string} id - The unique identifier of the blog.
 * @param {string} title - The title of the post.
 * @param {string} description - The description of the blog.
 * @returns {JSX.Element} The rendered roommate card card component.
 */
interface PostProps {
  post: RoommatePost;
}

const RoommatePostCard: React.FC<PostProps> = ({ post }) => {

  const date = new Date(post.createdAt)
  const formattedDate = format(date, 'MMMM dd, yyyy');
  const image = post?.images;
  return (
    <div className=" card cursor-pointer text-start items-center w-72 rounded-lg  bg-base-100 border duration-500 hover:scale-105 hover:shadow-xl ">
      <figure className="w-full">
        <img src={image?.[0]?.toString() || ""} className="object-cover h-48 w-full" />
      </figure>
      <div className="card-body w-72 px-6 py-4">
        <div className=" text-slate-500">
          <p>{formattedDate}</p>
        </div>
     
        {/* <div className="badge w-fit p-4 badge-secondary text-primary font-semibold rounded-md">
                  {typeof post?.categories === 'object' ? post?.categories?.title: ""}
                </div> */}
         
      
        <h2 className="card-title  text-primary">{post.title}</h2>
        <p>{post.description ? post.description.length >= 50 ? post.description.slice(0, 70) + "..." : post.description : ""}</p>
        <div className="card-actions justify-end">
          <Link href={`/roommateservice/${post.id}`}>
            <button className="btn btn-primary text-secondary">Read More →</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoommatePostCard;

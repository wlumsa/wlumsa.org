import React from "react";
import Link from "next/link";
import { PostProps } from "@/utils/types";

/**
 * Represents a blog card component.
 * @param {string} id - The unique identifier of the blog.
 * @param {string} name - The name of the blog.
 * @param {string} tagline - The tagline of the blog.
 * @returns {JSX.Element} The rendered blog card component.
 */
const BlogCard: React.FC<PostProps> = ({post}) => {
  return (
    <div className="card w-72 rounded-xl bg-base-100 shadow-md duration-500 hover:scale-105 hover:shadow-xl">
      <div className="card-body w-72 px-4 py-3">
        <h2 className="card-title">{post.title}</h2>
        <p>{post.description}</p>
        <div className="card-actions justify-end">
          <Link href={`/blog/${post.id}`}>
            <button className="btn btn-primary text-base-100">Read More</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;

import React from "react";
import Link from "next/link";
import { Post } from "@/payload-types";
import { format } from 'date-fns';

/**
 * Represents a blog card component.
 * @param {string} id - The unique identifier of the blog.
 * @param {string} title - The title of the post.
 * @param {string} description - The description of the blog.
 * @returns {JSX.Element} The rendered blog card component.
 */
interface PostProps {
  post: Post;
}

const BlogCard: React.FC<PostProps> = ({ post }) => {
  function slugify(postTitle: string) {
    //trim whitespace, convert to lowercase, remove non-alphanumeric chars, replace spaces with hyphens, remove consecutive hyphens
    postTitle.replace(/^\s+|\s+$/g, '');
    postTitle = postTitle.toLowerCase();
    postTitle = postTitle.replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');
    return postTitle;
  }
  const title = post?.title ? slugify(post.title) : "";

  const date = post?.createdAt ? new Date(post.createdAt) : new Date();
  const formattedDate = isNaN(date.getTime()) ? 'Date unavailable' : format(date, 'MMMM dd, yyyy');
  const image = post?.header_image?.map((item) => {
    if (typeof item === 'object' && item !== null) {
      return item.url;
    }
    return null;
  });
  return (
    <div className="card cursor-pointer text-start items-center w-72 rounded-lg bg-base-100 border border-base-300 duration-500 hover:scale-105 hover:shadow-xl hover:border-primary/30">
      <figure className="w-full">
        <img src={image?.toString()} className="object-cover h-48 w-full" />
      </figure>
      <div className="card-body w-72 px-6 py-4">

        <div className="text-base-content/60">
          <p>{formattedDate}</p>
        </div>
        <div>
          <div className="badge w-fit p-4 badge-secondary text-primary font-semibold rounded-md">
            {typeof post?.categories === 'object' ? post?.categories?.title : ""}
          </div>
        </div>
        <h2 className="card-title text-primary">{post.title}</h2>
        <p className="text-base-content/80">{post.description ? post.description.length >= 50 ? post.description.slice(0, 70) + "..." : post.description : ""}</p>
        <div className="card-actions justify-end">
          <Link href={`/blog/${title}-${post.id}`}>
            <button className="btn btn-primary text-secondary hover:bg-primary/90">Read More →</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;

import React from "react";
import Link from "next/link";
import { Post } from "@/payload-types";
import { format } from 'date-fns';
import { ArrowRight, Calendar, ExternalLink, LinkIcon } from "lucide-react";
import { Image } from "next/image";
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
    // <div className="card cursor-pointer text-start items-center w-72 rounded-lg bg-base-100 border border-base-300 duration-500 hover:scale-105 hover:shadow-xl hover:border-primary/30">
    //   <figure className="w-full">
    //     <img src={image?.toString()} className="object-cover h-48 w-full" />
    //   </figure>
    //   <div className="card-body w-72 px-6 py-4">

    //     <div className="text-base-content/60">
    //       <p>{formattedDate}</p>
    //     </div>
    //     <div>
    //       <div className="badge w-fit p-4 badge-secondary text-primary font-semibold rounded-md">
    //         {typeof post?.categories === 'object' ? post?.categories?.title : ""}
    //       </div>
    //     </div>
    //     <h2 className="card-title text-primary">{post.title}</h2>
    //     <p className="text-base-content/80">{post.description ? post.description.length >= 50 ? post.description.slice(0, 70) + "..." : post.description : ""}</p>
    //     <div className="card-actions justify-end">
    //       <Link href={`/blog/${title}-${post.id}`}>
    //         <button className="btn btn-primary text-secondary hover:bg-primary/90">Read More →</button>
    //       </Link>
    //     </div>
    //   </div>
    // </div>
    <article className="card mx-2 group rounded-xl border border-base-300   shadow-sm transition-all hover:shadow-md dark:border-base-700 bg-gray-50/50 min-h-120">
      <div className="mb-4 p-4 h-44 w-full overflow-hidden rounded-t-lg bg-gray-100">
        {image && image.length > 0 && image[0] ? (

          <Image
            src={image[0] ?? ""}
            alt={post.title || "Blog header image"}
            width={620}
            height={420}
            className="h-full w-full p-4 object-cover transition-transform duration-200 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-2xl text-primary p-4" aria-hidden>
            <span className="text-xs text-base-content/50">No image</span>
          </div>
        )}
      </div>

      <div className="flex flex-col space-y-3 p-5 min-h-72 ">
        <header>
          <div className="flex flex-col md:flex-row md:gap-4 md:items-center justify-between">
            <div className=" items-center  gap-2">
              {/* <Calendar size={16} className="text-base-content/70" /> */}
              <p className="text-base-content/70 text-sm py-2 ">{formattedDate}</p>
            </div>
            <div className="rounded-lg px-2 text-sm bg-primary/20 text-primary w-fit ">
              {typeof post?.categories === 'object' ? post?.categories?.title : ""}
            </div>
          </div>
          <h3 className="text-lg  font-semibold text-primary py-2">{post.title}</h3>
          <p className="text-base-content/70 text-sm md:text-md  ">{post.description ? post.description.length >= 50 ? post.description.slice(0, 150) + "..." : post.description : ""}</p>
        </header>
        <div className=" card-actions text-left justify-end py-2">
          <Link
            href={`/blog/${title}-${post.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit flex  items-center justify-center gap-2 rounded-lg border border-primary px-3 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-primary-content"
            aria-label={`Read article about ${title} }`}
          >
            Read More
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;

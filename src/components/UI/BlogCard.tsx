import React from "react";
import Link from "next/link";
import { Post } from "@/payload-types";
import { format } from 'date-fns';
import { ArrowRight, Calendar, ExternalLink, LinkIcon } from "lucide-react";
import  Image  from "next/image";
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

    <article className="group flex flex-col h-full rounded-2xl overflow-hidden bg-base-100 border border-base-300 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-primary/30 hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-base-200">
        {image && image.length > 0 && image[0] ? (
          <Image
            src={image[0] ?? ""}
            alt={post.title || "Blog header image"}
            width={620}
            height={420}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center" aria-hidden>
            <span className="text-sm text-base-content/30">No image</span>
          </div>
        )}
        {/* Category Badge - Overlay on image */}
        {typeof post?.categories === 'object' && post?.categories?.title && (
          <div className="absolute top-4 right-4 px-3 py-1 text-xs font-medium rounded-full bg-primary text-primary-content shadow-md">
            {post.categories.title}
          </div>
        )}
      </div>

      {/* Content Container */}
      <div className="flex flex-col flex-1 p-5 sm:p-6">
        {/* Date */}
        <div className="flex items-center gap-2 mb-3">
          <Calendar size={14} className="text-base-content/50" />
          <time className="text-xs sm:text-sm text-base-content/60" dateTime={post.createdAt}>
            {formattedDate}
          </time>
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-bold text-base-content mb-3 line-clamp-2 group-hover:text-primary transition-colors">
          {post.title}
        </h3>

        {/* Description */}
        <p className="text-sm sm:text-base text-base-content/70 mb-6 line-clamp-3 flex-1">
          {post.description ? post.description.length >= 120 ? post.description.slice(0, 120) + "..." : post.description : ""}
        </p>

        {/* CTA Button */}
        <Link
          href={`/blog/${title}-${post.id}`}
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-primary border-2 border-primary rounded-lg transition-all duration-200 hover:bg-primary hover:text-primary-content group/btn"
          aria-label={`Read article about ${title}`}
        >
          Read More
          <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
        </Link>
      </div>
    </article>
  );
};

export default BlogCard;

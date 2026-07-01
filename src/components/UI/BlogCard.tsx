import React from "react";
import Link from "next/link";
import { Category as PostCategory, Exec, Media, Post } from "@/payload-types";
import { format } from "date-fns";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
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
    postTitle = postTitle.trim();
    postTitle = postTitle.toLowerCase();
    postTitle = postTitle
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
    return postTitle;
  }
  const title = post?.title ? slugify(post.title) : "";
  const href = `/blog/${title}-${post.id}`;

  const date =
    post?.publishedAt || post?.createdAt
      ? new Date(post.publishedAt || post.createdAt)
      : new Date();
  const formattedDate = isNaN(date.getTime())
    ? "Date unavailable"
    : format(date, "MMMM dd, yyyy");
  const image = post?.header_image?.find(
    (item): item is Media => typeof item === "object" && item !== null
  );
  const category =
    typeof post?.categories === "object"
      ? (post.categories as PostCategory)
      : null;
  const author = post?.authors?.find(
    (item): item is Exec => typeof item === "object" && item !== null
  );
  const excerpt = post.description
    ? post.description.length > 132
      ? `${post.description.slice(0, 132).trim()}...`
      : post.description
    : "";
  return (
    <article className="h-full">
      <Link
        href={href}
        className="group flex h-full flex-col overflow-hidden border border-base-300 bg-base-100 transition-[border-color,box-shadow] duration-200 hover:border-primary/30 hover:shadow-[0_10px_24px_rgba(31,31,31,0.07)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-base-100"
        aria-label={`Read ${post.title || "blog post"}`}
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-base-200">
          {image?.url ? (
            <Image
              src={image.url}
              alt={image.alt || post.title || "Blog header image"}
              width={620}
              height={420}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div
              className="flex h-full w-full items-center justify-center"
              aria-hidden
            >
              <span className="font-heading text-5xl font-bold text-primary/10">
                MSA
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col p-4 sm:p-5">
          <div className="mb-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-semibold uppercase tracking-wide text-base-content/55">
            {category?.title && (
              <>
                <span className="text-primary">{category.title}</span>
                <span aria-hidden className="text-base-content/25">
                  /
                </span>
              </>
            )}
            <time dateTime={post.publishedAt || post.createdAt}>
              {formattedDate}
            </time>
            {author?.name && (
              <>
                <span aria-hidden className="text-base-content/25">
                  /
                </span>
                <span className="normal-case tracking-normal text-base-content/55">
                  {author.name}
                </span>
              </>
            )}
          </div>

          <h3 className="font-heading mb-3 text-balance text-xl font-bold leading-tight text-base-content underline decoration-transparent underline-offset-4 transition-colors group-hover:text-primary group-hover:decoration-primary/35 sm:text-[1.45rem]">
            {post.title}
          </h3>

          {excerpt && (
            <p className="mb-5 line-clamp-3 flex-1 text-sm leading-relaxed text-base-content/70 sm:text-base">
              {excerpt}
            </p>
          )}

          <span className="mt-auto inline-flex items-center justify-between border-t border-base-content/15 pt-4 text-sm font-semibold text-primary">
            <span>Read</span>
            <ArrowUpRight
              size={16}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden
            />
          </span>
        </div>
      </Link>
    </article>
  );
};

export default BlogCard;

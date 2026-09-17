import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import type { Metadata } from "next";
import type { Category, Exec, Media } from "@/payload-types";
import { fetchBlogPostById } from "@/Utils/datafetcher";
import RichText from "@/Utils/RichText";

type Params = Promise<{ slug: string }>;

export const metadata: Metadata = {
  title: "Blog Post",
  description: "Read our latest blog posts and articles",
};

export default async function BlogPost({ params }: { params: Params }) {
  const { slug } = await params;
  const id = slug.split("-").pop() || "";
  const [post] = await fetchBlogPostById(id);

  if (!post) notFound();

  const image = post.header_image?.find(
    (item: number | Media): item is Media =>
      typeof item === "object" && item !== null
  );
  const category =
    typeof post.categories === "object" ? (post.categories as Category) : null;
  const author = post.authors?.find(
    (item: number | Exec): item is Exec =>
      typeof item === "object" && item !== null
  );
  const publishedAt = post.publishedAt || post.createdAt;
  const date = new Date(publishedAt);
  const formattedDate = Number.isNaN(date.getTime())
    ? "Date unavailable"
    : format(date, "MMMM d, yyyy");

  return (
    <article className="mt-16 bg-base-100 px-4 py-10 text-base-content sm:px-6 sm:py-14 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="mx-auto max-w-3xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-sm text-sm font-semibold text-primary transition-colors hover:text-primary/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <ArrowLeft size={16} aria-hidden />
            Back to Blog
          </Link>

          {category?.title && (
            <p className="mt-10 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              {category.title}
            </p>
          )}
          <h1 className="font-heading mt-5 text-balance text-4xl font-bold leading-tight text-primary sm:text-5xl">
            {post.title}
          </h1>
          {post.description && (
            <p className="mt-5 text-lg leading-relaxed text-base-content/75 sm:text-xl">
              {post.description}
            </p>
          )}
          <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-base-300 pt-4 text-sm text-base-content/65">
            {author?.name && (
              <span className="font-semibold text-base-content">
                {author.name}
              </span>
            )}
            {author?.name && <span aria-hidden>·</span>}
            <time dateTime={publishedAt}>{formattedDate}</time>
          </div>
        </header>

        {image?.url && (
          <div className="relative mt-9 aspect-[16/9] overflow-hidden bg-base-200 sm:mt-10">
            <Image
              src={image.url}
              alt={image.alt || post.title}
              fill
              sizes="(min-width: 1024px) 1024px, 100vw"
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="mx-auto max-w-3xl pt-10 sm:pt-12">
          <RichText
            content={post.content}
            className="font-body text-lg leading-relaxed"
          />
          <div className="mt-14 border-t border-base-300 pt-6">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-sm text-sm font-semibold text-primary transition-colors hover:text-primary/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <ArrowLeft size={16} aria-hidden />
              Back to Blog
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

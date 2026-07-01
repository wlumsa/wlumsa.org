import React from "react";
import Image from "next/image";
import Link from "next/link";
import BlogCard from "@/components/UI/BlogCard";
import {
  fetchBlogPostsByQuery,
  fetchBlogPostsByQueryAndCategory,
  getCategories,
} from "@/Utils/datafetcher";
import {
  Category as PostCategory,
  Exec,
  Media,
  Category as PayloadCategory,
  Post,
} from "@/payload-types";
import SearchBar from "@/components/UI/SearchBar";
import ButtonGroup from "@/components/UI/ButtonGroup";
import { ArrowUpRight, SearchX } from "lucide-react";
import { format } from "date-fns";

/**
 * Renders the Blog component.
 * Fetches blog data and displays a list of blog cards.
 * @returns The rendered Blog component.
 *
 */

type SearchParams = Promise<{ [key: string]: string | undefined }>;

export default async function Page(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  const query = searchParams.query || "";
  const categoryId = searchParams?.category || "0";
  interface BlogCategory {
    id: string;
    title: string;
  }

  const categoriesData = await getCategories();
  let categoryArray: BlogCategory[] = [];
  categoryArray.push({ id: "0", title: "All" });
  categoryArray = categoryArray.concat(
    categoriesData.map((category: PayloadCategory) => ({
      id: category.id.toString(),
      title: category.title,
    }))
  );
  const res =
    categoryId === "0"
      ? await fetchBlogPostsByQuery(query)
      : await fetchBlogPostsByQueryAndCategory(query, categoryId);

  const posts = res;
  const featuredPost = posts[0];
  const remainingPosts = posts.slice(1);
  const selectedCategory =
    categoryArray.find((category) => category.id === categoryId) ||
    categoryArray[0];
  const selectedCategoryTitle = selectedCategory?.title || "All";
  const hasFilters = Boolean(query || categoryId !== "0");
  const resultLabel =
    posts.length === 1 ? "1 article" : `${posts.length} articles`;

  return (
    <main className="mt-16 bg-base-100 text-base-content">
      <section className="border-b border-base-300 bg-base-100">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <div className="border-y border-base-300 py-6 sm:py-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-base-content/55">
                  Reflections & resources
                </p>
                <h1 className="font-heading max-w-3xl text-balance text-5xl font-bold leading-[0.98] text-primary sm:text-6xl lg:text-7xl">
                  MSA Blog
                </h1>
              </div>
              <p className="max-w-xl text-base leading-relaxed text-base-content/75 sm:text-lg lg:pb-2">
                Articles for spiritual growth, campus life, and academic
                steadiness from the Wilfrid Laurier Muslim Students&apos;
                Association.
              </p>
            </div>
          </div>

          <div className="pt-8 lg:pt-10">
            {featuredPost ? (
              <FeaturedPost
                post={featuredPost}
                eyebrow={hasFilters ? "Top result" : "Latest article"}
              />
            ) : (
              <div className="flex min-h-[260px] items-center justify-center border border-dashed border-base-300 bg-base-200/40 p-8 text-center text-base-content/60">
                No articles to feature yet.
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="border-b border-base-300 pb-6">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-base-content/55">
            Browse articles
          </p>
          <div className="grid gap-4 lg:grid-cols-[minmax(260px,420px)_1fr] lg:items-start">
            <SearchBar placeholder="Search articles" />
            <ButtonGroup categories={categoryArray} />
          </div>
          <div className="mt-4 flex flex-col gap-3 text-sm text-base-content/60 sm:flex-row sm:items-center sm:justify-between">
            <p>
              Showing{" "}
              <span className="font-semibold text-base-content">
                {resultLabel}
              </span>
              {categoryId !== "0" ? (
                <>
                  {" "}
                  in{" "}
                  <span className="font-semibold text-base-content">
                    {selectedCategoryTitle}
                  </span>
                </>
              ) : null}
              {query ? (
                <>
                  {" "}
                  matching{" "}
                  <span className="font-semibold text-base-content">
                    &quot;{query}&quot;
                  </span>
                </>
              ) : null}
            </p>
            {hasFilters && (
              <Link
                href="/blog"
                className="w-fit rounded-md px-2 py-1 font-semibold text-primary transition hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                Clear filters
              </Link>
            )}
          </div>
        </div>

        {remainingPosts.length > 0 ? (
          <>
            <div className="mb-5 mt-10 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                  Browse
                </p>
                <h2 className="font-heading mt-1 text-2xl font-bold text-base-content sm:text-3xl">
                  More from the blog
                </h2>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {remainingPosts.map((post: Post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </>
        ) : posts.length === 0 ? (
          <div className="mt-10 flex min-h-[320px] flex-col items-center justify-center border border-dashed border-base-300 bg-base-200/50 px-6 py-12 text-center">
            <SearchX className="h-10 w-10 text-primary/70" aria-hidden />
            <h2 className="font-heading mt-4 text-2xl font-bold text-base-content">
              No articles found
            </h2>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-base-content/65">
              Try a different search term or choose another category.
            </p>
            <Link
              href="/blog"
              className="mt-5 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-content transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              Reset search
            </Link>
          </div>
        ) : null}
      </section>
    </main>
  );
}

function FeaturedPost({ post, eyebrow }: { post: Post; eyebrow: string }) {
  const image = post.header_image?.find(
    (item): item is Media => typeof item === "object" && item !== null
  );
  const category =
    typeof post.categories === "object"
      ? (post.categories as PostCategory)
      : null;
  const author = post.authors?.find(
    (item): item is Exec => typeof item === "object" && item !== null
  );
  const href = getPostHref(post);
  const date =
    post.publishedAt || post.createdAt
      ? new Date(post.publishedAt || post.createdAt)
      : new Date();
  const formattedDate = Number.isNaN(date.getTime())
    ? "Date unavailable"
    : format(date, "MMMM dd, yyyy");

  return (
    <article className="overflow-hidden border border-base-300 bg-base-100 shadow-[0_12px_32px_rgba(31,31,31,0.06)]">
      <Link
        href={href}
        className="group grid min-h-[320px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-base-100 md:grid-cols-[1.05fr_0.95fr]"
        aria-label={`Read ${post.title || "featured article"}`}
      >
        <div className="relative min-h-[220px] overflow-hidden bg-base-300 md:min-h-full">
          {image?.url ? (
            <Image
              src={image.url}
              alt={image.alt || post.title || "Featured blog image"}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              priority
            />
          ) : (
            <div className="flex h-full min-h-[220px] items-center justify-center bg-base-200">
              <span className="font-heading text-6xl font-bold text-primary/15">
                MSA
              </span>
            </div>
          )}
        </div>
        <div className="flex flex-col justify-between p-5 sm:p-7">
          <div>
            <div className="mb-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-semibold uppercase tracking-wide text-base-content/55">
              <span>{eyebrow}</span>
              {category?.title && (
                <>
                  <span aria-hidden className="text-base-content/25">
                    /
                  </span>
                  <span className="text-primary">{category.title}</span>
                </>
              )}
            </div>
            <h2 className="font-heading text-balance text-2xl font-bold leading-tight text-base-content transition-colors group-hover:text-primary sm:text-3xl">
              {post.title}
            </h2>
            {post.description && (
              <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-base-content/70 sm:text-base">
                {post.description}
              </p>
            )}
          </div>
          <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-base-content/60">
              <time dateTime={post.publishedAt || post.createdAt}>
                {formattedDate}
              </time>
              {author?.name && (
                <span className="before:mr-3 before:text-base-content/25 before:content-['/']">
                  {author.name}
                </span>
              )}
            </div>
            <span className="inline-flex items-center gap-2 border-t border-base-300 pt-3 text-sm font-semibold text-primary sm:border-t-0 sm:pt-0">
              Read
              <ArrowUpRight
                size={16}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden
              />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

function getPostHref(post: Post) {
  return `/blog/${slugify(post.title || "post")}-${post.id}`;
}

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

import React from "react";
import BlogCard from "@/components/UI/BlogCard";
import { fetchBlogPosts } from "@/utils/datafetcher";
import { Media } from "@/payload-types";
/**
 * Renders the Blog component.
 * Fetches blog data and displays a list of blog cards.
 * @returns The rendered Blog component.
 */
export default async function Blog() {
  const categories = ["Professional", "Education", "Academic"];

  const res = await fetchBlogPosts();
  const posts = res;
  const id=posts[0]?.id;
  
 

  return (
    <section className="mt-10 bg-base-100 ">
      <div className="mx-auto max-w-screen-md px-4 py-4 lg:px-6 lg:py-16">
        <div className="mb-4 text-center text-4xl font-bold text-primary">Blog </div>
        <h1 className="text-center">
          Welcome to our blog. Learn more about Islam, and how to excel spiritually as well as academically. View and search articles related to different topics.
        </h1>
        <div className="mx-2 rounded-xl bg-white px-4">
          <label className="input input-bordered flex items-center my-2">
            <input type="text" className="grow" placeholder="Search" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </div>
        <div className="flex flex-row items-center justify-center">
        {categories.map(category => (
            <a key={category} href={`?category=${category}`} className={`btn text-primary m-4`}>{category}</a>
          ))}
        </div>
      </div>
      <div className="flex justify-center">
        <div className="max-w-sm md:max-w-4xl gap-2 grid grid-cols-1 md:grid-cols-3">
        {posts.map((post) => (
              <BlogCard key={post?.id} post={post}  />
            ))}
        </div>
      </div>
    </section>
  );
}

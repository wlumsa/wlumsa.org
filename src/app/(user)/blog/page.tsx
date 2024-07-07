import React from "react";
import BlogCard from "@/components/UI/BlogCard";
import { getBlogsData } from "@/Utils/datafetcher";

interface BlogPost {
  name: string;
  id: string;
  category: string;
  tagline: string;
  header_image: string;
  created_on: string;
  content: string;
}

interface BlogProps {
  initialPosts: BlogPost[];
  selectedCategory: string | null;
}

const Blog = async ({ searchParams }: { searchParams: { category?: string } }) => {
  const initialPosts = await getBlogsData();
  const selectedCategory = searchParams.category || null;
  const filteredPosts = selectedCategory
    ? initialPosts.filter(post => post.category === selectedCategory)
    : initialPosts;

  const categories = ["Professional", "Education", "Academic"];

  return (
    <section className="my-10 bg-base-100">
      <div className="mx-auto max-w-screen-md px-4 py-4 lg:px-6 lg:py-16">
        <div className="mb-4 text-center text-4xl font-bold text-primary">Blog - {selectedCategory ? selectedCategory : "all posts"}</div>
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
            <a
              key={category}
              href={`?category=${category}`}
              className={`btn text-primary m-4 ${selectedCategory === category ? "bg-secondary" : ""}`}
            >
              {category}
            </a>
          ))}
        </div>
      </div>
      <div className="flex justify-center">
        <div className="max-w-sm md:max-w-4xl gap-2 grid grid-cols-1 md:grid-cols-3">
          {filteredPosts.map(post => (
            <BlogCard
              key={post.id}
              id={post.id}
              name={post.name}
              image={post.header_image}
              category={post.category}
              tagline={post.tagline}
              created_on={post.created_on}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;

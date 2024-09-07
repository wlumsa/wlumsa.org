import React from "react";
import BlogCard from "@/components/UI/BlogCard";
import { fetchBlogPosts, fetchBlogPostsByQuery, fetchBlogPostsByQueryAndCategory } from "@/Utils/datafetcher";
import { Media } from "@/payload-types";
import SearchBar from "@/components/UI/SearchBar";
import ButtonGroup from "@/components/UI/ButtonGroup";

/**
 * Renders the Blog component.
 * Fetches blog data and displays a list of blog cards.
 * @returns The rendered Blog component.
 */
export default async function Blog({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    category?:string;
  };
}) {
  const query = searchParams?.query || '';
  const categoryId = searchParams?.category || '1';
  //const resourcesData = await fetchBlogPostsByCategory(categoryId);
  //const categories:string[] = ["Professional", "Education", "Academic", "Tech"];
  interface Category {
    id: string,
    title: string
  }
  const categories: Category[] = [
    {
      id: "1",
      title: "All"
    },
   
    {
      id: "2",
      title: "Religious Affairs"
    },
    {
      id: "3",
      title: "Technology"
    },
    {
      id: "4",
      title: "Professional Development"
    }
  ]

  //const res = await fetchBlogPosts();
  const res = categoryId === '1'
  ? await fetchBlogPostsByQuery(query)
  : await fetchBlogPostsByQueryAndCategory(query, categoryId);
 
  const posts = res;
  const id=posts[0]?.id;
  console.log("HELLOOOOOO")
  console.log(res);

  return (
    <section className="mt-10 bg-base-100 ">
      <div className="mx-auto max-w-screen-md px-4 py-4 lg:px-6 lg:py-16">
        <div className="mb-4 text-center text-4xl font-bold text-primary">Blog </div>
        <h1 className="text-center">
          Welcome to our blog. Learn more about Islam, and how to excel spiritually as well as academically. View and search articles related to different topics.
        </h1>
        <SearchBar/>
        
        <div className="flex flex-row items-center justify-center">
        <ButtonGroup categories={categories} />

       {/* <FilterButtons items={categories} activeTag={""}/> */}
        </div>
      </div>
      <div className="flex justify-center">
        <div className="max-w-sm md:max-w-4xl gap-2 grid grid-cols-1 md:grid-cols-3">
        {posts.map((post) => (
              <BlogCard key={post.id} post={post}  />
            ))}
        </div>
      </div>
    </section>
  );
}

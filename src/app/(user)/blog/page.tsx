import React from "react";
import BlogCard from "@/components/UI/BlogCard";
import { fetchBlogPosts, fetchBlogPostsByQuery, fetchBlogPostsByQueryAndCategory, getCategories } from "@/Utils/datafetcher";
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
  interface Category {
    id: string,
    title: string
  }
  const categories: Category[] = [
   
   
    {
      id: "1",
      title: "Religious Affairs"
    },
    {
      id: "2",
      title: "Academic"
    },
    {
      id: "3",
      title: "Professional Development"
    },
    {
      id: "4",
      title: "Tech"
    }
  ] 

  //const res = await fetchBlogPosts();
  const categoriesData = await getCategories();
  console.log(categoriesData)
  const res = categoryId === '1'
  ? await fetchBlogPostsByQuery(query)
  : await fetchBlogPostsByQueryAndCategory(query, categoryId);
 
  const posts = res;
  const id=posts[0]?.id;
  console.log(res);

  return (
    <section className="mt-16 bg-base-100 ">
      <div className="mx-auto  px-4 py-4 lg:px-6 lg:py-16">
        <div className="mb-4 text-center text-4xl font-bold text-primary ">Blog </div>
        <h1 className="text-center">
          Welcome to our blog. Learn more about Islam, and how to excel spiritually as well as academically. View and search articles related to different topics.
        </h1>
        <div className="mx-auto max-w-screen-md items-center text-center">
             <SearchBar />
        </div>
       
        
        <div className="flex flex-row items-center justify-center">
          <ButtonGroup categories={categories}  type="blog"/>
 
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

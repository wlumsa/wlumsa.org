import React from "react";
import BlogCard from "@/components/UI/BlogCard";
import {
  fetchBlogPostsByQuery,
  fetchBlogPostsByQueryAndCategory,
  getCategories,
} from "@/Utils/datafetcher";
import SearchBar from "@/components/UI/SearchBar";
import ButtonGroup from "@/components/UI/ButtonGroup";

/**
 * Renders the Blog component.
 * Fetches blog data and displays a list of blog cards.
 * @returns The rendered Blog component.
 * 
 */

type Params = { slug: string };
type SearchParams = { [key: string]: string | undefined };

interface Category {
  id: string;
  title: string;
}

export default async function Page(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const { slug } = props.params;
  const query = props.searchParams.query || "";
  const categoryId = props.searchParams.category || "0";

  const categoriesData = await getCategories();

  const categoryArray: Category[] = [
    { id: "0", title: "All" },
    ...categoriesData.map((category) => ({
      id: category.id.toString(),
      title: category.title,
    })),
  ];

  const posts =
    categoryId === "0"
      ? await fetchBlogPostsByQuery(query)
      : await fetchBlogPostsByQueryAndCategory(query, categoryId);

  if (process.env.NODE_ENV === "development") {
    console.log("Fetched Categories:", categoryArray);
    console.log("Blog Posts:", posts);
  }

  return (
    <section className="mt-16 bg-base-100">
      <div className="mx-auto px-4 py-4 lg:px-24 lg:py-16 w-[70%]">
        <h1 className="mb-4 text-center text-4xl font-bold text-primary">
          Blog
        </h1>
        <p className="text-center">
          Welcome to our blog. Learn more about Islam, and how to excel
          spiritually as well as academically. View and search articles related
          to different topics.
        </p>

        <div className="mx-auto max-w-screen-md text-center py-4">
          <SearchBar />
        </div>

        <div className="flex flex-row items-center justify-center">
          <ButtonGroup categories={categoryArray} />
        </div>
      </div>

      <div className="flex justify-center">
        <div className="max-w-sm md:max-w-4xl gap-4 grid grid-cols-1 md:grid-cols-3 px-4">
          {posts.length === 0 ? (
            <p className="text-center col-span-full text-gray-500">
              No blog posts found.
            </p>
          ) : (
            posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
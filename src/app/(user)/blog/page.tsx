import React from "react";
import BlogCard from "@/components/UI/BlogCard";
import { fetchBlogPosts, fetchBlogPostsByQuery, fetchBlogPostsByQueryAndCategory, getCategories } from "@/Utils/datafetcher";
import { Media, Category as PayloadCategory, Post } from "@/payload-types";
import SearchBar from "@/components/UI/SearchBar";
import ButtonGroup from "@/components/UI/ButtonGroup";

/**
 * Renders the Blog component.
 * Fetches blog data and displays a list of blog cards.
 * @returns The rendered Blog component.
 *
 */

type Params = Promise<{ slug: string }>
type SearchParams = Promise<{ [key: string]: string  | undefined }>

export default async function Page(props: {
  params: Params
  searchParams: SearchParams
}) {
  const params = await props.params
  const searchParams = await props.searchParams
  const slug = params.slug
  const query = searchParams.query || '';
  const categoryId = searchParams?.category || '0';
  interface Category {
    id: string,
    title: string
  }

  const categoriesData = await getCategories();
  console.log(categoriesData)
  let categoryArray: Category[] = [];
  categoryArray.push({id: "0", title: "All"});
  categoryArray = categoryArray.concat(categoriesData.map((category: PayloadCategory) => ({id: category.id.toString(), title: category.title})));
  console.log("categoryarray,", categoryArray);
  const res = categoryId === '0'
  ? await fetchBlogPostsByQuery(query)
  : await fetchBlogPostsByQueryAndCategory(query, categoryId);

  const posts = res;
  const id=posts[0]?.id;
  console.log(res);

  return (
    <section className="mt-16 bg-base-100">
      <div className="mx-auto px-4 py-8 lg:px-24 lg:py-16 w-[70%]">
        <div className="text-center mb-8">
          <h1 className="mb-6 text-4xl md:text-5xl font-heading font-bold text-primary">
            MSA Blog
          </h1>
          <p className="text-lg md:text-xl font-body text-base-content/80 max-w-3xl mx-auto leading-relaxed">
            Welcome to our blog. Learn more about Islam, and how to excel spiritually as well as academically.
            View and search articles related to different topics.
          </p>
        </div>

        <div className="mx-auto max-w-screen-md items-center text-center py-6">
             <SearchBar />
        </div>

        <div className="flex flex-row items-center justify-center mb-8">
          <ButtonGroup categories={categoryArray}  />
        </div>
      </div>
      <div className="flex justify-center pb-16">
        <div className="max-w-sm md:max-w-4xl gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post: Post) => (
              <BlogCard key={post.id} post={post}  />
            ))}
        </div>
      </div>
    </section>
  );
}

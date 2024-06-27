import React from "react";
import BlogCard from "@/components/UI/BlogCard";
import { getBlogsData } from "@/utils/datafetcher";
import { fetchBlogPostsData } from "@/utils/supabase/datafetcher";
/**
 * Renders the Blog component.
 * Fetches blog data and displays a list of blog cards.
 * @returns The rendered Blog component.
 */
export default async function Blog() {
  const res = await fetchBlogPostsData();
  const posts = res.docs;
  return (
    <section className="mt-10 bg-base-100 ">
      <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
        <div className="mx-auto mb-8 max-w-screen-sm text-center lg:mb-16">
          {posts.map((post) => (
            <BlogCard post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}

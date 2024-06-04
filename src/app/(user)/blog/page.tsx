import React from "react";
import BlogCard from "@/components/UI/BlogCard";
import { getBlogsData } from "@/utils/datafetcher";
/**
 * Renders the Blog component.
 * Fetches blog data and displays a list of blog cards.
 * @returns The rendered Blog component.
 */
export default async function Blog() {
  const posts = await getBlogsData();
  return (
    <section className="mt-10 bg-base-100 ">
      <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
        <div className="mx-auto mb-8 max-w-screen-sm text-center lg:mb-16">
          {posts.map((post) => (
            <BlogCard id={post.id} name={post.name} tagline={post.tagline} />
          ))}
        </div>
      </div>
    </section>
  );
}

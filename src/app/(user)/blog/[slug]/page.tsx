import React from "react";
import { fetchBlogPostById, fetchBlogPostByTitle } from "@/Utils/datafetcher";
import RichText from "@/Utils/RichText";
import { format } from "date-fns";
import { Metadata } from "next";
import type { Media, Exec } from "@/payload-types";

type Params = Promise<{ slug: string }>;

export const metadata: Metadata = {
  title: "Blog Post",
  description: "Read our latest blog posts and articles",
};

export default async function BlogPost(props: { params: Params }) {
  const params = await props.params;
  const slug = params.slug;
  const id = slug.split("-").pop();
  const res = await fetchBlogPostById(id ? id : "");

  const post = res[0];

  const image = post?.header_image?.map((item: number | Media) => {
    if (typeof item === "object" && item !== null) {
      return item.url;
    }
    return null;
  });

  const content = post?.content || [];
  const date = post?.createdAt ? new Date(post.createdAt) : new Date();
  const formattedDate = isNaN(date.getTime())
    ? "Date unavailable"
    : format(date, "MMMM dd, yyyy");
  const title = post?.meta?.title;
  const description = post?.meta?.description || "";

  return (
    <div className="mt-28">
      <div className="mx-auto max-w-screen-lg">
        <main className="mt-10 flex flex-col items-center justify-center text-base-content">
          <div className="relative mx-auto mb-8 md:mb-12">
            <div className="px-4 lg:px-0">
              <h1 className="font-heading my-6 text-left text-4xl font-bold leading-tight text-primary md:text-5xl">
                {post?.title}
              </h1>
              <div className="mb-2 flex justify-start text-lg">
                <p className="font-body text-base-content/70">
                  Published - {formattedDate}
                </p>
              </div>
              <div className="mb-4">
                {post?.authors?.map((author: number | Exec, index: number) => (
                  <p
                    className="font-body text-lg text-base-content/70"
                    key={index}
                  >
                    {typeof author === "object"
                      ? `Author - ${author.name}`
                      : ""}
                  </p>
                ))}
              </div>
              <p className="font-body mb-6 py-2 text-lg leading-relaxed text-base-content/80">
                {post?.description}
              </p>
            </div>
            <div className="mb-8 flex items-center justify-center">
              <img
                src={image?.toString()}
                className="object-cover shadow-lg lg:rounded"
                style={{ height: "26em", width: "42em", maxWidth: "100%" }}
                alt={post?.title || "Blog post header image"}
              />
            </div>
          </div>

          <div className="flex flex-col items-start justify-center lg:flex-row lg:space-x-14">
            <div className="mx-auto mt-8 w-full px-4 lg:w-[70%] lg:px-0">
              <div className="mb-10">
                <RichText
                  content={content}
                  className="font-body mt-4 text-lg leading-relaxed"
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

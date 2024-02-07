import React from "react";
import ReactMarkdown from "react-markdown";
import { getPost } from "@/Utils/api";
export default async function BlogPost({
  params,
}: {
  params: { post: string };
}) {
  const id = params.post;
  const { post, imageURL } = await getPost(id);

  if (!post) {
    return <div>Post not found</div>;
  }
  return (
    <div className="mt-20">
      <div className="mx-auto max-w-screen-lg">
        <main className="mt-10">
          <div className="relative mx-auto mb-4 w-full md:mb-0">
            <div className="px-4 lg:px-0">
              <h2 className="text-4xl font-semibold leading-tight text-primary">
                {post.name}
              </h2>
              <a
                href="#"
                className="mb-2 inline-flex items-center justify-center py-2 text-secondary"
              >
                {post.tagline}
              </a>
            </div>

            <img
              src={imageURL}
              className="w-full object-cover lg:rounded"
              style={{ height: "28em" }}
            />
          </div>

          <div className="flex flex-col lg:flex-row lg:space-x-12">
            <div className="mt-12 w-full px-4 text-lg leading-relaxed text-gray-700 lg:w-3/4 lg:px-0">
              <div key={0} className="mb-10">
                <ReactMarkdown>{post.content}</ReactMarkdown>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

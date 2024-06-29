import React from "react";
//import Markdown from "react-markdown";
import { fetchBlogPostById } from "@/utils/supabase/datafetcher";
export default async function BlogPost({
  params,
}: {
  params: { post: string };
}) {
  const id = params.post;
  const res= await fetchBlogPostById(id);
    
  const post = res.docs[0];
  console.log(post?.content)
  const image = post?.header_image
  //console.log(post);
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
                {post.title}
              </h2>
              <a
                href="#"
                className="mb-2 inline-flex items-center justify-center py-2 text-secondary"
              >
                {post.description}
              </a>
            </div>

            <img
              src={ '/path/to/default/image.jpg' }
              className="w-full object-cover lg:rounded"
              style={{ height: "28em" }}
            />
          </div>

          <div className="flex flex-col lg:flex-row lg:space-x-12">
            <div className="mt-12 w-full px-4 text-lg leading-relaxed text-gray-700 lg:w-3/4 lg:px-0">
              <div key={0} className="mb-10">
                {post.content_html}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
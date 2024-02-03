
import React from "react";

import { getPost } from "@/Utils/api";
export default async function BlogPost({
  params,
}: {
  params: { post: string };
}) {
  const id = params.post;
  const { post } = await getPost(id);

  if (!post) {
    return <div>Post not found</div>;
  }
  return (
    <div className="flex min-h-screen flex-col py-10">
      <h1 className="mt-20">{post.name}</h1>
    </div>
  );
}



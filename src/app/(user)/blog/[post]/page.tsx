
import React from "react";
import { useParams } from "next/navigation";


import { fetchProduct } from "@/Utils/api";


import ProductDisplay from "@/components/UI/ProductComponent";

export default async function ProductPage({
  params,
}: {
  params: { post: string };
}) {
  const id = params.post;

  if (!id) {
    return <div>Post not found</div>;
  }
  return (
    <div className="flex min-h-screen flex-col py-10">
      <h1 className="mt-20">{id}</h1>
    </div>
  );
}



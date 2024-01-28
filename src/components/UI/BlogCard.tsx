import React from "react";
import Link from "next/link";
type BlogCard = {
  id: string;
  name: string;
  tagline: string;
};
const BlogCard = ({ id, name, tagline }: BlogCard) => {
  return (
    <div className="card w-72 rounded-xl bg-base-100 shadow-md duration-500 hover:scale-105 hover:shadow-xl">
      <div className="card-body w-72 px-4 py-3">
        <h2 className="card-title">{name}</h2>
        <p>{tagline}</p>
        <div className="card-actions justify-end">
          <Link href={`/blog/${id}`}>
            <button className="btn btn-primary text-base-100">Buy Now</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;

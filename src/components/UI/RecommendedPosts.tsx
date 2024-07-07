import React from 'react'
import { getBlogsData } from "@/Utils/datafetcher";
import BlogCard from './BlogCard';
export default async function RecommendedPosts() {
    const posts = await getBlogsData();

  return (
    <div>
        <div>
            <h1 className='mb-10 text-3xl font-bold text-primary text-center'>Recommended Posts</h1>
        </div>
        <div>
        <div className="flex justify-center">
  <div className="max-w-sm md:max-w-4xl gap-2 grid grid-cols-1 md:grid-cols-3">
    {posts.slice(0, 3).map((post) => (
      <BlogCard 
        key={post.id}
        id={post.id}
        name={post.name}
        category={post.category}
        image={post.header_image}
        tagline={post.tagline}
        created_on={post.created_on}
      />
    ))}
  </div>
</div>

        </div>
    </div>
  )
}


import React from "react";
import BlogCard from "@/components/UI/BlogCard";

const page = () => {
  return (
    <section className="mt-10 bg-base-100 ">
      <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
        <div className="mx-auto mb-8 max-w-screen-sm text-center lg:mb-16">
          <BlogCard id = "123" name= "test" tagline = "adbwad" />
        </div>
      </div>
    </section>
  );
};

export default page;

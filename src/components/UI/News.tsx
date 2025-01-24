"use client";
import { InstagramEmbed } from "react-social-media-embed";
import React from "react";
import { Instagram } from "@/payload-types";
import Link from "next/link";

interface InstagramPageProps {
  instagramPosts: Instagram[];
}

const News: React.FC<InstagramPageProps> = ({ instagramPosts }) => {

  const queryLength = instagramPosts.length;
  console.log(instagramPosts);
  return (
    <div id="news" className="w-full bg-base-100 py-10">
      <div className="flex flex-grow flex-col items-center justify-center px-8">
        <div className="flex flex-col items-start justify-center">
          <h3 className="pb-4 text-center text-3xl font-bold text-primary duration-200 hover:scale-105">
            Latest News
          </h3>
          {instagramPosts.length > 0 ? (
            <div className="carousel max-w-[22rem] overflow-x-auto rounded-box bg-primary py-2 sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-6xl">

              {instagramPosts.map((post, index) => (
                <div
                  id={`item${(index + 1).toString()}`}
                  className="carousel-item relative px-2 "
                  key={index}
                >
                  <InstagramEmbed url={post.url} height={425} />
                </div>
              ))}
            </div>
          ): (
            <div className="text-center text-neutral">
              No news to display.
            </div>
          )}
        </div>
        <div className="flex w-full justify-center gap-2 pt-4">
          {Array.from({ length: queryLength }, (_, index) => (
            <Link
              href={`#item${index + 1}`}
              className="btn btn-xs border-primary bg-base-100 text-primary duration-200 hover:scale-105 hover:bg-base-200"
              key={index}
            >
              {index + 1}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;

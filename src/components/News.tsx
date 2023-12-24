import { InstagramEmbed } from "react-social-media-embed";
import React, { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore"; // Import orderBy
import db from "../firebase";
import { Suspense } from "react";

interface InstagramPost {
  link: string;
  date: Date;
}

const News: React.FC = () => {
  const [instagramPosts, setInstagramPosts] = useState<InstagramPost[]>([]);

  useEffect(() => {
    const fetchInstagramPosts = async () => {
      const instagramPostsCollectionRef = collection(db, "Posts");
      const postsQuery = query(
        instagramPostsCollectionRef,
        orderBy("date", "desc")
      );
      const querySnapshot = await getDocs(postsQuery); // Use getDocs on the query

      const instagramPostsData = querySnapshot.docs.map(
        (doc) => doc.data() as InstagramPost
      );
      setInstagramPosts(instagramPostsData);
    };

    fetchInstagramPosts();
  }, []);
  const queryLength = instagramPosts.length;
  return (
    <div id="news" className="w-full bg-base-100 py-10">
      <div className="flex flex-col flex-grow items-center justify-center px-8">
        <div className="flex flex-col items-start justify-center">
          <h3 className="pb-4 text-center text-3xl font-bold text-primary duration-200 hover:scale-105">
            Latest News
          </h3>
          <div className="carousel max-w-[22rem] overflow-x-auto rounded-box bg-primary py-2 sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-6xl">
            {instagramPosts.map((post, index) => (
              <div
                id={`item${(index + 1).toString()}`}
                className="carousel-item relative px-2 " key={index}
              >
                <InstagramEmbed url={post.link} height={425} />
              </div>
            ))}
          </div>
        </div>
        <div className="flex w-full justify-center gap-2 pt-4">
          {Array.from({ length: queryLength }, (_, index) => (
            <a
              href={`#item${index + 1}`}
              className="btn btn-xs border-primary bg-base-100 text-primary duration-200 hover:scale-105 hover:bg-base-200" key={index}
            >
              {index + 1}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;

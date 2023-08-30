import { InstagramEmbed } from 'react-social-media-embed';
import React, { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore"; // Import orderBy
import db from "../firebase";

interface InstagramPost {
    link:string;
    date:Date;
  }
  

    
const News: React.FC = () => {
    const [instagramPosts, setInstagramPosts] = useState<InstagramPost[]>([]);

    useEffect(() => {
        const fetchInstagramPosts = async () => {
            const instagramPostsCollectionRef = collection(db, "Posts");
            const postsQuery = query(instagramPostsCollectionRef, orderBy("date", "desc"));
            const querySnapshot = await getDocs(postsQuery); // Use getDocs on the query

            const instagramPostsData = querySnapshot.docs.map(doc => doc.data() as InstagramPost);
            setInstagramPosts(instagramPostsData);
        };
        
        fetchInstagramPosts();
    }, []);
    const queryLength = instagramPosts.length
    return (
        <div id="news" className="flex flex-col px-0 py-10 justify-center items-start max-w-6xl bg-base-100">
            <h3 className="text-3xl text-center py-3 pb-4 font-bold text-primary">Latest News</h3>
            
            <div className="carousel rounded-box gap-2 shadow  py-3  w-[325px] xl:w-[1180px] lg:w-[924px]   md:w-[668px] sm:w-[540px] ">
                 {instagramPosts.map((post, index) => (
                    <div id = {`item${(index+1).toString()}`}className="carousel-item  rounded-xl ">
                        <InstagramEmbed url = {post.link} height={425}    />
                    </div>
                ))}
                
            </div>
            <div className='flex justify-center w-full py-2 gap-2'>
                {Array.from({ length: queryLength }, (_, index) => (
                    <a href= {`#item${index+1}`} className='btn btn-xs'>{index+1}</a>
                ))}
            </div>
         </div>
    );
}

export default News;

/*

    */

/*

            ))}
            */
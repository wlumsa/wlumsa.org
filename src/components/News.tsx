import { InstagramEmbed } from 'react-social-media-embed';
import React, { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore"; // Import orderBy
import db from "../firebase";
import { Suspense } from 'react'

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
        <div id="news" className="py-10 w-full bg-base-100">
            <div className='flex flex-col justify-center items-center px-8'>
                <div className='flex flex-col items-start justify-center'>
                    <h3 className="text-3xl text-center pb-4 font-bold text-primary hover:scale-105 duration-200">Latest News</h3>
                    <div className="carousel rounded-box py-2 bg-primary overflow-x-auto max-w-[22rem] sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-6xl">
                            {instagramPosts.map((post,index)=>(
                                <div id = {`item${(index+1).toString()}`} className="carousel-item relative px-2 ">
                                    <InstagramEmbed url = {post.link} height={425}/>
                                </div>
                            ))}
                    </div>
                </div>
                <div className='flex justify-center w-full pt-4 gap-2'>
                    {Array.from({ length: queryLength }, (_, index) => (
                        <a href= {`#item${index+1}`} className='btn btn-xs bg-base-100 border-primary text-primary hover:bg-base-200 hover:scale-105 duration-200'>{index+1}</a>
                    ))}
                </div> 
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
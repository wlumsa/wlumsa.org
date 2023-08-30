import { InstagramEmbed } from 'react-social-media-embed';
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import db from "../firebase";
interface InstagramPost {
    link:string;
  }
  

    
const News: React.FC = () => {
   
    return (
        <div id="news" className="flex flex-col px-0 py-10 justify-center items-start max-w-6xl bg-base-100">
            <h3 className="text-3xl text-center py-3 pb-4 font-bold text-primary">Latest News</h3>
            
            <div className="carousel rounded-box gap-2 shadow  py-3  w-[325px] xl:w-[1180px] lg:w-[924px]   md:w-[668px] sm:w-[540px] ">
                    
                
                <div className="carousel-item  rounded-xl ">
                    <InstagramEmbed url = "https://www.instagram.com/p/Cwic3VxgUf-/?img_index=1" height={425}    />
                </div>
                <div className="carousel-item  ">
                    <InstagramEmbed url = "https://www.instagram.com/p/CwfmiO5LqV2/?img_index=1" height={425}  />
                </div>
                <div className="carousel-item ">
                    <InstagramEmbed url = "https://www.instagram.com/p/CwLlT8zguAU/"  height={425}  />
                </div>
                <div className="carousel-item ">
                    <InstagramEmbed url = "https://www.instagram.com/p/CwG9eXrAIJF/?img_index=1"  height={425} />
                </div>
                <div className="carousel-item ">
                    <InstagramEmbed url = "https://www.instagram.com/p/CwDsQobgI3t/"  height={425} />
                </div>
                <div className="carousel-item ">
                    <InstagramEmbed url = "https://www.instagram.com/p/CvrmczbABNY/?img_index=1"  height={425} />
                </div>
                <div className="carousel-item ">
                    <InstagramEmbed url = "https://www.instagram.com/p/CvqNeEuguk2/"   height={425} />
                </div>
            </div>
        </div>
    );
}

export default News;

/*
 const [instagramPosts, setInstagramPosts] = useState<InstagramPost[]>([]);
  
    useEffect(() => {
      const fetchInstagramPosts = async () => {
        const instagramPostsCollectionRef = collection(db, "Posts");
        const querySnapshot = await getDocs(instagramPostsCollectionRef);
        
        const instagramPostsData = querySnapshot.docs.map(doc => doc.data() as InstagramPost);
        setInstagramPosts(instagramPostsData);
      };
  
      fetchInstagramPosts();
    }, []);
    */

/*
{instagramPosts.map((post, index) => (
                    <div id = {index.toString()}className="carousel-item  rounded-xl ">
                        <InstagramEmbed url = {post.link} height={425}    />
                    </div>
            ))}
            */
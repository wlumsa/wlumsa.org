import React, { useEffect, useState, useRef } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import db from "../firebase";
import { InstagramEmbed } from 'react-social-media-embed';

interface InstagramPost {
  link: string;
  date: Date;
}

const News: React.FC = () => {
    const [instagramPosts, setInstagramPosts] = useState<InstagramPost[]>([]);
    const pinnedPostsRef = useRef(null);
    const latestNewsRef = useRef(null);

    const pinnedPosts = [
        { link: "https://www.instagram.com/p/Cz2Ll19r4aD/?hl=en", date: new Date() },
        { link: "https://www.instagram.com/p/Czo5n_0pd5x/?hl=en&img_index=1", date: new Date() },
        { link: "https://www.instagram.com/p/CyPnU-RtXDz/?hl=en&img_index=1", date: new Date() },
    ];

    useEffect(() => {
        const fetchInstagramPosts = async () => {
            const instagramPostsCollectionRef = collection(db, "Posts");
            const postsQuery = query(instagramPostsCollectionRef, orderBy("date", "desc"));
            const querySnapshot = await getDocs(postsQuery);

            const instagramPostsData = querySnapshot.docs.map(doc => doc.data() as InstagramPost);
            setInstagramPosts(instagramPostsData);
        };

        fetchInstagramPosts();
    }, []);

    const scrollToPost = (ref, index, isPinnedPost) => {
        if (ref.current) {
            const selector = isPinnedPost ? `#pinnedItem${index+1}` : `#latestItem${index+1}`;
            const post = ref.current.querySelector(selector);
            if (post) {
                ref.current.scrollLeft = post.offsetLeft - ref.current.offsetLeft;
            }
        }
    };

    return (
        <div id="news" className="py-10 w-full bg-base-100 flex">
            {/* Pinned Posts Section */}
            <div className='w-1/2 px-4'>
                <h3 className="text-3xl text-center pb-4 font-bold text-primary">Pinned Posts</h3>
                <div ref={pinnedPostsRef} className="carousel rounded-box p-2 overflow-x-auto border-3 border-primary bg-primary">
                    {pinnedPosts.map((post, index) => (
                        <div key={index} id={`pinnedItem${index+1}`} className="carousel-item relative p-2">
                            <InstagramEmbed url={post.link} height={425} />
                        </div>
                    ))}
                </div>
                <div className='flex justify-center w-full pt-4 gap-2'>
                    {pinnedPosts.map((_, index) => (
                        <button onClick={() => scrollToPost(pinnedPostsRef, index, true)} className='btn btn-xs bg-primary border-primary text-base-100'>Pinned {index+1}</button>
                    ))}
                </div>
            </div>

            {/* Latest News Section */}
            <div className='w-1/2 px-4'>
                <h3 className="text-3xl text-center pb-4 font-bold text-primary">Latest News</h3>
                <div ref={latestNewsRef} className="carousel rounded-box p-2 bg-primary overflow-x-auto border-3 border-primary">
                    {instagramPosts.map((post, index) => (
                        <div key={index} id={`latestItem${index+1}`} className="carousel-item relative p-2">
                            <InstagramEmbed url={post.link} height={425} />
                        </div>
                    ))}
                </div>
                <div className='flex justify-center w-full pt-4 gap-2'>
                    {instagramPosts.map((_, index) => (
                        <button onClick={() => scrollToPost(latestNewsRef, index, false)} className='btn btn-xs bg-base-100 border-primary text-primary'>News {index+1}</button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default News;
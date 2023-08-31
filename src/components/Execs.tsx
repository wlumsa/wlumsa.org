import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import db, { storage } from "../firebase";
import Link from "next/link";
import { ref, getDownloadURL } from "firebase/storage";


/*
interface Events {
  day:string;
  desc:string;
  img: string;
  name:string;
  room:string;
  time:string;
}
*/

const Execs: React.FC = () => {
 
  
    return (
        <div className="flex flex-col px-6 py-10 justify-center items-start max-w-6xl bg-base-100">
        <h3 className="text-3xl text-center pb-4 font-bold text-primary">Latest News</h3>
        <div className="carousel rounded-box gap-2 shadow">
            <div className="carousel-item">
                <img className="w-72 md:w-[19rem] lg:w-80 rounded-xl" src="https://s3.amazonaws.com/www-inside-design/uploads/2020/10/aspect-ratios-blogpost-1x1-1-1024x1024.png" alt="Burger" />
            </div>
            <div className="carousel-item">
                <img className="w-72 md:w-[19rem] lg:w-80 rounded-xl" src="https://s3.amazonaws.com/www-inside-design/uploads/2020/10/aspect-ratios-blogpost-1x1-1-1024x1024.png" alt="Burger" />
            </div>
            <div className="carousel-item">
                <img className="w-72 md:w-[19rem] lg:w-80 rounded-xl" src="https://s3.amazonaws.com/www-inside-design/uploads/2020/10/aspect-ratios-blogpost-1x1-1-1024x1024.png" alt="Burger" />
            </div>
            <div className="carousel-item">
                <img className="w-72 md:w-[19rem] lg:w-80 rounded-xl" src="https://s3.amazonaws.com/www-inside-design/uploads/2020/10/aspect-ratios-blogpost-1x1-1-1024x1024.png" alt="Burger" />
            </div>
            <div className="carousel-item">
                <img className="w-72 md:w-[19rem] lg:w-80 rounded-xl" src="https://s3.amazonaws.com/www-inside-design/uploads/2020/10/aspect-ratios-blogpost-1x1-1-1024x1024.png" alt="Burger" />
            </div>
            <div className="carousel-item">
                <img className="w-72 md:w-[19rem] lg:w-80 rounded-xl" src="https://s3.amazonaws.com/www-inside-design/uploads/2020/10/aspect-ratios-blogpost-1x1-1-1024x1024.png" alt="Burger" />
            </div>
            <div className="carousel-item">
                <img className="w-72 md:w-[19rem] lg:w-80 rounded-xl" src="https://s3.amazonaws.com/www-inside-design/uploads/2020/10/aspect-ratios-blogpost-1x1-1-1024x1024.png" alt="Burger" />
            </div>
        </div>
    </div>
            
      
    );
}

export default Execs;

/*
 const [Events, setEvents] = useState<Events[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const eventsCollectionRef = collection(db, "WeeklyEvents");
      const querySnapshot = await getDocs(eventsCollectionRef);
      
      const EventsData = await Promise.all(querySnapshot.docs.map(async (doc) => {
        const eventData = doc.data() as Events;
        const imgURL = await getDownloadURL(ref(storage, eventData.img)); // Assuming eventData.icon is the path to the icon in Firebase Storage
        return {...eventData, img: imgURL };
      }));
      console.log(EventsData)
      setEvents(EventsData);
    };
    fetchEvents();
  }, []);

*/
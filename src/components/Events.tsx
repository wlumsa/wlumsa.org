import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import db, { storage } from "../firebase";
import Link from "next/link";
import { ref, getDownloadURL } from "firebase/storage";
import {Suspense} from "react"

interface Events {
  day:string;
  desc:string;
  img: string;
  name:string;
  room:string;
  time:string;
}


const Events: React.FC = () => {
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
      setEvents(EventsData);
    };
    fetchEvents();
  }, []);

  
    return (
        <div id="events">
          
          <Suspense fallback = {<p>Loading...</p>}>
          {Events.map((event, index) => (
            <div className="hero h-fit bg-base-100 px-6">
            <div className={`hero-content flex-col ${index%2===0 ? 'lg:flex-row':'lg:flex-row-reverse'} lg:gap-32`}>
                  
                    <img src={event.img} alt = "image" className="max-w-sm sm:max-w-md rounded-lg shadow-2xl" />
                    <div className="px-8 max-w-md lg:max-w-xl">
                        <h3 className="text-3xl text-center font-bold text-primary pt-4 lg:pt-0">{event.name}</h3>
                        <p className="py-6 text-neutral text-justify">{event.desc}</p>
                        <p className="font-bold text-neutral">{event.day} @ {event.time} in {event.room}</p>
                    </div>
                </div>
                </div>
              ))}
            </Suspense>
            </div>
            
      
    );
}

export default Events;
/*
{Events.map((social, index) => (
                <button key={index} className="btn btn-ghost text-base-100 border-0 hover:bg-transparent">
                  <Link href={social.link} target='_blank' rel='noopener noreferrer'>
                    <img className=" w-8 h-8 " src={social.icon}  alt={social.name}/>
                  </Link>  
                </button>
              ))}
              */
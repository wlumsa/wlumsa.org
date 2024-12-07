'use client'
import React from 'react'
import RecordingCard from './RecordingCard'
import { useState } from 'react'
import { useRef } from 'react'
import { current } from '@reduxjs/toolkit'
const recordings = [
    {
      videoId: "Esnqdy0rqiY",
      title: "Turret (Jumu'ah)",
      thumbnailUrl: "https://img.youtube.com/vi/Esnqdy0rqiY/sddefault.jpg",
    },
    {
      videoId: "Esnqdy0rqiY",
      title: "Turret (Jumu'ah)",
      thumbnailUrl: "https://img.youtube.com/vi/Esnqdy0rqiY/sddefault.jpg",
    },
    {
      videoId: "Esnqdy0rqiY",
      title: "Turret (Jumu'ah)",
      thumbnailUrl: "https://img.youtube.com/vi/Esnqdy0rqiY/sddefault.jpg",
    },
    {
      videoId: "Esnqdy0rqiY",
      title: "Turret (Jumu'ah)",
      thumbnailUrl: "https://img.youtube.com/vi/Esnqdy0rqiY/sddefault.jpg",
    }
  ]

const Carousel = () => {
    const carouselRef =  useRef<HTMLDivElement | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        if (carouselRef.current?.firstChild && currentIndex < recordings.length - 1) {
          const newIndex = currentIndex + 1;
          const childWidth = (carouselRef.current.firstElementChild as HTMLElement).offsetWidth;
          carouselRef.current.scrollTo({
            left: carouselRef.current.scrollLeft + childWidth,
            behavior: "smooth",
          });
          setCurrentIndex(newIndex);
        }
      };
  
    const handlePrev = () => {
        if (carouselRef.current && currentIndex > 0) {
          const newIndex = currentIndex - 1;
    
          const childWidth = (carouselRef.current.firstElementChild as HTMLElement).offsetWidth;
    
          carouselRef.current.scrollTo({
            left: carouselRef.current.scrollLeft - childWidth,
            behavior: "smooth",
          });
          setCurrentIndex(newIndex);
        }
      };
    
  return (
    <div className='flex flex-row items-center justify-center gap-4'>
            <button onClick={handlePrev} className="btn btn-circle btn-primary"  disabled={currentIndex === 0}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg></button>
        <div className="carousel relative h-96 gap-12 max-w-[22rem] overflow-x-auto rounded-box py-2 sm:max-w-[20rem] md:max-w-2xl lg:max-w-4xl xl:max-w-6xl"  ref={carouselRef}>
       
       { recordings.length > 0 && recordings.map((recording, index) => (
         <div className=" carousel-item w-[20rem] md:w-[24rem]" key={index}  id={`item${(index + 1).toString()}`}  >
           <RecordingCard  
           videoId={recording.videoId}
           title={recording.title}
           thumbnailUrl={recording.thumbnailUrl}
           />
         </div>
       ))}
        </div>
        <button onClick={handleNext} className="btn btn-circle btn-primary"   disabled={currentIndex === recordings.length - 1} ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg></button>

        
    </div>
  )
}

export default Carousel
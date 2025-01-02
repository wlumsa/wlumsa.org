'use client'
import React from 'react'
import { useState } from 'react'
import { useRef } from 'react'


interface Recording {
  title: string;
  src: string;
}
interface RecordingProps {
  recordings: Recording[];
}
const Carousel:React.FC<RecordingProps> = ({recordings} ) => {
    const carouselRef =  useRef<HTMLDivElement | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const length = recordings.length;

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
     <div className='flex flex-col md:flex-row items-center justify-center md:gap-4'>
        
          {length > 1 && <button onClick={handlePrev} className="btn btn-circle btn-primary  hidden md:flex justify-center items-center"  disabled={currentIndex === 0}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg></button>}
        <div className="carousel relative md:h-96 gap-12 max-w-[23rem] overflow-x-auto rounded-box py-2 sm:max-w-[20rem] md:max-w-2xl lg:max-w-4xl xl:max-w-6xl"  ref={carouselRef}>
            {recordings.map((recording, index) => (
              <div className='carousel-item  flex-col w-full md:w-[24rem] bg-primary md:p-2 rounded-xl flex justify-center items-center h-[270px] ' key={index}>
               <h1 className='text-white text-md font-semibold pb-2' >{recording.title}</h1> 
              <iframe  className=' w-80 h-60 md:w-[360px] md:h-[215px] ' src={recording.src} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>   
  
          </div>
          ))}
        </div>
       { length > 1 && <button onClick={handleNext} className="btn btn-circle btn-primary hidden md:flex justify-center items-center "   disabled={currentIndex === recordings.length - 1} ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg></button>}
        <div className=' flex-row flex md:hidden gap-8 py-4 '>
       { length > 1 && (
        <div className='flex flex-row gap-8'>
          <button onClick={handlePrev} className="btn btn-circle btn-primary  justify-center items-center"  disabled={currentIndex === 0}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg></button>
          <button onClick={handleNext} className="btn btn-circle btn-primary justify-center items-center"   disabled={currentIndex === recordings.length } ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg></button>
        </div>
       )}
        </div>

    </div> 
  )
}

export default Carousel
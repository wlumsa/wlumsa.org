"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";

interface Recording {
  title: string;
  src: string;
}

interface RecordingProps {
  recordings: Recording[];
}

// First Carousel Component (for recordings)
export const RecordingsCarousel: React.FC<RecordingProps> = ({ recordings }) => {
  const carouselRef = useRef<HTMLDivElement | null>(null);
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
    <div className="flex flex-col md:flex-row items-center justify-center md:gap-4">
      {length > 1 && (
        <button
          onClick={handlePrev}
          className="btn btn-circle btn-primary hidden md:flex justify-center items-center"
          disabled={currentIndex === 0}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
      )}
      <div
        className="carousel relative md:h-96 gap-12 max-w-[23rem] overflow-x-auto rounded-box py-2 sm:max-w-[20rem] md:max-w-2xl lg:max-w-4xl xl:max-w-6xl"
        ref={carouselRef}
      >
        {recordings.map((recording, index) => (
          <div
            className="carousel-item flex-col w-full md:w-[24rem] bg-primary md:p-2 rounded-xl flex justify-center items-center h-[270px]"
            key={index}
          >
            <h1 className="text-white text-md font-semibold pb-2">{recording.title}</h1>
            <iframe
              className="w-80 h-60 md:w-[360px] md:h-[215px]"
              src={recording.src}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        ))}
      </div>
      {length > 1 && (
        <button
          onClick={handleNext}
          className="btn btn-circle btn-primary hidden md:flex justify-center items-center"
          disabled={currentIndex === recordings.length - 1}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      )}
      <div className="flex-row flex md:hidden gap-8 py-4">
        {length > 1 && (
          <div className="flex flex-row gap-8">
            <button
              onClick={handlePrev}
              className="btn btn-circle btn-primary justify-center items-center"
              disabled={currentIndex === 0}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left">
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={handleNext}
              className="btn btn-circle btn-primary justify-center items-center"
              disabled={currentIndex === recordings.length - 1}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
// Define the Testimonial interface
interface Testimonial {
  name: string;
  role: string;
  quote: string;
}

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
}

export const Testimonials: React.FC<TestimonialsCarouselProps> = ({ testimonials }) => {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const length = testimonials.length;

  const handleNext = () => {
    if (carouselRef.current?.firstChild && currentIndex < length - 1) {
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
    <div>
      
    <div className="max-w-xl mx-auto relative">
      {/* Carousel Container */}
      <div className="carousel w-full overflow-x-auto scroll-smooth" ref={carouselRef}>
        {testimonials.map((testimonial, index) => (
          <div key={index} id={`item${index + 1}`} className="carousel-item w-full">
            <div className="p-2 pb-5 w-full">
              <div className="text-center w-full flex flex-col items-center">
                {/* Quote Text */}
                <div className="text-1xl font-semibold max-w-lg mx-auto px-10 text-center w-full">
                  {testimonial.quote}
                </div>

                {/* Company Logo or Avatar */}
               

                {/* Author Name */}
                <div className="text-1xl font-semibold my-2">{testimonial.name}</div>

                {/* Author Role */}
                <div className="mb-3">
                  <span className="text-sm text-themeDarkGray">{testimonial.role}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Numbered Navigation Buttons */}
      <div className="flex justify-center w-full py-2 gap-2">
        {testimonials.map((_, index) => (
          <a key={index} href={`#item${index + 1}`} className="btn btn-xs">
            {index + 1}
          </a>
        ))}
      </div>

      {/* Gradient Overlays */}
      <div className="pointer-events-none absolute inset-y-0 left-0 h-full w-2/12 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 h-full w-2/12 bg-gradient-to-l from-background"></div>

      {/* Next and Previous Buttons */}
      <div className="absolute max-w-xl flex justify-between transform -translate-y-1/2 left-2 right-2 top-1/2">
        <button
          onClick={handlePrev}
          className="btn btn-circle"
          disabled={currentIndex === 0}
        >
          ❮
        </button>
        <button
          onClick={handleNext}
          className="btn btn-circle"
          disabled={currentIndex === length - 1}
        >
          ❯
        </button>
      </div>
    </div>
  </div>
  );
};
"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";

// Define the Testimonial interface
interface Testimonial {
  name: string;
  role: string;
  quote: string;
}

// Define the props for DaisyUICarousel
interface DaisyUICarouselProps {
  testimonials: Testimonial[];
}

export const Testimonials: React.FC<DaisyUICarouselProps> = ({ testimonials }) => {
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
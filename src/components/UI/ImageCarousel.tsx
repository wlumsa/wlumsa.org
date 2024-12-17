'use client';
import React from 'react'
import { useState } from 'react';
import { CircleArrowLeft, CircleArrowRight } from 'lucide-react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
interface ImageCarouselProps {
  images: string[];
}


const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const imageCount = images.length;

  const handleNextImage = () => {
    if (currentIndex < imageCount - 1) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imageCount);
    }
  };
  const handlePrevImage = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => (prevIndex - 1) % imageCount);
    }
  };

  const getIndex = (index: number) => {
    setCurrentIndex(index);
  }

  return (
    <div>
      <div className='flex flex-row items-center'>
        {imageCount > 1 && <ChevronLeft size={32} color="#2e046d" onClick={handlePrevImage} className='cursor-pointer' />}
        {images.length > 0 && (
          <img
            src={images[currentIndex] ? images[currentIndex].toString() : ""}
            className="object-cover lg:rounded"
            style={{ height: "26em", width: "48em" }}
          />
        )}
        {(currentIndex <= imageCount - 1 && imageCount > 1) &&
          <ChevronRight size={32} color="#2e046d" onClick={handleNextImage} className='cursor-pointer' />

        }

      </div>
      {imageCount > 1 && <div className="flex w-full justify-center gap-2 pt-4">
        {Array.from({ length: imageCount }, (_, index) => (
          <button
            onClick={() => getIndex(index)}
            className={`btn btn-xs border-primary bg-base-100 text-primary duration-200 hover:scale-105 hover:bg-base-200 ${currentIndex === index ? 'bg-primary text-white' : ''}`}
            key={index}
          >
            {index + 1}
          </button>
        ))}
      </div>}
    </div>
  );
};

export default ImageCarousel;
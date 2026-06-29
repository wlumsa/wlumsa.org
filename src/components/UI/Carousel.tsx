"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

interface Recording {
  title: string;
  src: string;
}

interface RecordingProps {
  recordings: Recording[];
}

// First Carousel Component (for recordings)
export const RecordingsCarousel: React.FC<RecordingProps> = ({
  recordings,
}) => {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const length = recordings.length;

  const handleScroll = () => {
    const el = carouselRef.current;
    if (!el?.firstElementChild) return;
    const childWidth = (el.firstElementChild as HTMLElement).offsetWidth;
    if (!childWidth) return;
    const maxScrollLeft = Math.max(0, el.scrollWidth - el.clientWidth);
    const maxIndex = Math.max(0, recordings.length - 1);
    let nextIndex = Math.round(el.scrollLeft / childWidth);
    if (el.scrollLeft >= maxScrollLeft - 2) {
      nextIndex = maxIndex;
    }
    nextIndex = Math.min(maxIndex, Math.max(0, nextIndex));
    if (nextIndex !== currentIndex) {
      setCurrentIndex(nextIndex);
    }
  };

  const handleNext = () => {
    if (
      carouselRef.current?.firstChild &&
      currentIndex < recordings.length - 1
    ) {
      const newIndex = currentIndex + 1;
      const childWidth = (carouselRef.current.firstElementChild as HTMLElement)
        .offsetWidth;
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
      const childWidth = (carouselRef.current.firstElementChild as HTMLElement)
        .offsetWidth;
      carouselRef.current.scrollTo({
        left: carouselRef.current.scrollLeft - childWidth,
        behavior: "smooth",
      });
      setCurrentIndex(newIndex);
    }
  };
  const [activeIndices, setActiveIndices] = useState<Set<number>>(new Set());
  const activeVideo = (index: number) => {
    setActiveIndices((prev) => new Set(prev).add(index));
  };

  const getYouTubeId = (src: string): string => {
    try {
      const url = new URL(src);
      if (url.hostname.includes("youtu.be")) {
        return url.pathname.replace("/", "");
      }
      if (url.pathname.includes("/embed/")) {
        return url.pathname.split("/embed/")[1]?.split("/")[0] ?? "";
      }
      return url.searchParams.get("v") ?? "";
    } catch {
      return src.split("/embed/")[1]?.split("?")[0] ?? "";
    }
  };

  return (
    <div className="relative">
      <div
        className="carousel relative w-full gap-4 overflow-x-auto scroll-smooth py-1 md:gap-5"
        ref={carouselRef}
        onScroll={handleScroll}
      >
        {recordings.map((recording, index) => (
          <div
            className="carousel-item flex w-[min(100%,22rem)] shrink-0 flex-col overflow-hidden rounded-md border border-base-300 bg-base-100 shadow-sm md:w-[24rem]"
            key={index}
          >
            {activeIndices.has(index) ? (
              <iframe
                className="aspect-video w-full bg-black"
                src={`${recording.src}?autoplay=1`}
                title={recording.title || "WLU MSA recording"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            ) : (
              <button
                type="button"
                className="group relative aspect-video w-full overflow-hidden bg-base-300 text-left"
                onClick={() => activeVideo(index)}
                aria-label={`Play ${recording.title || "recording"}`}
              >
                <Image
                  src={`https://img.youtube.com/vi/${getYouTubeId(
                    recording.src
                  )}/hqdefault.jpg`}
                  alt={recording.title}
                  fill
                  sizes="(min-width: 768px) 24rem, 100vw"
                  className="object-cover transition duration-300 group-hover:scale-[1.03]"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent"
                  aria-hidden="true"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="grid h-14 w-14 place-items-center rounded-full bg-white/95 text-primary shadow-lg transition duration-200 group-hover:scale-105">
                    <Play
                      className="ml-0.5 h-6 w-6 fill-current"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </button>
            )}
            <div className="flex min-h-24 flex-col justify-between p-4">
              <h2 className="line-clamp-2 text-base font-semibold leading-6 text-base-content">
                {recording.title || "Untitled recording"}
              </h2>
              <p className="mt-3 text-xs font-medium uppercase tracking-wide text-base-content/45">
                WLU MSA recording
              </p>
            </div>
          </div>
        ))}
      </div>
      {length > 1 && (
        <div className="mt-5 flex items-center justify-between gap-4 border-t border-base-300 pt-4">
          <p className="text-sm text-base-content/55">
            {currentIndex + 1} of {length}
            <span className="md:hidden"> · Swipe to browse</span>
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              aria-label="Previous recordings"
              className="grid h-10 w-10 place-items-center rounded-md border border-base-300 bg-base-100 text-base-content transition-colors hover:border-primary/30 hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
              disabled={currentIndex === 0}
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next recordings"
              className="grid h-10 w-10 place-items-center rounded-md border border-base-300 bg-base-100 text-base-content transition-colors hover:border-primary/30 hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
              disabled={currentIndex === recordings.length - 1}
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
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

export const Testimonials: React.FC<TestimonialsCarouselProps> = ({
  testimonials,
}) => {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const length = testimonials.length;

  const handleNext = () => {
    if (carouselRef.current?.firstChild && currentIndex < length - 1) {
      const newIndex = currentIndex + 1;
      const childWidth = (carouselRef.current.firstElementChild as HTMLElement)
        .offsetWidth;
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
      const childWidth = (carouselRef.current.firstElementChild as HTMLElement)
        .offsetWidth;
      carouselRef.current.scrollTo({
        left: carouselRef.current.scrollLeft - childWidth,
        behavior: "smooth",
      });
      setCurrentIndex(newIndex);
    }
  };

  return (
    <div>
      <div className="relative mx-auto max-w-xl">
        {/* Carousel Container */}
        <div
          className="carousel w-full overflow-x-auto scroll-smooth"
          ref={carouselRef}
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              id={`item${index + 1}`}
              className="carousel-item w-full"
            >
              <div className="w-full p-2 pb-5">
                <div className="flex w-full flex-col items-center text-center">
                  {/* Quote Text */}
                  <div className="text-1xl mx-auto w-full max-w-lg px-10 text-center font-semibold">
                    {testimonial.quote}
                  </div>

                  {/* Company Logo or Avatar */}

                  {/* Author Name */}
                  <div className="text-1xl my-2 font-semibold">
                    {testimonial.name}
                  </div>

                  {/* Author Role */}
                  <div className="mb-3">
                    <span className="text-themeDarkGray text-sm">
                      {testimonial.role}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Numbered Navigation Buttons */}
        <div className="flex w-full justify-center gap-2 py-2">
          {testimonials.map((_, index) => (
            <a key={index} href={`#item${index + 1}`} className="btn btn-xs">
              {index + 1}
            </a>
          ))}
        </div>

        {/* Gradient Overlays */}
        <div className="from-background pointer-events-none absolute inset-y-0 left-0 h-full w-2/12 bg-gradient-to-r"></div>
        <div className="from-background pointer-events-none absolute inset-y-0 right-0 h-full w-2/12 bg-gradient-to-l"></div>

        {/* Next and Previous Buttons */}
        <div className="absolute left-2 right-2 top-1/2 flex max-w-xl -translate-y-1/2 transform justify-between">
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

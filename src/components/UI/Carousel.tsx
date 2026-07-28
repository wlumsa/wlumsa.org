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

"use client";
import React, { useState } from "react";

interface PrayerSpaceCardProps {
  videoId: string;
  title: string;
  thumbnailUrl: string;
}

/**
 * PrayerSpaceCard component represents a card that displays a prayer space video.
 *
 * @param videoId - The ID of the YouTube video.
 * @param title - The title of the video.
 * @param thumbnailUrl - The URL of the video thumbnail.
 */
const PrayerSpaceCard: React.FC<PrayerSpaceCardProps> = ({ videoId, title, thumbnailUrl }) => {
  const [isOpen, setIsOpen] = useState(false);

  /**
   * Toggles the visibility of the video popup.
   */
  const togglePopup = () => setIsOpen(!isOpen);

  return (
    <div className="card h-full w-full overflow-hidden bg-base-100 shadow-xl">
      <button type="button" onClick={togglePopup} className="relative block aspect-video w-full cursor-pointer overflow-hidden">
        <img
          src={thumbnailUrl}
          alt={title}
          className="h-full w-full object-cover transition duration-200 hover:scale-[1.02]"
        />
      </button>
      <div className="card-body p-4">
        <h2 className="card-title text-base md:text-lg">{title}</h2>
        <p className="text-sm text-base-content/70">Tap to open video directions</p>
      </div>

      {isOpen && (
        <div className="modal modal-open">
          <div className="modal-box relative max-w-3xl">
            <button
              type="button"
              className="btn btn-sm btn-circle absolute right-2 top-2"
              onClick={togglePopup}
              aria-label="Close video"
            >
              ✕
            </button>
            <iframe
              className="aspect-video w-full"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrayerSpaceCard;

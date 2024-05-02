"use client"
import React, { useState } from 'react';

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
    <div className="card w-54 md:w-96 bg-base-100 shadow-xl">
      <figure onClick={togglePopup} className="cursor-pointer">
        <img src={thumbnailUrl} alt={title} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
      </div>

      {isOpen && (
        <div className="modal modal-open">
          <div className="modal-box relative">
            <label
              className="btn btn-sm btn-circle absolute right-2 top-2"
              onClick={togglePopup}>✕</label>
            <iframe
              className="w-full h-96"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1`}
              title="YouTube video player"
              frameBorder="0"
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

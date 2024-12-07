"use client"
import React, { useState } from 'react';

interface PrayerSpaceCardProps {
  videoId: string;
  title: string;
  thumbnailUrl: string;
}

/**
 * RecordingCard component represents a card that displays a video.
 *
 * @param videoId - The ID of the YouTube video.
 * @param title - The title of the video.
 * @param thumbnailUrl - The URL of the video thumbnail.
 */
const RecordingCard: React.FC<PrayerSpaceCardProps> = ({ videoId, title, thumbnailUrl }) => {
  const [isOpen, setIsOpen] = useState(false);

  /**
   * Toggles the visibility of the video popup.
   */
  const togglePopup = () => setIsOpen(!isOpen);

  return (
    <div className="card w-54 h-80 md:w-96 bg-primary text-white shadow-xl text-center">
      <figure onClick={togglePopup} className="cursor-pointer">
        <img src={thumbnailUrl} alt={title} />
        {/* <button className="btn btn-primary bg-gray-900 absolute items-center rounded-full text-xl ">▶</button> */}
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
      </div>

      {isOpen && (
        <div className="modal modal-open">
          <div className="modal-box relative bg-primary">
            <label
              className="btn btn-sm btn-circle absolute right-2 top-2"
              onClick={togglePopup}>✕</label>
            <iframe
              className="w-full h-96"
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

export default RecordingCard;
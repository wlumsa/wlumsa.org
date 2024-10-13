// src/components/UI/RoommateCard.tsx
import React from "react";
import { RoommateProfile } from "@/lib/types"; // Adjust the path as necessary

interface RoommateCardProps {
  profile: RoommateProfile;
  imageUrls: { [key: string]: string };
}

const RoommateCard: React.FC<RoommateCardProps> = ({ profile, imageUrls }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full sm:w-1/2 lg:w-1/3 flex flex-col items-center">
      <div className="w-32 h-32 mx-auto rounded-full overflow-hidden">
        {profile.image_id && imageUrls[profile.image_id] ? (
          <img
            src={imageUrls[profile.image_id]}
            alt={profile.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <p className="text-gray-500">No Image Available</p>
        )}
      </div>

      <h2 className="text-xl font-bold mt-4">{profile.name}</h2>
      <p className="text-gray-600">Age: {profile.age}</p>
      <p className="text-gray-600">Gender: {profile.gender}</p>
      <p className="text-gray-600">Location: {profile.location}</p>
      <p className="text-gray-600">Rent: ${profile.rent}/month</p>
      <p className="text-center mt-2">{profile.bio}</p>

      <div className="flex flex-wrap justify-center mt-4">
        {profile.interests.map((interest) => (
          <span
            key={interest}
            className="bg-primary text-white px-2 py-1 rounded-full text-xs mx-1"
          >
            {interest}
          </span>
        ))}
      </div>

      <div className="mt-4 text-sm text-gray-500">
        <p>Study Area: {profile.studyArea}</p>
        <p>Bedtime: {profile.bedtime}</p>
        <p>Quiet Hours: {profile.quietHours}</p>
        <p>
          <strong>Food Preferences:</strong> {profile.foodPreferences}
        </p>
        <p>
          <strong>Cleaning Habits:</strong> {profile.cleaningHabits}
        </p>
      </div>

      <div className="flex mt-4 gap-4">
        {profile.socialLinks?.instagram && (
          <a
            href={profile.socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Instagram
          </a>
        )}
        {profile.socialLinks?.linkedin && (
          <a
            href={profile.socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            LinkedIn
          </a>
        )}
      </div>
    </div>
  );
};

export default RoommateCard;

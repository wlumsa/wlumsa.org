import React from "react";
import { RoommateProfile } from "@/lib/types";

interface RoommateCardProps {
  profile: RoommateProfile;
  imageUrls: { [key: string]: string };
}

const RoommateCard: React.FC<RoommateCardProps> = ({ profile, imageUrls }) => (
  <div className="bg-white shadow-lg rounded-lg p-6 w-full sm:w-1/2 lg:w-1/3">
    <div className="w-32 h-32 mx-auto rounded-full overflow-hidden">
      {profile.image_id && imageUrls[profile.image_id] ? (
        <img
          src={imageUrls[profile.image_id]}
          alt={profile.name}
          className="w-full h-full object-cover"
        />
      ) : (
        <p className="text-center text-gray-500">No Image</p>
      )}
    </div>
    <h2 className="text-xl font-bold mt-4 text-center">{profile.name}</h2>
    <p className="text-gray-600 text-center">Age: {profile.age}</p>
    <p className="text-gray-600 text-center">Gender: {profile.gender}</p>
    <p className="text-gray-600 text-center">Location: {profile.location}</p>
    <p className="text-gray-600 text-center">Rent: ${profile.rent}/month</p>
    <div className="flex flex-wrap justify-center mt-4">
      {profile.interests.map((interest, index) => (
        <span
          key={`${profile.id}-${index}`}
          className="bg-primary text-white px-2 py-1 rounded-full text-xs mx-1"
        >
          {interest}
        </span>
      ))}
    </div>
  </div>
);

export default RoommateCard;

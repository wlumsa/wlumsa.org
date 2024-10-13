import React from "react";
import { RoommateProfile } from "@/lib/types";

interface RoommateCardProps {
  profile: RoommateProfile;
  imageUrls: { [key: string]: string };
}

const RoommateCard: React.FC<RoommateCardProps> = ({ profile, imageUrls }) => (
  <div className="bg-white shadow-lg rounded-lg p-6">
    <img
      src={imageUrls[profile.image_id!] || "/default-avatar.png"}
      alt={profile.name}
      className="w-24 h-24 rounded-full mx-auto"
    />
    <h2 className="text-xl font-bold text-center mt-4">{profile.name}</h2>
    <p className="text-gray-500 text-center">{profile.location}</p>
  </div>
);

export default RoommateCard;

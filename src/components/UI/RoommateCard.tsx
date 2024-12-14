import React from "react";

interface RoommateProfile {
  id: number;
  name: string;
  age?: number;
  gender?: string;
  bio?: string;
  location?: string;
  interests?: string;
}

interface RoommateCardProps {
  profile: RoommateProfile;
  imageUrls: Record<string, string>; // for adding images later
}

const RoommateCard: React.FC<RoommateCardProps> = ({ profile }) => {
  return (
    <div className="card w-72 bg-white shadow-lg rounded-lg p-4">
      <h2 className="text-xl font-bold">{profile.name}</h2>
      <p>Age: {profile.age || "N/A"}</p>
      <p>Gender: {profile.gender || "N/A"}</p>
      <p>Location: {profile.location || "N/A"}</p>
      <p className="mt-2">{profile.bio || "No bio available"}</p>
      <p className="text-sm text-gray-500">
        Interests: {profile.interests || "None"}
      </p>
    </div>
  );
};

export default RoommateCard;

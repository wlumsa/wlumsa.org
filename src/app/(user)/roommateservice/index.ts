"use client";

import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/lib/supabaseClient";

// Define the structure for Roommate Profiles
interface RoommateProfile {
  id: string;
  name: string;
  age: number;
  gender: string;
  bio: string;
  location: string;
  image_id?: string;
  interests: string[];
  rent: number;
}

// Options for filter dropdowns
const genderOptions = ["All", "Male", "Female", "Other"];
const locationOptions = ["All Locations", "Downtown", "Suburb", "Campus"];
const rentOptions = ["All Ranges", "< $500", "$500 - $1000", "> $1000"];

export default function RoommateServicePage() {
  const [profiles, setProfiles] = useState<RoommateProfile[]>([]);
  const [imageUrls, setImageUrls] = useState<{ [key: string]: string }>({});
  const [selectedGender, setSelectedGender] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [selectedRent, setSelectedRent] = useState("All Ranges");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch roommate profiles from the database
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase.from("roommates").select("*");
        if (error) throw new Error(error.message);
        setProfiles(data);

        const imageResults = await fetchImages(data);
        setImageUrls(imageResults);
      } catch (error) {
        console.error("Error fetching profiles:", error);
        setProfiles([]);
      }
    };
    fetchData();
  }, []);

  // Fetch images associated with profiles
  const fetchImages = async (data: RoommateProfile[]) => {
    const imagePromises = data.map(async (profile) => {
      if (profile.image_id) {
        const image = await getImageByID(profile.image_id);
        if (image?.publicUrl) return { [profile.image_id]: image.publicUrl };
      }
      return { [profile.image_id || ""]: "" };
    });
    const imageResults = await Promise.all(imagePromises);
    return Object.assign({}, ...imageResults);
  };

  // Memoize filtered profiles for performance
  const filteredProfiles = useMemo(() => {
    return profiles
      .filter((profile) => {
        const matchesGender =
          selectedGender === "All" || profile.gender === selectedGender;
        const matchesLocation =
          selectedLocation === "All Locations" ||
          profile.location === selectedLocation;
        const matchesRent =
          selectedRent === "All Ranges" ||
          (selectedRent === "< $500" && profile.rent < 500) ||
          (selectedRent === "$500 - $1000" &&
            profile.rent >= 500 &&
            profile.rent <= 1000) ||
          (selectedRent === "> $1000" && profile.rent > 1000);
        const matchesSearch = profile.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        return matchesGender && matchesLocation && matchesRent && matchesSearch;
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [profiles, selectedGender, selectedLocation, selectedRent, searchQuery]);

  return (
    <div className="w-full flex flex-col items-center mt-20 px-4 sm:px-8">
      {/* Header */}
      <div className="text-center w-full mb-8">
        <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl text-gray-800">
          Find Your Perfect Roommate
        </h1>
        <p className="text-gray-500 mt-2 text-sm sm:text-md md:text-lg">
          {filteredProfiles.length} roommates available
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-md w-full mb-8">
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <input
            type="text"
            placeholder="Search by name"
            className="border rounded-lg p-3 sm:p-4 w-full sm:w-80"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {renderDropdown(genderOptions, selectedGender, setSelectedGender)}
          {renderDropdown(locationOptions, selectedLocation, setSelectedLocation)}
          {renderDropdown(rentOptions, selectedRent, setSelectedRent)}
        </div>
      </div>

      {/* Profiles */}
      <div className="flex flex-wrap justify-center w-full space-y-6">
        {filteredProfiles.length > 0 ? (
          filteredProfiles.map((profile) => (
            <ProfileCard key={profile.id} profile={profile} imageUrls={imageUrls} />
          ))
        ) : (
          <p className="text-gray-600">No roommates found matching your criteria.</p>
        )}
      </div>
    </div>
  );
}

// Reusable Dropdown Component
const renderDropdown = (
  options: string[],
  selectedValue: string,
  onChange: (value: string) => void
) => (
  <select
    value={selectedValue}
    onChange={(e) => onChange(e.target.value)}
    className="border rounded-lg p-3 sm:w-56"
  >
    {options.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ))}
  </select>
);

// Profile Card Component
const ProfileCard = ({
  profile,
  imageUrls,
}: {
  profile: RoommateProfile;
  imageUrls: { [key: string]: string };
}) => (
  <div className="bg-white shadow-lg rounded-lg p-6 w-full sm:w-1/2 lg:w-1/3 flex flex-col items-center">
    <div className="w-32 h-32 rounded-full overflow-hidden">
      {profile.image_id && imageUrls[profile.image_id] ? (
        <img
          src={imageUrls[profile.image_id]}
          alt={profile.name}
          className="w-full h-full object-cover"
        />
      ) : (
        <p className="text-gray-500">No Image</p>
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
  </div>
);

// Fetch image by ID
async function getImageByID(id: string) {
  try {
    const { data: filename, error } = await supabase
      .from("media")
      .select("filename")
      .eq("id", id)
      .single();
    if (error) throw error;

    const path = `media/${filename.filename}`;
    const { data } = supabase.storage
      .from(process.env.NEXT_PUBLIC_S3_BUCKET || "default_bucket")
      .getPublicUrl(path);
    return data;
  } catch (error) {
    console.error("Error fetching image:", error);
    return "";
  }
}

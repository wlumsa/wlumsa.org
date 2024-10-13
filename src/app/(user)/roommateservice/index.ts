"use client";

import React, { useState, useEffect, useMemo } from "react";
import { supabase } from "@/lib/supabaseClient";
import RoommateCard from "@/components/UI/RoommateCard";
import { RoommateProfile } from "@/lib/types";

/**
 * Roommate Service Page
 */
export default function RoommateServicePage() {
  const [profiles, setProfiles] = useState<RoommateProfile[]>([]);
  const [imageUrls, setImageUrls] = useState<{ [key: string]: string }>({});
  const [selectedGender, setSelectedGender] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [selectedRent, setSelectedRent] = useState("All Ranges");
  const [searchQuery, setSearchQuery] = useState("");

  const genderOptions = ["All", "Male", "Female", "Other"];
  const locationOptions = ["All Locations", "Downtown", "Suburb", "Campus"];
  const rentOptions = ["All Ranges", "< $500", "$500 - $700", "$700 - $900", "> $1000"];

  // Fetch roommate profiles when the component mounts
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const { data, error } = await supabase.from("roommates").select("*");
        if (error) throw error;
        if (data) setProfiles(data);

        const images = await fetchImages(data || []);
        setImageUrls(images);
      } catch (error) {
        console.error("Error fetching profiles:", error);
      }
    };
    fetchProfiles();
  }, []);

  // Fetch images by profile IDs
  const fetchImages = async (profiles: RoommateProfile[]) => {
    const imagePromises = profiles.map(async (profile) => {
      if (profile.image_id) {
        const image = await getImageByID(profile.image_id);
        return { [profile.image_id]: image?.publicUrl || "" };
      }
      return {};
    });

    const imageResults = await Promise.all(imagePromises);
    return Object.assign({}, ...imageResults);
  };

  // Memoized filtered profiles for performance optimization
  const filteredProfiles = useMemo(() => {
    return profiles
      .filter((profile) => {
        const matchesGender = selectedGender === "All" || profile.gender === selectedGender;
        const matchesLocation =
          selectedLocation === "All Locations" || profile.location === selectedLocation;
        const matchesRent =
          selectedRent === "All Ranges" ||
          (selectedRent === "< $500" && profile.rent < 500) ||
          (selectedRent === "$500 - $700" && profile.rent >= 500 && profile.rent <= 700) ||
          (selectedRent === "$700 - $900" && profile.rent > 700 && profile.rent <= 900) ||
          (selectedRent === "> $1000" && profile.rent > 1000);
        const matchesSearch = profile.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

        return matchesGender && matchesLocation && matchesRent && matchesSearch;
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [profiles, selectedGender, selectedLocation, selectedRent, searchQuery]);

  return (
    <div className="flex-grow px-4 py-10">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Find Your Perfect Roommate</h1>
        <p className="text-gray-600 mt-2">{filteredProfiles.length} roommates available</p>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="flex flex-wrap justify-center gap-4">
          {renderDropdown("Gender", genderOptions, selectedGender, setSelectedGender)}
          {renderDropdown("Location", locationOptions, selectedLocation, setSelectedLocation)}
          {renderDropdown("Rent", rentOptions, selectedRent, setSelectedRent)}
          <input
            type="text"
            placeholder="Search by name"
            className="border rounded-lg p-3 w-full sm:w-64"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Roommate Profiles */}
      <div className="flex flex-wrap justify-center gap-6">
        {filteredProfiles.length > 0 ? (
          filteredProfiles.map((profile) => (
            <RoommateCard key={profile.id} profile={profile} imageUrls={imageUrls} />
          ))
        ) : (
          <p className="text-gray-600">
            No roommates found matching your criteria. Try expanding your filters! 🤷‍♂️
          </p>
        )}
      </div>

      {/* Google Calendar Button */}
      <div className="text-center mt-8">
        <a
          href="https://calendar.google.com/calendar/u/0/r"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="btn bg-primary text-white hover:bg-secondary hover:text-primary px-10">
            Add Roommate Meetup to Calendar
          </button>
        </a>
      </div>
    </div>
  );
}

// Reusable Dropdown Component
const renderDropdown = (
  label: string,
  options: string[],
  selectedValue: string,
  onChange: (value: string) => void
) => (
  <div className="flex flex-col items-center">
    <label className="font-semibold">{label}</label>
    <select
      value={selectedValue}
      onChange={(e) => onChange(e.target.value)}
      className="border rounded-lg p-2 w-56"
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

// Fetch image by ID from Supabase storage
async function getImageByID(id: string) {
  try {
    const { data, error } = await supabase
      .from("media")
      .select("filename")
      .eq("id", id)
      .single();
    if (error) throw error;

    const path = `media/${data?.filename}`;
    const { data: urlData } = supabase.storage
      .from(process.env.NEXT_PUBLIC_S3_BUCKET || "default_bucket")
      .getPublicUrl(path);
    return urlData;
  } catch (error) {
    console.error("Error fetching image:", error);
    return { publicUrl: "" };
  }
}

"use client";

import React, { useState, useEffect, useMemo } from "react";
import { supabase } from "@/lib/supabaseClient";
import RoommateCard from "@/components/UI/RoommateCard";

/**
 * Renders the Roommate Service Page component.
 * @returns The rendered Roommate Service page component.
 */
export default async function RoommateServicePage() {
  const [profiles, setProfiles] = useState<RoommateProfile[]>([]);
  const [imageUrls, setImageUrls] = useState<{ [key: string]: string }>({});
  const [selectedGender, setSelectedGender] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [selectedRent, setSelectedRent] = useState("All Ranges");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch roommate profiles from Supabase
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase.from("roommates").select("*");
        if (error) throw new Error(error.message);
        setProfiles(data || []);
        const imageResults = await fetchImages(data || []);
        setImageUrls(imageResults);
      } catch (error) {
        console.error("Error fetching profiles:", error);
      }
    };
    fetchData();
  }, []);

  // Fetch images associated with profiles
  const fetchImages = async (data: RoommateProfile[]) => {
    const imagePromises = data.map(async (profile) => {
      if (profile.image_id) {
        const image = await getImageByID(profile.image_id);
        return { [profile.image_id]: image?.publicUrl || "" };
      }
      return {};
    });
    const imageResults = await Promise.all(imagePromises);
    return Object.assign({}, ...imageResults);
  };

  // Memoized filtered profiles for performance
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
    <div className="flex-grow">
      {/* Header */}
      <div className="text-center py-10">
        <h1 className="text-4xl font-bold text-gray-800">
          Find Your Perfect Roommate
        </h1>
        <p className="text-gray-600 mt-2">
          {filteredProfiles.length} roommates available
        </p>
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

      {/* Profiles */}
      <div className="flex flex-wrap justify-center gap-6">
        {filteredProfiles.length > 0 ? (
          filteredProfiles.map((profile) => (
            <RoommateCard key={profile.id} profile={profile} imageUrls={imageUrls} />
          ))
        ) : (
          <p className="text-gray-600">No roommates found matching your criteria.</p>
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

// Fetch image by ID
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

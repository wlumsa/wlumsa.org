"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useSearchParams } from "next/navigation";
import SearchBar from "@/components/UI/SearchBar";

// Define the structure for Roommate Finder data
interface RoommateData {
  id: string;
  name: string;
  age: number;
  gender: string;
  campusLocation: string;
  is_on_campus: boolean;
  budget_range: string;
  description: string;
  amenities: string[];
  contact_email: string;
}

// Options for filtering
const campusOptions = ["All Locations", "On Campus", "Off Campus"];
const genderOptions = ["Any", "Brother", "Sister"];
const budgetOptions = ["All Budgets", "$500-$750", "$750-$1000", "$1000+"];
const amenitiesOptions = [
  "WiFi",
  "Parking",
  "Gym",
  "Laundry",
  "Air Conditioning",
  "Private Bathroom",
  "Kitchen Access",
];

export default function RoommateFinderPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  // State variables for storing roommate data and filters
  const [roommateData, setRoommateData] = useState<RoommateData[]>([]);
  const [selectedCampus, setSelectedCampus] = useState<string>("All Locations");
  const [selectedGender, setSelectedGender] = useState<string>("Any");
  const [selectedBudget, setSelectedBudget] = useState<string>("All Budgets");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  // Fetch data from Supabase when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase.from("roommate_finder").select("*");
        if (error) throw new Error(error.message);

        setRoommateData(data);
      } catch (error) {
        console.error("Error fetching Roommate Finder data:", error);
        setRoommateData([]);
      }
    };

    fetchData();
  }, []);

  // Filter data based on user-selected criteria
  const filterData = () => {
    return roommateData
      .filter((item) => {
        const matchesCampus =
          selectedCampus === "All Locations" ||
          String(item.is_on_campus) === (selectedCampus === "On Campus" ? "true" : "false");
        const matchesGender = selectedGender === "Any" || item.gender.toLowerCase() === selectedGender.toLowerCase();
        const matchesBudget = selectedBudget === "All Budgets" || item.budget_range === selectedBudget;
        const matchesSearch = item.name?.toLowerCase().includes(query.toLowerCase());

        // Filter for selected amenities
        const matchesAmenities =
          selectedAmenities.length === 0 || selectedAmenities.every((amenity) => item.amenities.includes(amenity));

        return matchesCampus && matchesGender && matchesBudget && matchesSearch && matchesAmenities;
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  };

  return (
    <div className="w-full flex flex-col items-center mt-20 px-4 sm:px-8 bg-base-100 text-neutral">
      {/* Header Section */}
      <div className="text-center w-full mb-8">
        <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl text-primary">Find Your Perfect Roommate</h1>
        <p className="text-gray-500 mt-2 text-sm sm:text-md md:text-lg">
          {filterData().length} potential roommates found
        </p>
        <p className="text-gray-600 mt-4 text-sm sm:text-md md:text-lg">
          Looking to find accommodation in Waterloo? Trying to lease your apartment? 
          Whatever the case, check out our directory of postings!
        </p>
      </div>

      {/* Filter Section */}
      <div className="bg-white p-4 rounded-lg shadow-md w-full mb-8">
        <SearchBar />

        <div className="flex flex-col sm:flex-row flex-wrap justify-center w-full space-y-4 sm:space-y-0 sm:space-x-4 mt-4">
          <select
            value={selectedCampus}
            onChange={(e) => setSelectedCampus(e.target.value)}
            className="border border-neutral rounded-lg p-3 sm:p-4 w-full sm:w-48 text-sm sm:text-md focus:ring-2 focus:ring-primary transition"
          >
            {campusOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>

          <select
            value={selectedGender}
            onChange={(e) => setSelectedGender(e.target.value)}
            className="border border-neutral rounded-lg p-3 sm:p-4 w-full sm:w-48 text-sm sm:text-md focus:ring-2 focus:ring-primary transition"
          >
            {genderOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>

          <select
            value={selectedBudget}
            onChange={(e) => setSelectedBudget(e.target.value)}
            className="border border-neutral rounded-lg p-3 sm:p-4 w-full sm:w-48 text-sm sm:text-md focus:ring-2 focus:ring-primary transition"
          >
            {budgetOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>

          <select
            value={selectedAmenities[0] || "All Amenities"}
            onChange={(e) => setSelectedAmenities([e.target.value])}
            className="border border-neutral rounded-lg p-3 sm:p-4 w-full sm:w-48 text-sm sm:text-md focus:ring-2 focus:ring-primary transition"
          >
            <option value="All Amenities">All Amenities</option>
            {amenitiesOptions.map((amenity, index) => (
              <option key={index} value={amenity}>
                {amenity}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Listings Section */}
      <div className="flex flex-col w-full">
        {filterData().length > 0 ? (
          filterData().map((item) => (
            <div
              key={item.id}
              className="bg-base-100 border border-neutral mb-6 shadow-lg rounded-lg p-4 sm:p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <h2 className="text-lg sm:text-xl font-bold text-primary mb-1">{item.name}</h2>
              <p className="text-neutral mb-2 text-sm sm:text-md">{item.description}</p>
              <p className="text-neutral text-sm">
                <strong>Gender:</strong> {item.gender}
              </p>
              <p className="text-neutral text-sm">
                <strong>Budget Range:</strong> {item.budget_range}
              </p>
              <p className="text-neutral text-sm">
                <strong>Location:</strong> {item.campusLocation}
              </p>
              <p className="text-neutral text-sm">
                <strong>Amenities:</strong> {item.amenities.join(", ")}
              </p>
              <a
                href={`mailto:${item.contact_email}`}
                className="text-primary hover:text-secondary hover:underline text-sm font-medium"
              >
                Contact {item.name}
              </a>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No roommates found matching the selected filters.</p>
        )}
      </div>
    </div>
  );
}

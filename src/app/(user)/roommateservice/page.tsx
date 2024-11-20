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
  proximity_to_campus: string;
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
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch data from Supabase when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase.from("roommate_finder").select("*");
        if (error) throw new Error(error.message);

        setRoommateData(data);
      } catch (error) {
        console.error("Error fetching Roommate Finder data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter data based on user-selected criteria
  const filterData = () => {
    let filtered = [...roommateData];
    if (selectedCampus !== "All Locations") {
      filtered = filtered.filter((item) =>
        String(item.is_on_campus) === (selectedCampus === "On Campus" ? "true" : "false")
      );
    }
    if (selectedGender !== "Any") {
      filtered = filtered.filter((item) => item.gender.toLowerCase() === selectedGender.toLowerCase());
    }
    if (selectedBudget !== "All Budgets") {
      filtered = filtered.filter((item) => item.budget_range === selectedBudget);
    }
    if (query) {
      filtered = filtered.filter((item) => item.name?.toLowerCase().includes(query.toLowerCase()));
    }
    if (selectedAmenities.length > 0) {
      filtered = filtered.filter((item) =>
        selectedAmenities.every((amenity) => item.amenities.includes(amenity))
      );
    }
    return filtered.sort((a, b) => a.name.localeCompare(b.name));
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
          Looking to find accommodation in Waterloo? Trying to lease your apartment? Whatever the case, check out our
          directory of postings!
        </p>
      </div>

      {/* Filter Section */}
      <div className="bg-white p-6 rounded-lg shadow-md w-full mb-8">
        <SearchBar />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {/* Campus Filter */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-600 mb-2">Location</label>
            <select
              value={selectedCampus}
              onChange={(e) => setSelectedCampus(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary hover:shadow-md transition-shadow"
            >
              {campusOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* Gender Filter */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-600 mb-2">Gender</label>
            <select
              value={selectedGender}
              onChange={(e) => setSelectedGender(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary hover:shadow-md transition-shadow"
            >
              {genderOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* Budget Filter */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-600 mb-2">Budget</label>
            <select
              value={selectedBudget}
              onChange={(e) => setSelectedBudget(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary hover:shadow-md transition-shadow"
            >
              {budgetOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* Amenities Filter */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-600 mb-2">Amenities</label>
            <div className="border border-gray-300 rounded-lg p-3">
              {amenitiesOptions.map((amenity, index) => (
                <label key={index} className="flex items-center space-x-2 mb-2">
                  <input
                    type="checkbox"
                    value={amenity}
                    checked={selectedAmenities.includes(amenity)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedAmenities([...selectedAmenities, amenity]);
                      } else {
                        setSelectedAmenities(selectedAmenities.filter((a) => a !== amenity));
                      }
                    }}
                    className="form-checkbox text-primary focus:ring-primary"
                  />
                  <span className="text-sm">{amenity}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Clear All Filters Button */}
        <button
          onClick={() => {
            setSelectedCampus("All Locations");
            setSelectedGender("Any");
            setSelectedBudget("All Budgets");
            setSelectedAmenities([]);
          }}
          className="bg-gray-200 text-sm px-4 py-2 rounded-lg hover:bg-gray-300 transition mt-4"
        >
          Clear All Filters
        </button>
      </div>

      {/* Listings Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : filterData().length > 0 ? (
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
                <strong>Location:</strong> {item.proximity_to_campus}
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

// HalalFoodClient.tsx — Improved UI/UX with Integrated Map
"use client";

import { useState, useMemo } from "react";
import { HalalDirectory } from "@/payload-types";
import SearchBar from "@/components/UI/SearchBar";
import { useSearchParams } from "next/navigation";
import {
  MapPin,
  Utensils,
  Hand,
  ChevronDown,
  ChevronUp,
  X,
  Filter,
} from "lucide-react";

// ------------------
// Filter Options
// ------------------
const cuisineOptions = [
  "All Cuisines",
  "Chinese",
  "Persian",
  "Shawarma",
  "Burgers",
  "Bangladeshi",
  "Chinese-Indo-Fusion",
  "Pakistani-Food",
  "Chicken-and-Waffles",
  "Kabob",
  "Uyghur",
  "Chicken",
  "Indian-Fusion-Food",
  "Pizza",
];

const slaughterMethodOptions = ["All Methods", "Hand", "Machine", "Both", "N/A"];

interface FilterComponentProps {
  halalDirectory: HalalDirectory[];
}

const HalalFoodClient: React.FC<FilterComponentProps> = ({ halalDirectory }) => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  // ------------------
  // UI State
  // ------------------
  const [selectedCuisine, setSelectedCuisine] = useState("All Cuisines");
  const [selectedMethod, setSelectedMethod] = useState("All Methods");
  const [selectedCampusLocation, setSelectedCampusLocation] = useState("All Locations");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // ------------------
  // Filter Utilities
  // ------------------
  const clearFilter = (filterType: string) => {
    if (filterType === "cuisine") setSelectedCuisine("All Cuisines");
    if (filterType === "method") setSelectedMethod("All Methods");
    if (filterType === "location") setSelectedCampusLocation("All Locations");
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setSelectedCuisine("All Cuisines");
    setSelectedMethod("All Methods");
    setSelectedCampusLocation("All Locations");
    setCurrentPage(1);
  };

  // ------------------
  // Filter & Pagination Logic
  // ------------------
  const filteredData = useMemo(() => {
    return halalDirectory
      .filter((item) => {
        const matchesCategory =
          selectedCuisine === "All Cuisines" || item.category?.toLowerCase() === selectedCuisine.toLowerCase();
        const matchesMethod =
          selectedMethod === "All Methods" || item.slaughtered?.toLowerCase() === selectedMethod.toLowerCase();
        const matchesSearch = item.name?.toLowerCase().includes(query.toLowerCase());
        const matchesLocation =
          selectedCampusLocation === "All Locations" || String(item.is_on_campus) === selectedCampusLocation;
        return matchesCategory && matchesMethod && matchesSearch && matchesLocation;
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [halalDirectory, selectedCuisine, selectedMethod, selectedCampusLocation, query]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [filteredData, currentPage]);

  // ------------------
  // Render UI
  // ------------------
  return (
    <div className="w-full flex flex-col items-center pt-24 px-4 sm:px-8 bg-white text-neutral">

      {/* Page Header */}
      <div className="text-center w-full mb-6">
      <h1 className="font-bold text-3xl sm:text-4xl text-primary">Halal Eats Near You 🍽️</h1>
        <p className="text-gray-500 mt-2 text-sm sm:text-md">{filteredData.length} halal spots found</p>
      </div>

      {/* Filter Panel */}
      <div className="w-full max-w-6xl bg-gray-50 border border-gray-200 rounded-xl p-4 shadow mb-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center font-medium text-primary hover:text-primary-dark"
          >
            <Filter className="mr-2" size={18} />
            {showFilters ? "Hide Filters" : "Show Filters"}
            {showFilters ? <ChevronUp className="ml-2" size={18} /> : <ChevronDown className="ml-2" size={18} />}
          </button>
          <button onClick={clearAllFilters} className="text-sm text-red-500 hover:underline">
            Clear All
          </button>
        </div>

        {/* Filter Options */}
        {showFilters && (
          <div className="mt-4 space-y-4">
            <SearchBar />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {/* Cuisine Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Cuisine</label>
                <div className="flex items-center border rounded-lg overflow-hidden">
                  <Utensils className="ml-3 text-gray-400" size={18} />
                  <select
                    value={selectedCuisine}
                    onChange={(e) => setSelectedCuisine(e.target.value)}
                    className="w-full p-2 pl-2 text-sm bg-white border-none focus:ring-0"
                  >
                    {cuisineOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Method Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Slaughter Method</label>
                <div className="flex items-center border rounded-lg overflow-hidden">
                  <Hand className="ml-3 text-gray-400" size={18} />
                  <select
                    value={selectedMethod}
                    onChange={(e) => setSelectedMethod(e.target.value)}
                    className="w-full p-2 pl-2 text-sm bg-white border-none focus:ring-0"
                  >
                    {slaughterMethodOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Location Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Campus Location</label>
                <div className="flex items-center border rounded-lg overflow-hidden">
                  <MapPin className="ml-3 text-gray-400" size={18} />
                  <select
                    value={selectedCampusLocation}
                    onChange={(e) => setSelectedCampusLocation(e.target.value)}
                    className="w-full p-2 pl-2 text-sm bg-white border-none focus:ring-0"
                  >
                    <option value="All Locations">All Locations</option>
                    <option value="true">On Campus</option>
                    <option value="false">Off Campus</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Active Filter Tags */}
      <div className="w-full max-w-6xl flex flex-wrap gap-2 mb-6">
        {selectedCuisine !== "All Cuisines" && (
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center">
            {selectedCuisine}
            <X className="ml-2 cursor-pointer" size={14} onClick={() => clearFilter("cuisine")} />
          </span>
        )}
        {selectedMethod !== "All Methods" && (
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center">
            {selectedMethod}
            <X className="ml-2 cursor-pointer" size={14} onClick={() => clearFilter("method")} />
          </span>
        )}
        {selectedCampusLocation !== "All Locations" && (
          <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm flex items-center">
            {selectedCampusLocation === "true" ? "On Campus" : "Off Campus"}
            <X className="ml-2 cursor-pointer" size={14} onClick={() => clearFilter("location")} />
          </span>
        )}
      </div>

      {/* Restaurant List & Map Section */}
      <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-6">

        {/* Listings Section */}
        <div className="w-full lg:w-2/3">
          {paginatedData.length > 0 ? (
            paginatedData.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow mb-6 p-6 flex flex-col sm:flex-row gap-4 hover:shadow-lg transition"
              >
                <div className="w-full sm:w-48 h-48 bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center">
                  {item.image && typeof item.image !== "number" && item.image.url ? (
                    <img
                      src={item.image.url}
                      alt={item.image.alt}
                      className="object-cover w-full h-full hover:scale-105 transition"
                    />
                  ) : (
                    <span className="text-gray-400">No Image</span>
                  )}
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-primary mb-1">{item.name}</h2>
                    <p className="text-sm text-gray-600 mb-2">{item.shortDescription}</p>
                    <div className="text-sm text-gray-500 space-y-1">
                      <p><strong>Category:</strong> {item.category}</p>
                      <p><strong>Slaughter Method:</strong> {item.slaughtered}</p>
                      <p><strong>Location:</strong> {item.location}</p>
                    </div>
                  </div>
                  <div className="flex gap-4 mt-4">
                    <a
                      href={item.googleMapsLink}
                      target="_blank"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Google Maps
                    </a>
                    {item.website && (
                      <a
                        href={item.website}
                        target="_blank"
                        className="text-sm bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark"
                      >
                        Book Now
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16 text-gray-500">
              <p>No results match your filters.</p>
              <button
                onClick={clearAllFilters}
                className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
              >
                Reset Filters
              </button>
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-primary text-white rounded disabled:bg-gray-300"
              >
                Prev
              </button>
              <span className="text-sm text-gray-600">Page {currentPage} of {totalPages}</span>
              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-primary text-white rounded disabled:bg-gray-300"
              >
                Next
              </button>
            </div>
          )}
        </div>

        {/* Embedded Map */}
        <div className="w-full lg:w-1/3 h-[400px] lg:sticky top-24 rounded-xl overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/d/embed?mid=1uQfQqV85aYaziCWMs996FZOPkyIKvAw&usp=sharing"
            width="100%"
            height="100%"
            allowFullScreen
            loading="lazy"
            className="w-full h-full border-0"
          ></iframe>
          <div className="text-center mt-2">
            <a
              href="https://www.google.com/maps/d/u/0/viewer?mid=1uQfQqV85aYaziCWMs996FZOPkyIKvAw"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline text-sm"
            >
              View Full Map
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HalalFoodClient;

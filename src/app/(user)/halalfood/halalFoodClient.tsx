"use client";

import { useState, useMemo, useEffect } from "react";
import { HalalDirectory } from "@/payload-types";
import SearchBar from "@/components/UI/SearchBar";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { useTheme } from "../themeprovider";
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
  const { theme } = useTheme();
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  const [selectedCuisine, setSelectedCuisine] = useState("All Cuisines");
  const [selectedMethod, setSelectedMethod] = useState("All Methods");
  const [selectedCampusLocation, setSelectedCampusLocation] = useState("All Locations");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showMap, setShowMap] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const itemsPerPage = 10;

  // Scroll to top visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to map when toggled
  useEffect(() => {
    if (showMap) {
      const timeout = setTimeout(() => {
        const mapSection = document.getElementById("map-section");
        mapSection?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 200);
      return () => clearTimeout(timeout);
    }
  }, [showMap]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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

  return (
    <div className="w-full flex flex-col items-center pt-24 px-4 sm:px-8 bg-base-100 text-base-content min-h-screen">

      {/* Page Header */}
      <div className="text-center w-full mb-6">
        <h1 className="font-bold text-3xl sm:text-4xl text-primary">Halal Eats Near You 🍽️</h1>
        <p className="text-base-content/70 mt-2 text-sm sm:text-md">{filteredData.length} halal spots found</p>
      </div>

      {/* Filter Panel */}
      <div className="w-full max-w-6xl bg-base-200 border border-base-300 rounded-xl p-4 shadow mb-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center font-medium text-primary hover:text-primary/80 transition-colors"
          >
            <Filter className="mr-2" size={18} />
            {showFilters ? "Hide Filters" : "Show Filters"}
            {showFilters ? <ChevronUp className="ml-2" size={18} /> : <ChevronDown className="ml-2" size={18} />}
          </button>
          <button onClick={clearAllFilters} className="text-sm text-error hover:underline">
            Clear All
          </button>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="mt-4 space-y-4">
            <SearchBar />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {/* Cuisine Filter */}
              <div>
                <label className="block text-sm font-medium text-base-content/80 mb-1">Cuisine</label>
                <div className="flex items-center border border-base-300 rounded-lg overflow-hidden bg-base-100">
                  <Utensils className="ml-3 text-base-content/50" size={18} />
                  <select
                    value={selectedCuisine}
                    onChange={(e) => setSelectedCuisine(e.target.value)}
                    className="w-full p-2 pl-2 text-sm bg-base-100 border-none focus:ring-0 text-base-content"
                  >
                    {cuisineOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Method Filter */}
              <div>
                <label className="block text-sm font-medium text-base-content/80 mb-1">Slaughter Method</label>
                <div className="flex items-center border border-base-300 rounded-lg overflow-hidden bg-base-100">
                  <Hand className="ml-3 text-base-content/50" size={18} />
                  <select
                    value={selectedMethod}
                    onChange={(e) => setSelectedMethod(e.target.value)}
                    className="w-full p-2 pl-2 text-sm bg-base-100 border-none focus:ring-0 text-base-content"
                  >
                    {slaughterMethodOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Campus Filter */}
              <div>
                <label className="block text-sm font-medium text-base-content/80 mb-1">Campus Location</label>
                <div className="flex items-center border border-base-300 rounded-lg overflow-hidden bg-base-100">
                  <MapPin className="ml-3 text-base-content/50" size={18} />
                  <select
                    value={selectedCampusLocation}
                    onChange={(e) => setSelectedCampusLocation(e.target.value)}
                    className="w-full p-2 pl-2 text-sm bg-base-100 border-none focus:ring-0 text-base-content"
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

      {/* Active Filters */}
      <div className="w-full max-w-6xl flex flex-wrap gap-2 mb-6">
        {selectedCuisine !== "All Cuisines" && (
          <span className="bg-info text-info-content px-3 py-1 rounded-full text-sm flex items-center">
            {selectedCuisine}
            <X className="ml-2 cursor-pointer" size={14} onClick={() => clearFilter("cuisine")} />
          </span>
        )}
        {selectedMethod !== "All Methods" && (
          <span className="bg-success text-success-content px-3 py-1 rounded-full text-sm flex items-center">
            {selectedMethod}
            <X className="ml-2 cursor-pointer" size={14} onClick={() => clearFilter("method")} />
          </span>
        )}
        {selectedCampusLocation !== "All Locations" && (
          <span className="bg-warning text-warning-content px-3 py-1 rounded-full text-sm flex items-center">
            {selectedCampusLocation === "true" ? "On Campus" : "Off Campus"}
            <X className="ml-2 cursor-pointer" size={14} onClick={() => clearFilter("location")} />
          </span>
        )}
      </div>

      {/* Listings */}
      <div className="w-full max-w-6xl flex flex-col gap-6">
        {paginatedData.length > 0 ? (
          paginatedData.map((item) => (
            <div
              key={item.id}
              className="bg-base-100 border border-base-300 rounded-xl shadow mb-6 p-6 flex flex-col sm:flex-row gap-4 hover:shadow-lg transition-all duration-200 hover:border-primary/30"
            >
              <div className="w-full sm:w-48 h-48 bg-base-200 rounded-xl overflow-hidden flex items-center justify-center">
                {item.image && typeof item.image !== "number" && item.image.url ? (
                  <Image
                    src={item.image.url}
                    alt={item.image.alt}
                    width={192}
                    height={192}
                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-200"
                  />
                ) : (
                  <span className="text-base-content/40">No Image</span>
                )}
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-primary mb-1">{item.name}</h2>
                  <p className="text-sm text-base-content/70 mb-2">{item.shortDescription}</p>
                  <div className="text-sm text-base-content/60 space-y-1">
                    <p><strong>Category:</strong> {item.category}</p>
                    <p><strong>Slaughter Method:</strong> {item.slaughtered}</p>
                    <p><strong>Location:</strong> {item.location}</p>
                  </div>
                </div>
                <div className="flex gap-4 mt-4">
                  <a href={item.googleMapsLink} target="_blank" className="text-sm text-info hover:underline">
                    Google Maps
                  </a>
                  {item.website && (
                    <a
                      href={item.website}
                      target="_blank"
                      className="text-sm bg-primary text-primary-content px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      Book Now
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-16 text-base-content/60">
            <p>No results match your filters.</p>
            <button
              onClick={clearAllFilters}
              className="mt-4 px-6 py-2 bg-primary text-primary-content rounded-lg hover:bg-primary/90 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-primary text-primary-content rounded disabled:bg-base-300 disabled:text-base-content/50 transition-colors"
            >
              Prev
            </button>
            <span className="text-sm text-base-content/70">Page {currentPage} of {totalPages}</span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-primary text-primary-content rounded disabled:bg-base-300 disabled:text-base-content/50 transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Toggle Map Button */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
        <button
          onClick={() => {
            if (navigator.vibrate) navigator.vibrate(10);
            setShowMap((prev) => !prev);
            setShowFilters(false);
          }}
          className="bg-primary text-primary-content px-6 py-2 rounded-full shadow-md hover:bg-primary/90 transition-all duration-300 hover:scale-105"
        >
          {showMap ? "Hide Map" : "📍 View Map"}
        </button>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-primary text-primary-content p-3 rounded-full shadow-lg hover:bg-primary/90 z-50 transition-all duration-200 hover:scale-110"
        >
          ↑
        </button>
      )}

      {/* Embedded Map (Toggle View) */}
      {showMap && (
        <div
          id="map-section"
          className="w-full max-w-6xl h-[400px] mt-12 rounded-xl overflow-hidden shadow-lg animate-fade-in bg-base-100 border border-base-300"
        >
          <iframe
            src="https://www.google.com/maps/d/embed?mid=1uQfQqV85aYaziCWMs996FZOPkyIKvAw&usp=sharing"
            width="100%"
            height="100%"
            allowFullScreen
            loading="lazy"
            className="w-full h-full border-0"
          ></iframe>
          <div className="text-center mt-2 pb-2">
            <a
              href="https://www.google.com/maps/d/u/0/viewer?mid=1uQfQqV85aYaziCWMs996FZOPkyIKvAw"
              target="_blank"
              rel="noopener noreferrer"
              className="text-info hover:underline text-sm"
            >
              View Full Map
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default HalalFoodClient;

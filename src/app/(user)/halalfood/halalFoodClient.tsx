"use client";

import { useState, useMemo, useEffect } from "react";
import { HalalDirectory } from "@/payload-types";
import SearchBar from "@/components/UI/SearchBar";
import { useSearchParams } from "next/navigation";
import { MapPin, Utensils, Hand, ChevronDown, ChevronUp, X } from "lucide-react";

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
  const [selectedCuisine, setSelectedCuisine] = useState<string>("All Cuisines");
  const [selectedMethod, setSelectedMethod] = useState<string>("All Methods");
  const [selectedCampusLocation, setSelectedCampusLocation] = useState<string>("All Locations");
  const [showFilters, setShowFilters] = useState<boolean>(true);
  const [isStickyVisible, setIsStickyVisible] = useState<boolean>(true);
  const [lastScrollY, setLastScrollY] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setIsStickyVisible(false); // Hide on scroll down
      } else {
        setIsStickyVisible(true); // Show on scroll up
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const clearFilter = (filterType: string) => {
    if (filterType === "cuisine") setSelectedCuisine("All Cuisines");
    if (filterType === "method") setSelectedMethod("All Methods");
    if (filterType === "location") setSelectedCampusLocation("All Locations");
  };

  const clearAllFilters = () => {
    setSelectedCuisine("All Cuisines");
    setSelectedMethod("All Methods");
    setSelectedCampusLocation("All Locations");
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

  return (
    <div className="w-full flex flex-col items-center mt-20 px-4 sm:px-8 bg-base-100 text-neutral">
      {/* Header Section */}
      <div className="text-center w-full mb-8">
        <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl text-primary">Discover Best Halal Restaurants</h1>
        <p className="text-base-300 mt-2 text-sm sm:text-md md:text-lg">
          {filteredData.length} restaurants available nearby
        </p>
      </div>

      {/* Active Filters Section */}
      <div className="bg-gray-100 text-gray-700 rounded-lg p-3 mb-4 w-full">
        <strong>Active Filters:</strong>
        <div className="flex flex-wrap gap-2 mt-2">
          {selectedCuisine !== "All Cuisines" && (
            <span className="flex items-center bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-sm">
              Cuisine: {selectedCuisine}
              <X className="ml-2 cursor-pointer" size={14} onClick={() => clearFilter("cuisine")} />
            </span>
          )}
          {selectedMethod !== "All Methods" && (
            <span className="flex items-center bg-green-100 text-green-700 px-2 py-1 rounded-full text-sm">
              Method: {selectedMethod}
              <X className="ml-2 cursor-pointer" size={14} onClick={() => clearFilter("method")} />
            </span>
          )}
          {selectedCampusLocation !== "All Locations" && (
            <span className="flex items-center bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-sm">
              Location: {selectedCampusLocation}
              <X className="ml-2 cursor-pointer" size={14} onClick={() => clearFilter("location")} />
            </span>
          )}
          {selectedCuisine === "All Cuisines" &&
            selectedMethod === "All Methods" &&
            selectedCampusLocation === "All Locations" && <span>None</span>}
        </div>
      </div>

      {/* Sticky Collapsible Filter Section */}
      <div
        className={`sticky top-[80px] z-50 bg-white p-4 rounded-b-lg shadow-md transition-transform duration-300 ${
          isStickyVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center text-primary font-semibold"
          >
            {showFilters ? "Hide Filters" : "Show Filters"}
            {showFilters ? <ChevronUp className="ml-2" /> : <ChevronDown className="ml-2" />}
          </button>
          <p className="text-sm text-gray-500">Scroll for more content</p>
        </div>
        <div
          className={`transition-all duration-300 overflow-hidden ${
            showFilters ? "max-h-[500px]" : "max-h-0"
          }`}
        >
          <div className="mt-4">
            <SearchBar />
            <div className="flex flex-col sm:flex-row justify-center w-full space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="flex items-center">
                <Utensils className="mr-2 text-neutral" />
                <select
                  value={selectedCuisine}
                  onChange={(e) => setSelectedCuisine(e.target.value)}
                  className="border border-neutral rounded-lg p-3 sm:p-4 w-full sm:w-56"
                >
                  {cuisineOptions.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center">
                <Hand className="mr-2 text-neutral" />
                <select
                  value={selectedMethod}
                  onChange={(e) => setSelectedMethod(e.target.value)}
                  className="border border-neutral rounded-lg p-3 sm:p-4 w-full sm:w-56"
                >
                  {slaughterMethodOptions.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center">
                <MapPin className="mr-2 text-neutral" />
                <select
                  value={selectedCampusLocation}
                  onChange={(e) => setSelectedCampusLocation(e.target.value)}
                  className="border border-neutral rounded-lg p-3 sm:p-4 w-full sm:w-56"
                >
                  <option value="All Locations">All Locations</option>
                  <option value="true">On Campus</option>
                  <option value="false">Off Campus</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="flex flex-col md:flex-row w-full md:space-x-6 mt-24">
        <div className="w-full md:w-2/3">
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-gray-200 mb-6 shadow-lg rounded-lg p-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-full sm:w-48 h-48 bg-gray-200 flex items-center justify-center rounded-lg overflow-hidden">
                  {item.image && typeof item.image !== "number" && item.image.url ? (
                    <img src={item.image.url} alt={item.image.alt} className="w-full h-full object-cover" />
                  ) : (
                    <p className="text-gray-500">No Image</p>
                  )}
                </div>
                <div className="flex flex-col justify-between w-full">
                  <div>
                    <h2 className="text-xl font-bold text-primary mb-2">{item.name}</h2>
                    <p className="text-gray-700 mb-3">{item.shortDescription}</p>
                    <p className="text-gray-600 text-sm">
                      <strong>Category:</strong> {item.category}
                    </p>
                    <p className="text-gray-600 text-sm">
                      <strong>Slaughter Method:</strong> {item.slaughtered}
                    </p>
                    <p className="text-gray-600 text-sm">
                      <strong>Location:</strong> {item.location}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4 mt-4">
                    <a
                      href={item.googleMapsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline text-sm"
                    >
                      View on Google Maps
                    </a>
                    {item.website && (
                      <a
                        href={item.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white bg-secondary hover:bg-warning transition-colors rounded-lg px-4 py-2 text-sm font-semibold"
                      >
                        Book Now
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center mt-8">
              <p className="text-gray-500 text-lg mb-4">No results found matching your criteria.</p>
              <button
                onClick={clearAllFilters}
                className="text-white bg-primary hover:bg-primary-dark px-4 py-2 rounded-lg text-sm font-medium"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Map Section */}
        <div className="w-full md:w-1/3 sticky top-20 h-64 sm:h-96 bg-info rounded-lg overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/d/embed?mid=1uQfQqV85aYaziCWMs996FZOPkyIKvAw&usp=sharing"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          ></iframe>
          <div className="text-center mt-2">
            <a
              href="https://www.google.com/maps/d/u/0/viewer?mid=1uQfQqV85aYaziCWMs996FZOPkyIKvAw"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline text-sm"
            >
              View on Google Maps
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HalalFoodClient;

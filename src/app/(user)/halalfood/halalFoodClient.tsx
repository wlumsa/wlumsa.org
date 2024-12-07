"use client";

import { useState } from "react";
import { HalalDirectory } from "@/payload-types";
import SearchBar from "@/components/UI/SearchBar";
import { useSearchParams } from "next/navigation";
import { MapPin,Utensils,Hand } from "lucide-react";
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

  const filterData = () => {
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
  };

  return (
    <div className="w-full flex flex-col items-center mt-20 px-4 sm:px-8 bg-base-100 text-neutral">
      {/* Header Section */}
      <div className="text-center w-full mb-8">
        <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl text-primary">Discover Best Halal Restaurants</h1>
        <p className="text-base-300 mt-2 text-sm sm:text-md md:text-lg">
          {filterData().length} restaurants available nearby
        </p>
      </div>

      {/* Filter Section */}
      <div className="bg-base=100 p-4 rounded-lg shadow-md w-full mb-8">
        {/* Use SearchBar component */}
        <SearchBar />

        {/* Additional Filters */}
        <div className="flex flex-col sm:flex-row justify-center w-full space-y-4 sm:space-y-0 sm:space-x-4">
          {/* Cuisine Dropdown */}
          <div className="flex items-center">
            <Utensils className="mr-2 text-neutral" />
            <select
              value={selectedCuisine}
              onChange={(e) => setSelectedCuisine(e.target.value)}
              className="border border-neutral rounded-lg p-3 sm:p-4 w-full sm:w-56 text-sm sm:text-md focus:ring-2 focus:ring-primary transition"
            >
              {cuisineOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* Slaughter Method Dropdown */}
          <div className="flex items-center">
            <Hand className="mr-2 text-neutral" />
            <select
              value={selectedMethod}
              onChange={(e) => setSelectedMethod(e.target.value)}
              className="border border-neutral rounded-lg p-3 sm:p-4 w-full sm:w-56 text-sm sm:text-md focus:ring-2 focus:ring-primary transition"
            >
              {slaughterMethodOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* Campus Location Dropdown */}
          <div className="flex items-center">
            <MapPin className="mr-2 text-neutral" />
            <select
              value={selectedCampusLocation}
              onChange={(e) => setSelectedCampusLocation(e.target.value)}
              className="border border-neutral rounded-lg p-3 sm:p-4 w-full sm:w-56 text-sm sm:text-md focus:ring-2 focus:ring-primary transition"
            >
              <option value="All Locations">All Locations</option>
              <option value="true">On Campus</option>
              <option value="false">Off Campus</option>
            </select>
          </div>
        </div>

        {/* Clear Filters Button */}
        <button
          onClick={() => {
            setSelectedCuisine("All Cuisines");
            setSelectedMethod("All Methods");
            setSelectedCampusLocation("All Locations");
          }}
          className="text-neutral hover:text-primary text-sm font-medium mt-4 sm:mt-0"
        >
          Clear Filters
        </button>
      </div>

      {/* Main Content Section */}
      <div className="flex flex-col md:flex-row w-full md:space-x-6">
        <div className="w-full md:w-2/3">
          {/* Render filtered restaurant cards */}
          {filterData().length > 0 ? (
            filterData().map((item) => (
              <div
                key={item.id}
                className="bg-base-100 border border-neutral mb-6 shadow-lg rounded-lg p-4 sm:p-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 hover:shadow-xl transition-shadow duration-300"
              >
                {/* Image Section */}
                <div className="w-full sm:w-32 h-32 bg-neutral flex items-center justify-center rounded-lg overflow-hidden h-36">
                  {item.image && typeof item.image !== 'number' && item.image.url ? (
                    <img src={item.image.url} alt={item.image.alt} className="w-full h-full object-cover" />
                  ) : (
                    <p className="text-neutral">No Image</p>
                  )}
                </div>

                {/* Restaurant Details Section */}
                <div className="flex flex-col w-3/4 ">
                  <h2 className="text-lg sm:text-xl font-bold text-primary mb-1">{item.name}</h2>
                  <p className="text-neutral mb-2 text-sm sm:text-md">{item.shortDescription}</p>
                  <p className="text-neutral text-sm capitalize">
                    <strong>Category:</strong> {item.category}
                  </p>
                  <p className="text-neutral text-sm capitalize">
                    <strong>Slaughter Method:</strong> {item.slaughtered}
                  </p>
                  <p className="text-neutral text-sm">
                    <strong>Location:</strong> {item.location}
                  </p>
                  <a
                    href={item.googleMapsLink}
                    target="_blank"
                    className="text-primary hover:text-secondary hover:underline text-sm font-medium"
                  >
                    View on Google Maps
                  </a>
                </div>

                {/* Optional Booking Button */}
                {item.website && (
                  <button className="btn btn-secondary hover:bg-scale-105 text-primary transition-colors rounded-lg w-full sm:w-32 h-10 sm:h-12 flex items-center justify-center font-semibold">
                  <a
                    href={item.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className=""
                  >
                    Book Now
                  </a>
                  </button>
                )}
              </div>
            ))
          ) : (
            <p className="text-neutral text-md sm:text-lg">No restaurants found matching your criteria.</p>
          )}
        </div>

        {/* Map Section */}
        <div className="w-full md:w-1/3 sticky top-0 h-96 mt-6 md:mt-0 bg-info rounded-lg overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/d/embed?mid=1uQfQqV85aYaziCWMs996FZOPkyIKvAw&usp=sharing"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default HalalFoodClient;

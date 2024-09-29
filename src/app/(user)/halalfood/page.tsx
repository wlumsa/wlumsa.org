"use client";

import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

// Define the structure of Halal Directory Data based on your Supabase table
interface HalalDirectoryData {
  id: string;
  name: string;
  short_description: string;
  category: string;
  slaughtered: string;
  location: string;
  google_maps_link: string;
  website?: string;
}

const cuisineOptions = [
  'All Cuisines', 
  'Chinese', 
  'Persian', 
  'Shawarma', 
  'Burgers', 
  'Bangladeshi', 
  'Chinese Indo Fusion', 
  'Pakistani Food', 
  'Chicken and Waffles', 
  'Kabob', 
  'Uyghur', 
  'Chicken', 
  'Indian Fusion Food', 
  'Pizza'
];

const slaughterMethodOptions = [
  'All Methods', 
  'Hand', 
  'Machine', 
  'Both', 
  'N/A'
];

export default function HalalDirectoryPage() {
  // Initialize halalDirectory as an empty array
  const [halalDirectory, setHalalDirectory] = useState<HalalDirectoryData[]>([]);
  const [selectedCuisine, setSelectedCuisine] = useState<string>('All Cuisines');
  const [selectedMethod, setSelectedMethod] = useState<string>('All Methods');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Fetch the Halal Directory data when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/fetchHalalDirectory"); // Fetch from your API
        const result = await response.json();

        if (!result.data || !Array.isArray(result.data)) {
          throw new Error("Invalid data format"); // Error handling if the response is not an array
        }

        setHalalDirectory(result.data); // Set the fetched data to the state
      } catch (error) {
        console.error("Error fetching Halal Directory:", error);
        setHalalDirectory([]); // Ensure the state is always an array
      }
    };
    fetchData();
  }, []);

  // Filter data based on dropdowns and search query
  const filterData = () => {
    return halalDirectory.filter(item => {
      const matchesCategory = selectedCuisine === 'All Cuisines' || item.category === selectedCuisine;
      const matchesMethod = selectedMethod === 'All Methods' || item.slaughtered === selectedMethod;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesMethod && matchesSearch;
    });
  };

  return (
    <div className="flex flex-col items-center mt-20 md:mt-40 px-4 mx-auto w-full">
      <div className="text-center w-full md:w-1/2 mx-auto">
        <h1 className="font-sans text-2xl font-bold text-primary md:text-5xl">
          Halal Food Directory
        </h1>
        <p className="mt-2 text-gray-700 text-md md:text-base">
          Discover Halal Food spots near Laurier's Campus
        </p>
      </div>

      {/* Google Maps Embed */}
      <div className="w-full md:w-1/2 mt-8 mx-auto">
        <iframe
          src="https://www.google.com/maps/d/embed?mid=1uQfQqV85aYaziCWMs996FZOPkyIKvAw&usp=sharing"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      {/* Search bar with an icon */}
      <div className="flex items-center border rounded-md p-2 w-full md:w-1/2 mt-20 mx-auto">
        <input
          type="text"
          placeholder="Search"
          className="flex-grow outline-none text-gray-600 p-2"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <FaSearch className="text-gray-500" />
      </div>

      {/* Dropdown buttons with arrow icons */}
      <div className="w-full md:w-1/2 flex flex-wrap justify-center mt-4 space-y-4 md:space-y-0 md:space-x-2 mx-auto mb-20 md:mb-40">
        {/* Category Dropdown */}
        <div className="dropdown w-full md:w-auto">
          <select
            value={selectedCuisine}
            onChange={(e) => setSelectedCuisine(e.target.value)}
            className="btn btn-sm m-1 w-full flex items-center justify-between bg-secondary text-primary"
          >
            {cuisineOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Slaughter Methods Dropdown */}
        <div className="dropdown w-full md:w-auto">
          <select
            value={selectedMethod}
            onChange={(e) => setSelectedMethod(e.target.value)}
            className="btn btn-sm m-1 w-full flex items-center justify-between bg-secondary text-primary"
          >
            {slaughterMethodOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Display Halal Directory Data as Cards */}
      <div className="w-full md:w-1/2 mt-10">
        {filterData().map((item) => (
          <div key={item.id} className="bg-white p-4 shadow-md rounded-lg mb-4">
            <h2 className="text-xl font-bold">{item.name}</h2>
            <p className="text-gray-600">{item.short_description}</p>
            <p className="text-gray-600">Category: {item.category}</p>
            <p className="text-gray-600">Slaughter Method: {item.slaughtered}</p>
            <p className="text-gray-600">Location: {item.location}</p>
            <a href={item.google_maps_link} target="_blank" className="text-blue-600">View on Google Maps</a>
            {item.website && <a href={item.website} target="_blank" className="text-blue-600 ml-4">Website</a>}
          </div>
        ))}
      </div>
    </div>
  );
}

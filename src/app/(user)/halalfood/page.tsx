"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

interface HalalDirectoryData {
  id: string;
  name: string;
  short_description: string;
  category: string;
  slaughtered: string;
  location: string;
  google_maps_link: string;
  website?: string;
  image_id?: string;
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
  const [halalDirectory, setHalalDirectory] = useState<HalalDirectoryData[]>([]);
  const [imageUrls, setImageUrls] = useState<{ [key: string]: string }>({});
  const [selectedCuisine, setSelectedCuisine] = useState<string>('All Cuisines');
  const [selectedMethod, setSelectedMethod] = useState<string>('All Methods');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase.from('halal_directory').select('*');
        if (error) throw new Error(error.message);
        setHalalDirectory(data);

        const imagePromises = data.map(async (item) => {
          if (item.image_id) {
            const image = await getImageByID(item.image_id);

            // Check if image is not an empty string and has the publicUrl property
            if (typeof image === 'object' && 'publicUrl' in image) {

              return { [item.image_id]: image.publicUrl };
            }
          }
          return { [item.image_id]: '' };
        });
        const imageResults = await Promise.all(imagePromises);
        const imagesObject = Object.assign({}, ...imageResults);
        setImageUrls(imagesObject);
      } catch (error) {
        console.error("Error fetching Halal Directory:", error);
        setHalalDirectory([]);
      }
    };
    fetchData();
  }, []);

  const filterData = () => {
    return halalDirectory
      .filter(item => {
        const matchesCategory = selectedCuisine === 'All Cuisines' || item.category.toLowerCase() === selectedCuisine.toLowerCase();
        const matchesMethod = selectedMethod === 'All Methods' || item.slaughtered.toLowerCase() === selectedMethod.toLowerCase();
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesMethod && matchesSearch;
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  };

  return (
    <div className="w-full flex flex-col items-center mt-32 px-4">
      <div className="text-center w-full mb-10">
        <h1 className="font-bold text-3xl md:text-4xl text-gray-800">Discover Best Halal Restaurants</h1>
        <p className="text-gray-500 mt-4 text-md md:text-lg">
          {filterData().length} restaurants available nearby
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-center w-full space-y-4 md:space-y-0 md:space-x-6 mb-8">
        <input
          type="text"
          placeholder="Search by name"
          className="border border-gray-300 rounded-lg p-4 w-full md:w-96 h-12 text-md focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          value={selectedCuisine}
          onChange={(e) => setSelectedCuisine(e.target.value)}
          className="border border-gray-300 rounded-lg p-4 w-full md:w-56 h-12 text-md focus:ring-2 focus:ring-purple-500 transition "
        >
          {cuisineOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        <select
          value={selectedMethod}
          onChange={(e) => setSelectedMethod(e.target.value)}
          className="border border-gray-300 rounded-lg p-4 w-full md:w-56 h-12 text-md focus:ring-2 focus:ring-purple-500 transition"
        >
          {slaughterMethodOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col md:flex-row w-full md:space-x-8">
        <div className="w-full md:w-2/3">
          {filterData().length > 0 ? (
            filterData().map((item) => (
              <div key={item.id} className="bg-white mb-8 shadow-md rounded-lg p-6 flex flex-col md:flex-row space-y-6 md:space-y-0 space-x-0 md:space-x-6 hover:shadow-xl transition-shadow duration-300">
                <div className="w-full md:w-32 h-32 bg-gray-200 flex items-center justify-center rounded-lg overflow-hidden">
                  {item.image_id && imageUrls[item.image_id] ? (
                    <img src={imageUrls[item.image_id]} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <p className="text-gray-500">No Image</p>
                  )}
                </div>

                <div className="flex-grow">
                  <h2 className="text-xl md:text-2xl font-bold text-primary mb-2">{item.name}</h2>
                  <p className="text-gray-600 mb-3">{item.short_description}</p>
                  <p className="text-gray-500 mb-1"><strong>Category:</strong> {item.category}</p>
                  <p className="text-gray-500 mb-1"><strong>Slaughter Method:</strong> {item.slaughtered}</p>
                  <p className="text-gray-500 mb-3"><strong>Location:</strong> {item.location}</p>
                  <a href={item.google_maps_link} target="_blank" className="text-blue-600 hover:underline">View on Google Maps</a>
                </div>

                {item.website && (
                  <a
                    href={item.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white bg-primary hover:bg-opacity-75 transition-colors rounded-lg w-full md:w-32 h-12 flex items-center justify-center font-semibold"
                  >
                    Book Now
                  </a>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-md md:text-lg">No restaurants found matching your criteria.</p>
          )}
        </div>

        <div className="w-full md:w-1/3 sticky top-0 h-96 md:h-screen mt-8 md:mt-0 bg-gray-100 rounded-lg overflow-hidden shadow-lg">
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
}

async function getImageByID(id: string) {
  const { data: filename, error } = await supabase.from('media').select('filename').eq("id", id).single();
  if (error) {
    console.error("Error fetching image:", error);
    return '';
  }

  const path = `media/${filename.filename}`;
  const { data } = supabase
    .storage
    .from(process.env.NEXT_PUBLIC_S3_BUCKET|| "default_bucket")
    .getPublicUrl(path || "");
  return data;
}

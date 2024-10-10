// ./roommateservice/RoommateServicePage.tsx
"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient"; 

interface RoommatePostData {
  id: string;
  title: string;
  description: string;
  location: string;
  contactEmail: string;
  status: string;
}

const RoommateServicePage: React.FC = () => {
  const [roommatePosts, setRoommatePosts] = useState<RoommatePostData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch roommate posts when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase.from("roommate_posts").select("*");
        if (error) throw new Error(error.message);
        setRoommatePosts(data || []);
      } catch (error) {
        console.error("Error fetching roommate posts:", error);
      }
    };
    fetchData();
  }, []);

  // Filter posts based on search query
  const filterData = () => {
    return roommatePosts.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-16 px-4">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Roommate Finder</h1>
        <p className="text-gray-500 mt-1">Search for available roommate postings</p>
      </div>

      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search by title, location, or description"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 rounded-lg p-3 w-full max-w-md text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
        />
      </div>

      <div className="space-y-6">
        {filterData().length > 0 ? (
          filterData().map((item) => (
            <div
              key={item.id}
              className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200"
            >
              <h2 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h2>
              <p className="text-gray-600 text-sm mb-3">{item.description}</p>
              <p className="text-gray-500 text-sm"><strong>Location:</strong> {item.location}</p>
              <p className="text-gray-500 text-sm"><strong>Contact:</strong> {item.contactEmail}</p>
              <p className={`text-sm mt-2 ${item.status === "approved" ? "text-green-600" : "text-yellow-500"}`}>
                {item.status === "approved" ? "Approved" : "Pending Approval"}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No roommate posts found.</p>
        )}
      </div>
    </div>
  );
};

export default RoommateServicePage;

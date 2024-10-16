"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import RoommateCard from "@/components/UI/RoommateCard";

// Define the structure of a RoommateProfile
interface RoommateProfile {
  id: number;
  name: string;
  age?: number;
  gender?: string;
  bio?: string;
  location?: string;
  interests?: string;
  created_at?: string;
}

const RoommateServicePage: React.FC = () => {
  const [profiles, setProfiles] = useState<RoommateProfile[]>([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchProfiles = async () => {
      const { data, error } = await supabase.from("roommate_posts").select("*");

      if (error) {
        console.error("Error fetching profiles:", error);
      } else {
        console.log("Fetched profiles:", data); // Verify the fetched data
        setProfiles(data || []);
      }
      setLoading(false); // Stop loading
    };

    fetchProfiles();
  }, []);

  if (loading) return <p>Loading profiles...</p>; // Loading indicator

  return (
    <div className="flex flex-wrap justify-center gap-6 p-6">
      {profiles.length > 0 ? (
        profiles.map((profile) => (
          <RoommateCard key={profile.id} profile={profile} imageUrls={{}} />
        ))
      ) : (
        <p>No profiles found.</p>
      )}
    </div>
  );
};

export default RoommateServicePage;

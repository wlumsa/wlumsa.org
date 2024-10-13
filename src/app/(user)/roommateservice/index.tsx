"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import RoommateCard from "@/components/UI/RoommateCard";

const RoommateServicePage = () => {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      const { data } = await supabase.from("roommates").select("*");
      setProfiles(data || []);
    };
    fetchProfiles();
  }, []);

  return (
    <div>
      {profiles.map((profile) => (
        <RoommateCard key={profile.id} profile={profile} imageUrls={{}} />
      ))}
    </div>
  );
};

export default RoommateServicePage;

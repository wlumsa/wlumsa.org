"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import RoommateCard from "@/components/UI/RoommateCard";
import Listing from "@/components/Forms/Listing";
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
    <div className="flex flex-col items-center justify-center gap-6 p-6 mt-16 ">
      <div className="flex flex-col"> 
        <h1  className="text-primary text-3xl font-bold text-center " >Roommate Service</h1>
        <p>Looking to find accommodation in Waterloo? Trying to lease your apartment? Whatever the case is checkout our directory of postings  </p>
      </div>
      <div>
        {/* <button className="btn btn-primary text-white">New Listing</button> */}
        <button className="btn" onClick={()=>{
          const modal = document.getElementById('my_modal_1') as HTMLDialogElement;
          if (modal) {
            modal.showModal();
          }
        }}>open modal</button>
<dialog id="my_modal_1" className="modal">
  <div className="modal-box ">
    <div className="modal-action">
      <form method="dialog">
      <button className="btn">Close</button>
        <Listing />
        
      </form>
    </div>
  </div>
</dialog>
      </div>
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

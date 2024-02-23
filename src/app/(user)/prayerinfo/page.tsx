import React from "react";
import PrayerTimesTable from "../../../components/PrayerTimeTable"; // assuming PrayerTimesTable is the client component
import PrayerSpaceCard from "@/components/PrayerSpaceCard";
import { fetchTimings, fetchJummahTimes } from "../../../Utils/api";

export const revalidate = 3600 
export default async function PrayerInfo() {
  const timingsData = await fetchTimings();
  const jummahTimes = await fetchJummahTimes();

  return (
    <div className="flex-grow items-center pt-16">
      <div className="container mx-auto p-8">
        <PrayerTimesTable timingsData={timingsData} jummahTimes={jummahTimes} />
      </div>
      <div className="container mx-auto justify-center  p-8">
        <h2 className="mb-8 text-center text-3xl font-bold">
          These Videos Can help guide you to the Prayer Rooms
        </h2>
        <div className=" grid grid-cols-1 gap-4 md:grid-cols-3">
          
          <PrayerSpaceCard
            videoId="XQALLoF6Buo"
            title="Bricker"
            thumbnailUrl="https://img.youtube.com/vi/XQALLoF6Buo/maxresdefault.jpg"
          />
          <PrayerSpaceCard
            videoId="BeT9uC4NBPw"
            title="Peters"
            thumbnailUrl="https://img.youtube.com/vi/BeT9uC4NBPw/maxresdefault.jpg"
          />

          <PrayerSpaceCard
            videoId="xnGcNytQNxQ"
            title="PMC"
            thumbnailUrl="https://img.youtube.com/vi/xnGcNytQNxQ/maxresdefault.jpg"
          />

          <PrayerSpaceCard
            videoId="Esnqdy0rqiY"
            title="Turret"
            thumbnailUrl="https://img.youtube.com/vi/Esnqdy0rqiY/sddefault.jpg"
          />


        </div>
      </div>
    </div>
  );
}

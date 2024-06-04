import React from "react";
import PrayerTimesTable from "../../../components/PrayerTimeTable"; // assuming PrayerTimesTable is the client component
import PrayerSpaceCard from "@/components/UI/PrayerSpaceCard";
import { fetchTimings, fetchJummahTimes } from "../../../utils/datafetcher";

export const revalidate = 3600
/**
 * Renders the Prayer Info page.
 * This page displays the prayer timings and videos guiding users to the prayer rooms.
 * @returns The JSX element representing the Prayer Info page.
 */

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
            title="Bricker Prayer Room"
            thumbnailUrl="https://img.youtube.com/vi/XQALLoF6Buo/maxresdefault.jpg"
          />
          <PrayerSpaceCard
            videoId="BeT9uC4NBPw"
            title="Peters Prayer Room"
            thumbnailUrl="https://img.youtube.com/vi/BeT9uC4NBPw/maxresdefault.jpg"
          />

          <PrayerSpaceCard
            videoId="xnGcNytQNxQ"
            title="PMC (Jumu'ah)"
            thumbnailUrl="https://img.youtube.com/vi/xnGcNytQNxQ/maxresdefault.jpg"
          />

          <PrayerSpaceCard
            videoId="Esnqdy0rqiY"
            title="Turret (Jumu'ah)"
            thumbnailUrl="https://img.youtube.com/vi/Esnqdy0rqiY/sddefault.jpg"
          />


        </div>
      </div>
    </div>
  );
}

import React from "react";
import PrayerTimesTable from "./PrayerTimeTable"; // assuming PrayerTimesTable is the client component
import PrayerSpaceCard from "@/components/PrayerSpaceCard";
import { fetchTimings, fetchJummahTimes } from "../../../Utils/api";



interface PrayerInfoProps {
  socialLinks: SocialLinkProps[];
  navbarData: NavbarGroup[];
  footerData: FooterGroup[];
  timingsData: DayTimings[];
  jummahTimes: Jummah[];
  videoIds: string[];
}

export default async function PrayerInfo() {
  

  const timingsData = await fetchTimings();
  const jummahTimes = await fetchJummahTimes();

 
  return (
    <div className=" mt-10">
      
      <div className="flex flex-col items-center pt-16">
      <div className="container mx-auto p-8">
      <PrayerTimesTable timingsData={timingsData} jummahTimes={jummahTimes} />
      </div>
      <div className="container mx-auto p-8  justify-center">
        <h2 className="mb-8 text-center text-3xl font-bold">
          These Videos Can help guide you to the Prayer Rooms
        </h2>
        <div className=" grid grid-cols-1 gap-4 md:grid-cols-3">
          <PrayerSpaceCard
            videoId="Esnqdy0rqiY"
            title="Jummah"
            thumbnailUrl="https://img.youtube.com/vi/BeT9uC4NBPw/maxresdefault.jpg"
          />
          <PrayerSpaceCard
            videoId="XQALLoF6Buo"
            title="Brickers"
            thumbnailUrl="https://img.youtube.com/vi/XQALLoF6Buo/maxresdefault.jpg"
          />
          <PrayerSpaceCard
            videoId="BeT9uC4NBPw"
            title="Peters"
            thumbnailUrl="https://img.youtube.com/vi/BeT9uC4NBPw/maxresdefault.jpg"
          />
        </div>
        </div>
      </div>
    </div>
  );
};


import React from "react";
import PrayerTimesTable from "../../../components/PrayerTimeTable"; // assuming PrayerTimesTable is the client component
import PrayerSpaceCard from "@/components/UI/PrayerSpaceCard";
import { getJummahTimings, getPrayerTimings } from "@/Utils/datafetcher";
import Image from "next/image";
import MasjidCard from "@/components/UI/MasjidCard"
import { getPrayerSpaces } from "@/Utils/datafetcher";
import Link from "next/link";
/**
 
 * This page displays the prayer timings and videos guiding users to the prayer rooms.
 * @returns The JSX element representing the Prayer Info page.
 */
export const revalidate = 6000;

export default async function PrayerInfo() {
  const timingsData = await getPrayerTimings()
  const jummahTimes = await getJummahTimings()
  const prayerSpaces = await getPrayerSpaces()
  console.log(prayerSpaces)
  

  return (
    <div className="flex-grow items-center pt-16">
      <div className="container mx-auto p-8">
         <h1 className="font-serif text-3xl font-bold text-primary sm:text-4xl text-center mb-8">Prayer Information</h1>
         <p className="mb-6 text-center text-sm font-body text-base-content/75">
           Looking for Ramadan prayer, suhoor, and iftar timings?{" "}
           <Link href="/ramadan" className="font-semibold text-primary underline underline-offset-2">
             View the Ramadan page
           </Link>
           .
         </p>

        <PrayerTimesTable timingsData={timingsData} jummahTimes={jummahTimes} />
      </div>
      <div className="container mx-auto justify-center   flex flex-col items-center ">
          <h1 className="font-serif text-3xl font-bold text-primary text-center mb-4 sm:text-4xl">On-campus Prayer Spaces</h1>

        <h2 className="mb-8 text-center text-xl font-bold">
          These Videos Can help guide you to the Prayer Rooms
        </h2>
        <div className=" grid grid-cols-1 gap-12  lg:grid-cols-2 ">

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
        <div className="container mx-auto my-16 p-8">
          <h1 className="font-serif text-3xl font-bold text-primary sm:text-4xl text-center mb-8">Off-campus Prayer Spaces</h1>
       <div className = "flex flex-col gap-8 md:gap-12">
                  {prayerSpaces && Array.isArray(prayerSpaces) && prayerSpaces.length > 0 ? (
                    prayerSpaces.map((space: any) => (
                      <MasjidCard
                        key={space.id}
                        name={space.title}
                        image={space.image ? space.image.url : ""}
                        address={space.location}
                        websiteLink={space.websiteLink}
                        googleMapsLink={space.googleMapsLink}
                      />
                    ))
                  ) : (
                    <div>No off-campus prayer spaces found.</div>
                  )}

                  


                      
        
        </div>
       
        </div>
      </div>
    
    </div>
  );
}

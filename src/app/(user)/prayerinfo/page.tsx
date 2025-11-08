import React from "react";
import PrayerTimesTable from "../../../components/PrayerTimeTable"; // assuming PrayerTimesTable is the client component
import PrayerSpaceCard from "@/components/UI/PrayerSpaceCard";
import { getJummahTimings, getPrayerTimings } from "@/Utils/datafetcher";
import Image from "next/image";
/**
 * Renders the Prayer Info page.
 * This page displays the prayer timings and videos guiding users to the prayer rooms.
 * @returns The JSX element representing the Prayer Info page.
 */
export const revalidate = 6000;

export default async function PrayerInfo() {
  const timingsData = await getPrayerTimings()
  const jummahTimes = await getJummahTimings()

  return (
    <div className="flex-grow items-center pt-16">
      <div className="container mx-auto p-8">
         <h1 className="font-serif text-3xl font-bold text-primary sm:text-4xl text-center mb-8">Prayer Information</h1>

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
           <div className={"bg-base-100 dark:bg-base-200 border border-base-300 dark:border-base-700 rounded-xl p-4 sm:p-6 hover:shadow-xl dark:hover:shadow-2xl transition-all duration-200 hover:border-primary/30"} >
                        <div className="flex flex-row gap-6">
                         
                            <Image
                              src={"https://mrucujpvbprmpznsgmfr.supabase.co/storage/v1/object/public/msa_public/Photos/waterloomasjid.png"}
                              alt={ "waterloo masjid image"}
                              width={150}
                              height={150}
                              // sizes="(max-width: 640px) 112px, (max-width: 1024px) 192px, 25vw"
                              decoding="async"
                              loading="lazy"
                              className="h object-cover transition-transform duration-200 hover:scale-105 motion-reduce:hover:scale-100 rounded-lg"
                            /> 
                          
                       
                        <div className="flex min-w-0 flex-1 flex-col justify-between">
                          <div>
                            <h2
                              className={`mb-1 font-serif text-lg font-semibold text-primary sm:text-xl `}
                            >
                             Waterloo Masjid
                            </h2>
                          
                          
                              <div className="space-y-1 text-xs text-base-content/60 sm:text-sm">
                               
                                <p>
                                  <strong>Location:</strong> 213 Erb St. W, Waterloo, ON N2L 1V6
                                </p>
                              </div>
                            
                          </div>
                          <div className="mt-3 flex gap-3 sm:mt-4 sm:gap-4">
                            <a
                              href={"https://maps.app.goo.gl/hrQHEmPPpKXYvP9k7"}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-primary transition-colors hover:text-primary/80 hover:underline"
                              aria-label="Open Google Maps for this restaurant"
                            >
                              Google Maps
                            </a>

                            <a
                              href={"https://waterloomasjid.com/main/"}
                              target="_blank"
                              rel="noopener noreferrer"
                                className="rounded-lg bg-primary px-3 py-2 text-sm text-primary-content transition-colors hover:bg-primary/90 sm:px-4"
                                aria-label="Open restaurant website"
                              >
                                Website
                              </a>
                            
                          </div>
                          </div>
                        </div>
                      </div>

                      <div className={"bg-base-100 dark:bg-base-200 border border-base-300 dark:border-base-700 rounded-xl p-4 sm:p-6 hover:shadow-xl dark:hover:shadow-2xl transition-all duration-200 hover:border-primary/30"} >
                        <div className="flex flex-row gap-6">
                         
                            <Image
                              src={"https://mrucujpvbprmpznsgmfr.supabase.co/storage/v1/object/public/msa_public/Photos/kitchener.png"}
                              alt={ "kitchener image"}
                              width={150}
                              height={150}
                              // sizes="(max-width: 640px) 112px, (max-width: 1024px) 192px, 25vw"
                              decoding="async"
                              loading="lazy"
                              className=" object-cover transition-transform duration-200 hover:scale-105 motion-reduce:hover:scale-100 rounded-lg"
                            />

                        <div className="flex min-w-0 flex-1 flex-col justify-between">
                          <div>
                            <h2
                              className={`mb-1 font-serif text-lg font-semibold text-primary sm:text-xl `}
                            >
                             Kitchener Masjid
                            </h2>
                          
                          
                              <div className="space-y-1 text-xs text-base-content/60 sm:text-sm">
                               
                                <p>
                                  <strong>Location:</strong> 1017 Victoria St N, Kitchener, ON N2B 3C7
                                </p>
                              </div>
                            
                          </div>
                          <div className="mt-3 flex gap-3 sm:mt-4 sm:gap-4">
                            <a
                              href={"https://maps.app.goo.gl/RmPi32HoBbLvceae6"}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-primary transition-colors hover:text-primary/80 hover:underline"
                              aria-label="Open Google Maps for this mosque"
                            >
                              Google Maps
                            </a>

                            <a
                              href={"https://centres.macnet.ca/kitchenermasjid/"}
                              target="_blank"
                              rel="noopener noreferrer"
                                className="rounded-lg bg-primary px-3 py-2 text-sm text-primary-content transition-colors hover:bg-primary/90 sm:px-4"
                                aria-label="Open restaurant website"
                              >
                                Website
                              </a>
                            
                          </div>
                          </div>
                        </div>
                      </div>


                      <div className={"bg-base-100 dark:bg-base-200 border border-base-300 dark:border-base-700 rounded-xl p-4 sm:p-6 hover:shadow-xl dark:hover:shadow-2xl transition-all duration-200 hover:border-primary/30"} >
                        <div className="flex flex-row gap-6">
                         
                            <Image
                              src={"https://mrucujpvbprmpznsgmfr.supabase.co/storage/v1/object/public/msa_public/Photos/icw.png"}
                              alt={ "ICW image"}
                              width={150}
                              height={150}
                              // sizes="(max-width: 640px) 112px, (max-width: 1024px) 192px, 25vw"
                              decoding="async"
                              loading="lazy"
                              className="object-cover transition-transform duration-200 hover:scale-105 motion-reduce:hover:scale-100 rounded-lg"
                            /> 
                          
                       
                        <div className="flex min-w-0 flex-1 flex-col justify-between">
                          <div>
                            <h2
                              className={`mb-1 font-serif text-lg font-semibold text-primary sm:text-xl `}
                            >
                            Islamic Centre of Waterloo - ICW
                            </h2>
                          
                          
                              <div className="space-y-1 text-xs text-base-content/60 sm:text-sm">
                               
                                <p>
                                  <strong>Location:</strong> 510 Erbsville Rd, Waterloo, ON N2V 2R4
                                </p>
                              </div>
                            
                          </div>
                          <div className="mt-3 flex gap-3 sm:mt-4 sm:gap-4">
                            <a
                              href={"https://maps.app.goo.gl/qRGg5ZRbMexL7SCr7"}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-primary transition-colors hover:text-primary/80 hover:underline"
                              aria-label="Open Google Maps for this mosque"
                            >
                              Google Maps
                            </a>

                            <a
                              href={"https://centres.macnet.ca/icwaterloo/"}
                              target="_blank"
                              rel="noopener noreferrer"
                                className="rounded-lg bg-primary px-3 py-2 text-sm text-primary-content transition-colors hover:bg-primary/90 sm:px-4"
                                aria-label="Open restaurant website"
                              >
                                Website
                              </a>
                            
                          </div>
                          </div>
                        </div>
                      </div>
        
        
        </div>
       
        </div>
      </div>
    
    </div>
  );
}

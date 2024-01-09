import React from "react";
import Link from "next/link";
import JummahInfo from "./JummahInfo";
import PrayerRooms from "./PrayerRooms";
import PrayerTimes from "./PrayerTimes";

const PrayerSection: React.FC = () => {
  return (
    <div
      id="prayer_info"
      className="flex flex-col md:flex-row w-full bg-base-100 px-6 py-8 text-sm md:text-base lg:text-lg"
    >
      <div className="card mb-auto grid flex-grow place-items-center rounded-box">
        <h3 className="pb-2 text-center text-xl font-bold text-primary duration-200 hover:scale-105 md:text-2xl lg:text-3xl">
          Prayer Times
        </h3>
        <PrayerTimes />
        <Link
          href="/prayerinfo"
          className="btn btn-primary mt-4 border-0 text-secondary shadow duration-200 hover:scale-105 hover:bg-secondary hover:text-primary"
        >
          View Prayer Timings
        </Link>
       
      </div>
      <div className="divider  md:divider-horizontal mt-10 mx-10"></div>
      
      <div className="card flex-grow place-items-center rounded-box">
        <div className="flex w-full items-center justify-center flex-row gap-6 gap:0 md:flex-col">
          <div className="card grid place-items-center rounded-box bg-base-100">
            <h3 className="pb-2 text-center text-xl font-bold text-primary duration-200 hover:scale-105 md:text-2xl lg:text-3xl">
              Jummah Info
            </h3>
            <JummahInfo />
          </div>
          <div className="divider mx-4 "></div>
          <div className="card grid place-items-center rounded-box bg-base-100">
            <h3 className="pb-2 text-center text-xl font-bold text-primary duration-200 hover:scale-105 md:text-2xl lg:text-3xl">
              Prayer Rooms
            </h3>
            <PrayerRooms />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrayerSection;

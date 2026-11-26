import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import JummahInfo from "./JummahInfo";
import PrayerRooms from "./PrayerRooms";
import PrayerTimes from "./PrayerTimes";
import {
  JummahTiming,
  PrayerTiming,
  PrayerRoom,
  WeeklyPrayerTimetable,
} from "@/payload-types";
/**
 * Represents the PrayerSection component.
 * @param {Object} prayerRoomsData - The data for prayer rooms.
 * @param {Object} jummahInfo - The data for Jummah info.
 * @param {Object} timingsData - The data for prayer timings.
 * @returns {JSX.Element} The rendered PrayerSection component.
 */

interface PrayerSectionProps {
  prayerRoomsData: PrayerRoom[];
  jummahInfo: JummahTiming[];
  timingsData: PrayerTiming;
  weeklyTimetable: WeeklyPrayerTimetable | null;
}
const PrayerSection: React.FC<PrayerSectionProps> = ({
  prayerRoomsData,
  jummahInfo,
  timingsData,
  weeklyTimetable,
}) => {
  return (
    <div
      id="prayer_info"
      className="mx-auto flex w-full max-w-4xl flex-col bg-base-100 px-6 py-8 text-sm md:flex-row md:text-base lg:py-12"
    >
      <div className="grid min-w-0 flex-1 content-start justify-items-center">
        <h3 className="pb-2 text-center text-xl font-bold text-primary md:text-2xl lg:text-3xl">
          Prayer Times
        </h3>
        <PrayerTimes
          timingsData={timingsData}
          weeklyTimetable={weeklyTimetable}
        />
        <Link
          href="/prayerinfo"
          className="group relative isolate mt-4 inline-flex min-h-11 items-center gap-3 rounded-md bg-primary py-1 pr-1 pl-4 text-sm font-semibold text-primary-content focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary motion-safe:transition-transform motion-safe:duration-[120ms] motion-safe:ease-[cubic-bezier(0.23,1,0.32,1)] motion-safe:active:scale-[0.97]"
        >
          <span
            aria-hidden="true"
            className="absolute inset-1 -z-10 origin-right scale-x-[0.16] rounded-sm bg-primary-content/15 motion-safe:transition-transform motion-safe:duration-200 motion-safe:ease-[cubic-bezier(0.23,1,0.32,1)] motion-safe:group-hover:scale-x-100"
          />
          <span>View Prayer Timings</span>
          <span className="grid size-9 shrink-0 place-items-center">
            <ArrowRight aria-hidden="true" className="size-4" />
          </span>
        </Link>
      </div>
      <div className="divider my-6 md:mx-5 md:my-0 md:divider-horizontal"></div>
      <div className="min-w-0 flex-1">
        <div className="flex w-full items-start justify-center gap-4 sm:gap-6 md:flex-col md:items-center">
          <div className="grid min-w-0 place-items-center">
            <h3 className="pb-2 text-center text-xl font-bold text-primary md:text-2xl lg:text-3xl">
              Jummah Info
            </h3>
            <JummahInfo jummahInfo={jummahInfo} />
          </div>
          <div className="hidden h-px w-full max-w-xs bg-base-300 md:block"></div>
          <div className="grid min-w-0 place-items-center">
            <h3 className="pb-2 text-center text-xl font-bold text-primary md:text-2xl lg:text-3xl">
              Prayer Rooms
            </h3>
            <PrayerRooms prayerRoomsData={prayerRoomsData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrayerSection;

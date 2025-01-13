"use client"
import React, { useEffect, useState } from "react";
import { PrayerTiming, JummahTiming } from "@/payload-types";
import { getFullDate,isFriday,formatJummahTiming } from "@/Utils/dateFormater";
import { current } from "@reduxjs/toolkit";
interface PrayerTimesTableProps {
  timingsData: PrayerTiming;
  jummahTimes: JummahTiming[];
}

type TimingKey = "fajr" | "fajr_iqamah" | "sunrise" | "dhuhr" | "dhuhr_iqamah_1" | "dhuhr_iqamah_2"| "asr" | "asr_iqamah_1" | "maghrib" | "maghrib_iqamah" | "isha" | "isha_iqamah";
const timingDictonary = {
  "fajr": "AM",
  "fajr_iqamah": "AM",
  "sunrise": "AM",
  "dhuhr": "PM",
  "dhuhr_iqamah_1": "PM",
  "dhuhr_iqamah_2": "PM",
  "asr": "PM",
  "asr_iqamah_1": "PM",
  "maghrib": "PM",
  "maghrib_iqamah": "PM",
  "isha": "PM",
  "isha_iqamah": "PM",
};
const daysInMonth = (year: number, month: number) => new Date(year, month, 0).getDate();

const PrayerTimesTable: React.FC<PrayerTimesTableProps> = ({ timingsData, jummahTimes }) => {
  const today = new Date();
  const sevenDays = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  console.log(today.getDay())
  const timesToShow: TimingKey[] = ["fajr", "dhuhr", "asr", "maghrib", "isha"];

  console.log(jummahTimes)
  //console.log(today.getDate())
  
  const currentMonth = today.getMonth();
  const daysInCurrentMonth = new Date(today.getFullYear(), currentMonth+1, 0).getDate();
console.log(daysInCurrentMonth)
  console.log(typeof (currentMonth))
  //const currentMonthTimings = timingsData.month[currentMonth]?.days;
  console.log(timingsData.month[currentMonth]?.days[today.getDate()])
    let currentMonthTimings = timingsData.month[currentMonth]?.days;
  
    if (timingsData && timingsData.month[currentMonth + 1]) {
   const nextMonthTimings = timingsData.month[currentMonth + 1]?.days || [];
   currentMonthTimings  = currentMonthTimings?.concat(nextMonthTimings)
}
  
  
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 overflow-hidden rounded-lg shadow-lg">
        <thead className="bg-[#2E046D] text-white">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Prayer
            </th>
            {currentMonthTimings && currentMonthTimings.slice(today.getDate() - 1, today.getDate() + 6).map((day, index) => {
              const dayDate = today.getDate()  + index;
              const isNextMonth = dayDate > daysInCurrentMonth;

              return (
                <th
                  key={day.day}
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                >
                  {getFullDate(today.getFullYear(), isNextMonth ? currentMonth+1 : currentMonth, isNextMonth ? dayDate - daysInCurrentMonth : dayDate)}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-base-100">
          {timesToShow.map((key, keyIndex) => (
            <tr key={keyIndex}>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                {timesToShow[keyIndex]}
              </th>
              {currentMonthTimings &&
                currentMonthTimings
                  .slice(today.getDate()-1 , today.getDate() + 6)
                  .map((day, dayIndex) => {
                    const iqamahKey = `${key}_iqamah` as TimingKey;
                    const formattedTiming = day[key] + " " + timingDictonary[key];
                    let iqamahTime = "N/A";
                    if (key === "dhuhr") {
                      iqamahTime = `${day["dhuhr_iqamah_1"]} ${timingDictonary["dhuhr_iqamah_1"]} | ${day["dhuhr_iqamah_2"]} ${timingDictonary["dhuhr_iqamah_2"]}`;
                    } else if (key === "asr") {
                      iqamahTime = day["asr_iqamah_1"] + " " + timingDictonary["asr_iqamah_1"];
                    }
                    return (
                      <td key={`${dayIndex}-${keyIndex}`} className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        <div>{formattedTiming}</div>
                        <div className="text-green-500">{iqamahTime}</div>
                        {key === "dhuhr" && isFriday(today.getFullYear(), currentMonth, day.day) && jummahTimes.slice().reverse().map((jummah, index) => (
                          <div key={index} className="text-blue-500">
                            {formatJummahTiming(jummah.timing)} at ({jummah.building})
                          </div>
                        ))}
                      </td>
                    );
                  })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PrayerTimesTable;
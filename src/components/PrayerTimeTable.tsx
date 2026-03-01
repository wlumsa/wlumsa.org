"use client"
import React from "react";
import { PrayerTiming, JummahTiming } from "@/payload-types";
import { getFullDate,isFriday,formatJummahTiming } from "@/Utils/dateFormater";

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
  const timesToShow: TimingKey[] = ["fajr", "dhuhr", "asr", "maghrib", "isha"];

  const currentMonth = today.getMonth();
  const daysInCurrentMonth = new Date(today.getFullYear(), currentMonth+1, 0).getDate();
  let currentMonthTimings = timingsData.month[currentMonth]?.days;
  
  if (timingsData && timingsData.month[currentMonth + 1]) {
    const nextMonthTimings = timingsData.month[currentMonth + 1]?.days || [];
    currentMonthTimings = currentMonthTimings?.concat(nextMonthTimings)
  }

  const upcomingDays = currentMonthTimings?.slice(today.getDate() - 1, today.getDate() + 6) || [];

  const getDateParts = (index: number) => {
    const dayDate = today.getDate() + index;
    const isNextMonth = dayDate > daysInCurrentMonth;
    const monthForDay = isNextMonth ? currentMonth + 1 : currentMonth;
    const dayOfMonth = isNextMonth ? dayDate - daysInCurrentMonth : dayDate;

    return { monthForDay, dayOfMonth };
  };

  const getFormattedIqamah = (day: any, key: TimingKey) => {
    if (key === "dhuhr") {
      return `${day["dhuhr_iqamah_1"] ? `${day["dhuhr_iqamah_1"]} ${timingDictonary["dhuhr_iqamah_1"]}` : ""}${day["dhuhr_iqamah_1"] && day["dhuhr_iqamah_2"] ? " | " : ""}${day["dhuhr_iqamah_2"] ? `${day["dhuhr_iqamah_2"]} ${timingDictonary["dhuhr_iqamah_2"]}` : ""}`;
    }

    if (key === "asr") {
      return day["asr_iqamah_1"] ? `${day["asr_iqamah_1"]} ${timingDictonary["asr_iqamah_1"]}` : "N/A";
    }

    const iqamahKey = `${key}_iqamah` as TimingKey;
    return day[iqamahKey] ? `${day[iqamahKey]} ${timingDictonary[iqamahKey]}` : "N/A";
  };
  
  
  return (
    <div>
      <div className="space-y-4 md:hidden">
        {upcomingDays.map((day, dayIndex) => {
          const { monthForDay, dayOfMonth } = getDateParts(dayIndex);
          const fullDate = getFullDate(today.getFullYear(), monthForDay, dayOfMonth);

          return (
            <div key={`${day.day}-${dayIndex}`} className="rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm">
              <h3 className="mb-3 text-center text-sm font-semibold uppercase tracking-wide text-primary">
                {fullDate}
              </h3>

              <div className="grid grid-cols-2 gap-3">
                {timesToShow.map((key) => {
                  const formattedTiming = day[key] ? `${day[key]} ${timingDictonary[key]}` : "--";
                  const iqamahTime = getFormattedIqamah(day, key);

                  return (
                    <div key={`${day.day}-${key}`} className="rounded-xl border border-base-300 bg-base-200/50 px-3 py-2 text-center">
                      <p className="text-xs font-semibold uppercase tracking-wide text-base-content/70">{key}</p>
                      <p className="mt-1 text-sm font-medium text-base-content">{formattedTiming}</p>
                      <p className="mt-0.5 text-sm font-semibold text-green-500">{iqamahTime}</p>

                      {key === "dhuhr" &&
                        isFriday(today.getFullYear(), monthForDay, day.day) &&
                        jummahTimes.map((jummah, index) => (
                          <p key={index} className="mt-1 text-xs font-medium text-info">
                            {formatJummahTiming(jummah.timing)} ({jummah.building})
                          </p>
                        ))}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="hidden overflow-x-auto md:block">
        <table className="min-w-full divide-y divide-base-300 overflow-hidden rounded-lg shadow-lg">
          <thead className="bg-primary text-primary-content">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Prayer
              </th>
              {upcomingDays.map((day, index) => {
                const { monthForDay, dayOfMonth } = getDateParts(index);

                return (
                  <th
                    key={`${day.day}-${index}`}
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                  >
                    {getFullDate(today.getFullYear(), monthForDay, dayOfMonth)}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-base-300 bg-base-100">
            {timesToShow.map((key, keyIndex) => (
              <tr key={keyIndex}>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-base-content">
                  {timesToShow[keyIndex]}
                </th>
                {upcomingDays.map((day, dayIndex) => {
                  const { monthForDay } = getDateParts(dayIndex);
                  const formattedTiming = day[key] ? `${day[key]} ${timingDictonary[key]}` : "--";
                  const iqamahTime = getFormattedIqamah(day, key);

                  return (
                    <td key={`${dayIndex}-${keyIndex}`} className="whitespace-nowrap px-6 py-4 text-sm text-base-content/80">
                      <div>{formattedTiming}</div>
                      <div className="text-green-500">{iqamahTime}</div>
                      {key === "dhuhr" &&
                        isFriday(today.getFullYear(), monthForDay, day.day) &&
                        jummahTimes.map((jummah, index) => (
                          <div key={index} className="text-red-500">
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
    </div>
  );
};

export default PrayerTimesTable;
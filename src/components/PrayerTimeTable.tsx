"use client"
import React from "react";
import { PrayerTiming, JummahTiming, WeeklyPrayerTimetable } from "@/payload-types";
import { getFullDate,isFriday,formatJummahTiming } from "@/Utils/dateFormater";

interface PrayerTimesTableProps {
  timingsData: PrayerTiming;
  jummahTimes: JummahTiming[];
  weeklyTimetable: WeeklyPrayerTimetable | null;
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

type DayTiming = Partial<Record<TimingKey, string>> & { day?: number };

const WEEKLY_TIME_KEYS = {
  date_day: ["date_day", "dateday", "date", "day"],
  fajr_start: ["fajr_start", "fajr"],
  fajr_iqamah: ["fajr_iqamah"],
  dhuhr_start: ["dhuhr_start", "zuhr_start", "dhuhr", "zuhr"],
  dhuhr_iqamah_1: ["dhuhr_iqamah_1", "zuhr_iqamah_1", "dhuhr_iqamah", "zuhr_iqamah"],
  dhuhr_iqamah_2: ["dhuhr_iqamah_2", "zuhr_iqamah_2"],
  asr_start: ["asr_start", "asr"],
  asr_iqamah: ["asr_iqamah", "asr_iqamah_1"],
  maghrib_start: ["maghrib_start", "maghrib", "magrib_start", "magrib"],
  maghrib_iqamah: ["maghrib_iqamah", "magrib_iqamah"],
  isha_start: ["isha_start", "isha"],
  isha_iqamah: ["isha_iqamah"],
} as const;

function firstStringValue(row: Record<string, unknown>, keys: readonly string[]): string | null {
  for (const key of keys) {
    const value = row[key];
    if (typeof value === "string" && value.trim().length > 0) {
      return value.trim();
    }
  }
  return null;
}

function extractDayNumber(value: string | null): number | undefined {
  if (!value) return undefined;
  const match = value.match(/\b(\d{1,2})\b/);
  return match ? Number(match[1]) : undefined;
}

function mapWeeklyRowToDay(row: Record<string, unknown>): DayTiming {
  return {
    day: extractDayNumber(firstStringValue(row, WEEKLY_TIME_KEYS.date_day)),
    fajr: firstStringValue(row, WEEKLY_TIME_KEYS.fajr_start) || undefined,
    fajr_iqamah: firstStringValue(row, WEEKLY_TIME_KEYS.fajr_iqamah) || undefined,
    dhuhr: firstStringValue(row, WEEKLY_TIME_KEYS.dhuhr_start) || undefined,
    dhuhr_iqamah_1: firstStringValue(row, WEEKLY_TIME_KEYS.dhuhr_iqamah_1) || undefined,
    dhuhr_iqamah_2: firstStringValue(row, WEEKLY_TIME_KEYS.dhuhr_iqamah_2) || undefined,
    asr: firstStringValue(row, WEEKLY_TIME_KEYS.asr_start) || undefined,
    asr_iqamah_1: firstStringValue(row, WEEKLY_TIME_KEYS.asr_iqamah) || undefined,
    maghrib: firstStringValue(row, WEEKLY_TIME_KEYS.maghrib_start) || undefined,
    maghrib_iqamah: firstStringValue(row, WEEKLY_TIME_KEYS.maghrib_iqamah) || undefined,
    isha: firstStringValue(row, WEEKLY_TIME_KEYS.isha_start) || undefined,
    isha_iqamah: firstStringValue(row, WEEKLY_TIME_KEYS.isha_iqamah) || undefined,
  };
}

function getWeeklyUpcomingDays(weeklyTimetable: WeeklyPrayerTimetable | null): DayTiming[] {
  if (!weeklyTimetable || !Array.isArray(weeklyTimetable.rows)) {
    return [];
  }

  const rows = weeklyTimetable.rows.filter(
    (row): row is Record<string, unknown> => typeof row === "object" && row !== null
  );

  if (rows.length === 0) {
    return [];
  }

  const today = new Date().getDate();
  const dayRegex = new RegExp(`(^|\\D)0?${today}(\\D|$)`);

  const todayIndex = rows.findIndex((row) => {
    const dateLabel = firstStringValue(row, WEEKLY_TIME_KEYS.date_day);
    return dateLabel ? dayRegex.test(dateLabel) : false;
  });

  const orderedRows = todayIndex >= 0
    ? rows.slice(todayIndex).concat(rows.slice(0, todayIndex))
    : rows;

  return orderedRows.slice(0, 7).map(mapWeeklyRowToDay);
}

const PrayerTimesTable: React.FC<PrayerTimesTableProps> = ({ timingsData, jummahTimes, weeklyTimetable }) => {
  const today = new Date();
  const timesToShow: TimingKey[] = ["fajr", "dhuhr", "asr", "maghrib", "isha"];

  const currentMonth = today.getMonth();
  const daysInCurrentMonth = new Date(today.getFullYear(), currentMonth + 1, 0).getDate();
  let currentMonthTimings = timingsData.month[currentMonth]?.days;
  
  if (timingsData && timingsData.month[currentMonth + 1]) {
    const nextMonthTimings = timingsData.month[currentMonth + 1]?.days || [];
    currentMonthTimings = currentMonthTimings?.concat(nextMonthTimings);
  }

  const weeklyUpcomingDays = getWeeklyUpcomingDays(weeklyTimetable);
  const monthlyUpcomingDays = (currentMonthTimings?.slice(today.getDate() - 1, today.getDate() + 6) || []) as DayTiming[];
  const upcomingDays = weeklyUpcomingDays.length > 0 ? weeklyUpcomingDays : monthlyUpcomingDays;

  const getDateParts = (index: number) => {
    const dayDate = today.getDate() + index;
    const isNextMonth = dayDate > daysInCurrentMonth;
    const monthForDay = isNextMonth ? currentMonth + 1 : currentMonth;
    const dayOfMonth = isNextMonth ? dayDate - daysInCurrentMonth : dayDate;

    return { monthForDay, dayOfMonth };
  };

  const getFormattedIqamah = (day: DayTiming, key: TimingKey) => {
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
            <div key={`${dayIndex}-${dayOfMonth}`} className="rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm">
              <h3 className="mb-3 text-center text-sm font-semibold uppercase tracking-wide text-primary">
                {fullDate}
              </h3>

              <div className="grid grid-cols-2 gap-3">
                {timesToShow.map((key) => {
                  const formattedTiming = day[key] ? `${day[key]} ${timingDictonary[key]}` : "--";
                  const iqamahTime = getFormattedIqamah(day, key);

                  return (
                    <div key={`${dayIndex}-${key}`} className="rounded-xl border border-base-300 bg-base-200/50 px-3 py-2 text-center">
                      <p className="text-xs font-semibold uppercase tracking-wide text-base-content/70">{key}</p>
                      <p className="mt-1 text-sm font-medium text-base-content">{formattedTiming}</p>
                      <p className="mt-0.5 text-sm font-semibold text-green-500">{iqamahTime}</p>

                      {key === "dhuhr" &&
                        isFriday(today.getFullYear(), monthForDay, dayOfMonth) &&
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
                    key={`${index}-${dayOfMonth}`}
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
                  const { monthForDay, dayOfMonth } = getDateParts(dayIndex);
                  const formattedTiming = day[key] ? `${day[key]} ${timingDictonary[key]}` : "--";
                  const iqamahTime = getFormattedIqamah(day, key);

                  return (
                    <td key={`${dayIndex}-${keyIndex}`} className="whitespace-nowrap px-6 py-4 text-sm text-base-content/80">
                      <div>{formattedTiming}</div>
                      <div className="text-green-500">{iqamahTime}</div>
                      {key === "dhuhr" &&
                        isFriday(today.getFullYear(), monthForDay, dayOfMonth) &&
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
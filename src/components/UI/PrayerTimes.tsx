import React from "react";
import { getTodaysTimings } from "@/Utils/dateFormater";
import { PrayerTiming, WeeklyPrayerTimetable } from "@/payload-types";

interface PrayerTimesProps {
  timingsData: PrayerTiming;
  weeklyTimetable: WeeklyPrayerTimetable | null;
}

type TimingKey = "fajr" | "fajr_iqamah" | "sunrise" | "dhuhr" | "dhuhr_iqamah_1" | "dhuhr_iqamah_2" | "asr" | "asr_iqamah_1" | "maghrib" | "maghrib_iqamah" | "isha" | "isha_iqamah";
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

type RenderRow = {
  key: string;
  label: string;
  time: string;
  iqamah: string;
};

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

function findTodayWeeklyRow(weeklyTimetable: WeeklyPrayerTimetable | null): Record<string, unknown> | null {
  if (!weeklyTimetable || !Array.isArray(weeklyTimetable.rows)) {
    return null;
  }

  const rows = weeklyTimetable.rows.filter(
    (row): row is Record<string, unknown> => typeof row === "object" && row !== null
  );

  if (rows.length === 0) {
    return null;
  }

  const todayNumber = new Date().getDate();
  const dateRegex = new RegExp(`(^|\\D)0?${todayNumber}(\\D|$)`);

  const matched = rows.find((row) => {
    const dateLabel = firstStringValue(row, WEEKLY_TIME_KEYS.date_day);
    return dateLabel ? dateRegex.test(dateLabel) : false;
  });

  return matched ?? rows[0] ?? null;
}

function getWeeklyRenderRows(weeklyTimetable: WeeklyPrayerTimetable | null): RenderRow[] | null {
  const row = findTodayWeeklyRow(weeklyTimetable);
  if (!row) return null;

  const formatDhuhrIqamah = () => {
    const iqamah1 = firstStringValue(row, WEEKLY_TIME_KEYS.dhuhr_iqamah_1);
    const iqamah2 = firstStringValue(row, WEEKLY_TIME_KEYS.dhuhr_iqamah_2);
    if (iqamah1 && iqamah2) return `${iqamah1} / ${iqamah2}`;
    return iqamah1 || iqamah2 || "N/A";
  };

  const weeklyRows: RenderRow[] = [
    {
      key: "fajr",
      label: "Fajr",
      time: firstStringValue(row, WEEKLY_TIME_KEYS.fajr_start) || "--",
      iqamah: firstStringValue(row, WEEKLY_TIME_KEYS.fajr_iqamah) || "N/A",
    },
    {
      key: "dhuhr",
      label: "Dhuhr",
      time: firstStringValue(row, WEEKLY_TIME_KEYS.dhuhr_start) || "--",
      iqamah: formatDhuhrIqamah(),
    },
    {
      key: "asr",
      label: "Asr",
      time: firstStringValue(row, WEEKLY_TIME_KEYS.asr_start) || "--",
      iqamah: firstStringValue(row, WEEKLY_TIME_KEYS.asr_iqamah) || "N/A",
    },
    {
      key: "maghrib",
      label: "Maghrib",
      time: firstStringValue(row, WEEKLY_TIME_KEYS.maghrib_start) || "--",
      iqamah: firstStringValue(row, WEEKLY_TIME_KEYS.maghrib_iqamah) || "N/A",
    },
    {
      key: "isha",
      label: "Isha",
      time: firstStringValue(row, WEEKLY_TIME_KEYS.isha_start) || "--",
      iqamah: firstStringValue(row, WEEKLY_TIME_KEYS.isha_iqamah) || "N/A",
    },
  ];

  const hasAnyRealData = weeklyRows.some((entry) => entry.time !== "--");
  return hasAnyRealData ? weeklyRows : null;
}

function getMonthlyRenderRows(timingsData: PrayerTiming): RenderRow[] | null {
  const today = new Date();
  const todaysTimings = getTodaysTimings(today, timingsData);
  if (!todaysTimings) return null;

  const timesToShow: TimingKey[] = ["fajr", "dhuhr", "asr", "maghrib", "isha"];

  return timesToShow.map((key) => {
    const time = todaysTimings[key] ? `${todaysTimings[key]} ${timingDictonary[key]}` : "--";

    if (key === "dhuhr") {
      const first = todaysTimings["dhuhr_iqamah_1"]
        ? `${todaysTimings["dhuhr_iqamah_1"]} ${timingDictonary["dhuhr_iqamah_1"]}`
        : "";
      const second = todaysTimings["dhuhr_iqamah_2"]
        ? `${todaysTimings["dhuhr_iqamah_2"]} ${timingDictonary["dhuhr_iqamah_2"]}`
        : "";
      return {
        key,
        label: "Dhuhr",
        time,
        iqamah: [first, second].filter(Boolean).join(" / ") || "N/A",
      };
    }

    if (key === "asr") {
      return {
        key,
        label: "Asr",
        time,
        iqamah: todaysTimings["asr_iqamah_1"]
          ? `${todaysTimings["asr_iqamah_1"]} ${timingDictonary["asr_iqamah_1"]}`
          : "N/A",
      };
    }

    const iqamahKey = `${key}_iqamah` as TimingKey;
    return {
      key,
      label: key.charAt(0).toUpperCase() + key.slice(1),
      time,
      iqamah: todaysTimings[iqamahKey]
        ? `${todaysTimings[iqamahKey]} ${timingDictonary[iqamahKey]}`
        : "N/A",
    };
  });
}

const PrayerTimes: React.FC<PrayerTimesProps> = ({ timingsData, weeklyTimetable }) => {
  if (!timingsData) {
    return <div>Loading...</div>;
  }

  const weeklyRows = getWeeklyRenderRows(weeklyTimetable);
  const monthlyRows = getMonthlyRenderRows(timingsData);
  const rowsToRender = weeklyRows || monthlyRows;

  if (!rowsToRender) {
    return <div className="text-neutral">Error fetching prayer timings, <br/>
    please contact msa@wlu.ca</div>;
  }

  return (
    <div className="mb-4 stats stats-vertical shadow lg:stats-horizontal">
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Time</th>
            <th>Iqamah</th>
          </tr>
        </thead>
        <tbody>
          {rowsToRender.map((row) => (
            <tr key={row.key}>
              <td>{row.label}</td>
              <td>{row.time}</td>
              <td>{row.iqamah}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PrayerTimes;
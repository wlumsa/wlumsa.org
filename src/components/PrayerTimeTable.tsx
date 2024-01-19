"use client"
import React, { useEffect, useState } from "react";

interface PrayerTimesTableProps {
  timingsData: DayTimings[];
  jummahTimes: Jummah[];
}

const PrayerTimesTable: React.FC<PrayerTimesTableProps> = ({ timingsData, jummahTimes }) => {
  const [filteredData, setFilteredData] = useState<DayTimings[]>([]);
  const today = new Date();
  const currentDay = today.getDate();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const currentMonthLong = new Date().toLocaleString("default", { month: "long" });

  useEffect(() => {
    const endDay = new Date(currentYear, currentMonth + 1, 0).getDate();
    const nextSevenDaysData = timingsData.filter((data) => {
      const day = data.day;
      return day >= currentDay && day <= Math.min(currentDay + 6, endDay);
    });
    setFilteredData(nextSevenDaysData);
  }, [timingsData, currentDay]);

  const getFullDate = (day: number): string => {
    return `${currentMonthLong} ${day}`;
  };

  const appendMeridiem = (time: string, isAM: boolean) => {
    if (!time) return time;
    if (time.includes("AM") || time.includes("PM")) {
      return time;
    }
    return `${time} ${isAM ? "AM" : "PM"}`;
  };

  const isFriday = (dayNumber: number): boolean => {
    const date = new Date();
    date.setDate(dayNumber);
    return date.getDay() === 5;
  };

  const prayerRows = [
    { key: "Fajr", iqamahKey: "" },
    { key: "Sunrise", iqamahKey: "" },
    { key: "Dhuhr", iqamahKey: "DhuhrIqamah" },
    { key: "Asr", iqamahKey: "AsrIqamah" },
    { key: "Maghrib", iqamahKey: "MaghribIqamah" },
    { key: "Isha", iqamahKey: "IshaIqamah" },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 overflow-hidden rounded-lg shadow-lg">
        <thead className="bg-[#2E046D] text-white">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Prayer
            </th>
            {filteredData.map((day) => (
              <th
                key={day.day}
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
              >
                {getFullDate(day.day)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {prayerRows.map(({ key, iqamahKey }, index) => (
            <tr
              key={key}
              className="bg-gray-50"
            >
              <td className="text-md whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                {key.replace(/Iqamah$/, " Iqamah")}
              </td>
              {filteredData.map((day) => (
                <td
                  key={day.day}
                  className="whitespace-nowrap px-6 py-4 text-sm text-gray-500"
                >
                  <div>
                    {appendMeridiem(
                      day.timings[key as keyof Timings],
                      key === "Fajr" || key === "Sunrise"
                    )}
                  </div>
                  {iqamahKey && !(key === "Dhuhr" && isFriday(day.day)) && (
                    <div className="text-green-500">
                      {appendMeridiem(
                        day.timings[iqamahKey as keyof Timings],
                        false
                      )}
                    </div>
                  )}
                  {key === "Dhuhr" &&
                    isFriday(day.day) &&
                    jummahTimes.map((jummah, index) => (
                      <div key={index} className="text-blue-500">
                        {jummah.time} ({jummah.room})
                      </div>
                    ))}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PrayerTimesTable;

"use client"
import React, { useEffect, useState } from "react";
import { PrayerTiming, JummahTiming } from "@/payload-types";
import { getFullDate,isFriday,formatJummahTiming } from "@/Utils/dateFormater";
interface PrayerTimesTableProps {
  timingsData: PrayerTiming;
  jummahTimes: JummahTiming[];
}

type TimingKey = "fajr" | "fajr_iqamah" | "sunrise" | "dhuhr" | "dhuhr_iqamah" | "asr" | "asr_iqamah" | "maghrib" | "maghrib_iqamah" | "isha" | "isha_iqamah";
const timingDictonary = {
  "fajr": "AM",
  "fajr_iqamah": "AM",
  "sunrise": "AM",
  "dhuhr": "PM",
  "dhuhr_iqamah": "PM",
  "asr": "PM",
  "asr_iqamah": "PM",
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
  console.log(typeof (currentMonth))
  const currentMonthTimings = timingsData.month[currentMonth]?.days;
  console.log(timingsData.month[currentMonth]?.days[today.getDate()])
  
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 overflow-hidden rounded-lg shadow-lg">
        <thead className="bg-[#2E046D] text-white">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Prayer
            </th>
            {currentMonthTimings && currentMonthTimings.slice(today.getDate() - 1, sevenDays.getDate() - 1).map((day) => (
              <th
                key={day.day}
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
              >
                {getFullDate(today.getFullYear(), currentMonth, day.day)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {timesToShow.map((key, keyIndex) => (
            <tr key={keyIndex}>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                {timesToShow[keyIndex]}
              </th>
              {currentMonthTimings &&
                currentMonthTimings
                  .slice(today.getDate() - 1, sevenDays.getDate() - 1)
                  .map((day, dayIndex) => {
                    const iqamahKey = `${key}_iqamah` as TimingKey;
                    const formattedTiming = day[key] + " " + timingDictonary[key];
                    let iqamahTime = "N/A";
                    if (key !== "fajr") {
                      iqamahTime = day[iqamahKey] + " " + timingDictonary[iqamahKey];
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









// interface PrayerTimesTableProps {
//   timingsData: PrayerTiming[];
//   jummahTimes: Jummah[];
// }
/*
           {timesToShow.map((key) => {

            const iqamahKey = `${key}_iqamah` as TimingKey;
            const formattedTiming = todaysTimings[key] + " " + timingDictonary[key];
            let iqamahTime = "N/A";
            if (key !== "fajr") {
              iqamahTime = todaysTimings[iqamahKey] + " " + timingDictonary[iqamahKey];
            }
            return (
              <tr key={key}>
                <td>{key}</td>
                <td>{formattedTiming}</td>
                <td>{iqamahTime}</td>
              </tr>
            );
          })}
          {/* {prayerRows.map(({ key, iqamahKey }) => (
                <tr key={key} className="bg-gray-50">
                  <td className="text-md whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                    {key.replace(/Iqamah$/, " Iqamah")}
                  </td>
                  {filteredData.map((day) => (
                    <td key={day.day} className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      <div>
                        {appendMeridiem(day[key as keyof typeof day], key === "fajr" || key === "sunrise")}
                      </div>
                      {iqamahKey && !(key === "dhuhr" && isFriday(day.day)) && (
                        <div className="text-green-500">
                          {appendMeridiem(day[iqamahKey as keyof typeof day], false)}
                        </div>
                      )}
                      {key === "dhuhr" && isFriday(day.day) && jummahTimes.map((jummah, index) => (
                        <div key={index} className="text-blue-500">
                          {jummah.time} ({jummah.room})
                        </div>
                      ))}
                    </td>
                  ))}
                </tr>
              ))} */
// const PrayerTimesTable: React.FC<PrayerTimesTableProps> = ({ timingsData, jummahTimes }) => {
//   const [filteredData, setFilteredData] = useState<PrayerTiming[]>([]);
//   const today = new Date();
//   const currentDay = today.getDate();
//   const currentMonth = today.getMonth();
//   const currentYear = today.getFullYear();
//   const currentMonthLong = new Date().toLocaleString("default", { month: "long" });

//   useEffect(() => {
//     const endDay = new Date(currentYear, currentMonth + 1, 0).getDate();
//     const nextSevenDaysData = timingsData.flatMap((data) =>
//       data.month.flatMap((month) =>
//         month.days.filter((day) => {
//           const dayNumber = day.day;
//           return dayNumber >= currentDay && dayNumber <= Math.min(currentDay + 6, endDay);
//         })
//       )
//     );
//     setFilteredData(nextSevenDaysData);
//   }, [timingsData, currentDay]);

//   const getFullDate = (day: number): string => {
//     return `${currentMonthLong} ${day}`;
//   };

//   const appendMeridiem = (time: string, isAM: boolean) => {
//     if (!time) return time;
//     if (time.includes("AM") || time.includes("PM")) {
//       return time;
//     }
//     return `${time} ${isAM ? "AM" : "PM"}`;
//   };

//   const isFriday = (dayNumber: number): boolean => {
//     const date = new Date();
//     date.setDate(dayNumber);
//     return date.getDay() === 5;
//   };

//   const prayerRows = [
//     { key: "fajr", iqamahKey: "fajr_iqamah" },
//     { key: "sunrise", iqamahKey: "" },
//     { key: "dhuhr", iqamahKey: "dhuhr_iqamah" },
//     { key: "asr", iqamahKey: "asr_iqamah" },
//     { key: "maghrib", iqamahKey: "maghrib_iqamah" },
//     { key: "isha", iqamahKey: "isha_iqamah" },
//   ];

//   return (
//     <div className="overflow-x-auto">
//       <table className="min-w-full divide-y divide-gray-200 overflow-hidden rounded-lg shadow-lg">
//         <thead className="bg-[#2E046D] text-white">
//           <tr>
//             <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
//               Prayer
//             </th>
//             {filteredData.map((day) => (
//               <th
//                 key={day.day}
//                 className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
//               >
//                 {getFullDate(day.day)}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody className="divide-y divide-gray-200 bg-white">
//           {prayerRows.map(({ key, iqamahKey }) => (
//             <tr key={key} className="bg-gray-50">
//               <td className="text-md whitespace-nowrap px-6 py-4 font-medium text-gray-900">
//                 {key.replace(/Iqamah$/, " Iqamah")}
//               </td>
//               {filteredData.map((day) => (
//                 <td key={day.day} className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
//                   <div>
//                     {appendMeridiem(day[key as keyof typeof day], key === "fajr" || key === "sunrise")}
//                   </div>
//                   {iqamahKey && !(key === "dhuhr" && isFriday(day.day)) && (
//                     <div className="text-green-500">
//                       {appendMeridiem(day[iqamahKey as keyof typeof day], false)}
//                     </div>
//                   )}
//                   {key === "dhuhr" && isFriday(day.day) && jummahTimes.map((jummah, index) => (
//                     <div key={index} className="text-blue-500">
//                       {jummah.time} ({jummah.room})
//                     </div>
//                   ))}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default PrayerTimesTable;
"use client"
import React, { useEffect, useState } from "react";
import { PrayerTiming,JummahTiming } from "@/payload-types";

interface PrayerTimesTableProps {
  timingsData: PrayerTiming;
  jummahTimes: JummahTiming[];
}

const daysInMonth = (year:number, month:number) => new Date(year, month, 0).getDate();

const PrayerTimesTable: React.FC<PrayerTimesTableProps> = ({ timingsData, jummahTimes }) => {
  const today = new Date();
  const sevenDays = new Date(today.setDate(today.getDate() + 6));
  console.log(sevenDays.getDate())
  console.log(today.getDate())
  const currentMonth = today.getMonth();
  const currentMonthTimings = timingsData.month[currentMonth]?.days;
  //console.log(currentMonthTimings)
  return (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 overflow-hidden rounded-lg shadow-lg">
            <thead className="bg-[#2E046D] text-white">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Prayer
                </th>
                {/* {filteredData.map((day) => (
                  <th
                    key={day.day}
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                  >
                    {getFullDate(day.day)}
                  </th>
                ))} */}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
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
              ))} */}
            </tbody>
          </table>
        </div>
      );
    };
    
    export default PrayerTimesTable









// interface PrayerTimesTableProps {
//   timingsData: PrayerTiming[];
//   jummahTimes: Jummah[];
// }

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
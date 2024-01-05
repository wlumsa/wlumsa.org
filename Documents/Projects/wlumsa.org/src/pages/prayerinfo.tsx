import React, { useEffect, useState } from "react";

import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import db from "../firebase";

import { GetStaticProps } from "next";
interface Timings {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  DhuhrIqamah: string;
  Asr: string;
  AsrIqamah: string;
  Maghrib: string;
  MaghribIqamah: string;
  Isha: string;
  IshaIqamah: string;
}

interface DayTimings {
  timings: Timings;
  day: number;
}
interface Jummah {
  room: string;
  time: string;
}


const fetchTimings = async (): Promise<DayTimings[]> => {
  const today = new Date();
  const currentMonth = today.toLocaleString('default', { month: 'long' });

  let daysCollectionRef = collection(db, 'PrayerTimings', currentMonth, 'Days');
  let q = query(daysCollectionRef, orderBy('Day', 'asc'));

  let querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    timings: doc.data() as Timings,
    day: doc.data().Day as number,
  }));
};

const fetchJummahTimes = async (): Promise<Jummah[]> => {
  const jummahCollectionRef = collection(db, "Jummah");
  const querySnapshot = await getDocs(jummahCollectionRef);
  return querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return { room: data.room as string, time: data.time as string };
  });
};

export const getStaticProps: GetStaticProps = async () => {
  const timingsData = await fetchTimings();
  const jummahTimes = await fetchJummahTimes();

  return {
    props: {
      timingsData,
      jummahTimes,
    },
  };
};

const PrayerTimes: React.FC<{ timingsData: DayTimings[], jummahTimes: Jummah[] }> = ({ timingsData, jummahTimes }) => {
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
    const isFri = date.getDay() === 5;
    console.log("Is Friday:", isFri);
    return isFri;
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
    <div className="flex flex-col items-center pt-16">
     
      <div className="container mx-auto p-8">
        <h1 className="mb-4 text-3xl font-bold">Prayer Times</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full rounded-lg bg-white text-black shadow-lg">
            <thead className="bg-primary text-white">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-bold uppercase">
                  Prayer
                </th>
                {filteredData.map((day) => (
                  <th
                    key={day.day}
                    className="border-l border-gray-400 px-4 py-2 text-left text-xs font-bold uppercase"
                  >
                    {getFullDate(day.day)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-base-200">
              {prayerRows.map(({ key, iqamahKey }) => (
                <tr key={key}>
                  <td className="border-t border-gray-400 px-4 py-2 text-left text-xs font-bold uppercase">
                    {key.replace(/Iqamah$/, " Iqamah")}
                  </td>
                  {filteredData.map((day) => {
                    console.log("Prayer:", key, "Day:", day.day);
                    return (
                      <td
                        key={day.day}
                        className="whitespace-nowrap border-l border-t border-gray-400 px-4 py-2"
                      >
                        <div className="text-black">
                          {appendMeridiem(
                            day.timings[key as keyof Timings],
                            key === "Fajr" || key === "Sunrise"
                          )}
                        </div>
                        {iqamahKey &&
                          !(key === "Dhuhr" && isFriday(day.day)) && (
                            <div className="text-green-600">
                              {appendMeridiem(
                                day.timings[iqamahKey as keyof Timings],
                                false
                              )}
                            </div>
                          )}
                        {key === "Dhuhr" &&
                          isFriday(day.day) &&
                          jummahTimes.map((jummah, index) => (
                            <div key={index} className="text-blue-600">
                              {jummah.time} at {jummah.room}
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
        <p>Waterloo Masjid timings with Hanafi Asr calculation method</p>
      </div>
     
    </div>
  );
};

export default PrayerTimes;

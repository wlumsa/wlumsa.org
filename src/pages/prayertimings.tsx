import React, { useEffect, useState } from "react";

import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import db from "../firebase";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";


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
  const dayOfMonth = today.getDate();
  const endDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7).getDate();
  const daysCollectionRef = collection(db, "PrayerTimings", currentMonth, "Days");
  const q = query(
    daysCollectionRef,
    where("Day", ">=", dayOfMonth),
    where("Day", "<=", endDay),
    orderBy("Day", "asc")
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    timings: doc.data() as Timings,
    day: doc.data().Day as number
  }));
};
const fetchJummahTimes = async (): Promise<Jummah[]> => {
  const jummahCollectionRef = collection(db, "Jummah");
  const querySnapshot = await getDocs(jummahCollectionRef);
  return querySnapshot.docs.map(doc => {
    const data = doc.data();
    console.log('Document Data:', data); // Add this line
    return { room: data.room as string, time: data.time as string };
  });
};
const PrayerTimes: React.FC = () => {
  const [timingsData, setTimingsData] = useState<DayTimings[]>([]);
  const currentMonth = new Date().toLocaleString('default', { month: 'long' });
  const [jummahTimes, setJummahTimes] = useState<Jummah[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedTimings = await fetchTimings();
      setTimingsData(fetchedTimings);
    };
  
    const fetchFridayJummahTimes = async () => {
      const fetchedJummahTimes = await fetchJummahTimes();
      console.log('Jummah Times:', fetchedJummahTimes); // Add this line
      setJummahTimes(fetchedJummahTimes);
    };
  
    fetchData();
    fetchFridayJummahTimes();
  }, []);
  const getFullDate = (day: number): string => {
    return `${currentMonth} ${day}`;
  };

  const appendMeridiem = (time: string, isAM: boolean) => {
    if (!time) return time;
    if (time.includes('AM') || time.includes('PM')) {
      return time;
    }
    return `${time} ${isAM ? 'AM' : 'PM'}`;
  };

  const isFriday = (dayNumber: number): boolean => {
    const date = new Date();
    date.setDate(dayNumber);
    const isFri = date.getDay() === 5;
    console.log('Is Friday:', isFri);
    return isFri;
  };

  const prayerRows = [
    { key: 'Fajr', iqamahKey: '' },
    { key: 'Sunrise', iqamahKey: '' },
    { key: 'Dhuhr', iqamahKey: 'DhuhrIqamah' },
    { key: 'Asr', iqamahKey: 'AsrIqamah' },
    { key: 'Maghrib', iqamahKey: 'MaghribIqamah' },
    { key: 'Isha', iqamahKey: 'IshaIqamah' },
  ];

  return (
    <div className="pt-16 flex flex-col items-center">
      <Navbar/>
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-4">Prayer Times</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white text-black rounded-lg shadow-lg">
            <thead className="bg-primary text-white">
              <tr>
                <th className="px-4 py-2 font-bold text-left text-xs uppercase">
                  Prayer
                </th>
                {timingsData.map(day => (
                  <th key={day.day} className="px-4 py-2 font-bold text-left text-xs uppercase border-l border-gray-400">
                    {getFullDate(day.day)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-base-200">
              {prayerRows.map(({ key, iqamahKey }) => (
                <tr key={key}>
                  <td className="px-4 py-2 font-bold text-left text-xs uppercase border-t border-gray-400">
                    {key.replace(/Iqamah$/, ' Iqamah')}
                  </td>
                  {timingsData.map(day => {
                  console.log('Prayer:', key, 'Day:', day.day);
                  return (
                    <td key={day.day} className="px-4 py-2 whitespace-nowrap border-t border-l border-gray-400">
                      <div className="text-black">{appendMeridiem(day.timings[key as keyof Timings], key === 'Fajr' || key === 'Sunrise')}</div>
                      {iqamahKey && !(key === 'Dhuhr' && isFriday(day.day)) && (
                        <div className="text-green-600">{appendMeridiem(day.timings[iqamahKey as keyof Timings], false)}</div>
                      )}
                      {key === 'Dhuhr' && isFriday(day.day) && jummahTimes.map((jummah, index) => (
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
     <Footer/>
    </div>
  );
};

export default PrayerTimes;

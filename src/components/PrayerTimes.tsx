import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import db from "../firebase";

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

const fetchTimings = async (): Promise<DayTimings | null> => {
  const today = new Date();
  const currentMonth = today.toLocaleString("default", { month: "long" });
  const dayOfMonth = today.getDate();
  const daysCollectionRef = collection(db, "PrayerTimings", currentMonth, "Days");
  const q = query(daysCollectionRef, where("Day", "==", dayOfMonth));
  const querySnapshot = await getDocs(q);
  const doc = querySnapshot.docs[0];
  return doc ? { timings: doc.data() as Timings, day: doc.data().Day as number } : null;
};

const PrayerTimes: React.FC = () => {
  const [timingsData, setTimingsData] = useState<DayTimings | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedTimings = await fetchTimings();
      setTimingsData(fetchedTimings);
    };

    fetchData();
  }, []);

  if (!timingsData) {
    return <div>Loading...</div>;
  }
  const orderedKeys: (keyof Timings)[] = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"];
  return (
    <div className="mb-4 overflow-x-auto shadow">
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Time</th>
            <th>Iqamah</th>
          </tr>
        </thead>
        <tbody>
        {orderedKeys.map((key) => {
            const iqamahKey = `${key}Iqamah` as keyof Timings;
            const iqamahTime = key === "Sunrise" ? "N/A" : timingsData.timings[iqamahKey];
            const timeSuffix = ["Fajr", "Sunrise"].includes(key) ? " AM" : " PM";
            return (
              <tr key={key}>
                <td>{key}</td>
                <td>{timingsData.timings[key] + timeSuffix}</td>
                <td>{iqamahTime + (iqamahTime !== "N/A" ? timeSuffix : "")}</td>
              </tr>
            );
          })}
          </tbody>
      </table>
    </div>
  );
};

export default PrayerTimes;
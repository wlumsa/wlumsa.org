import React, { useEffect, useState } from "react";
import Navbar from "~/components/Navbar";
import { collection, getDocs } from "firebase/firestore";
import db from "../firebase";
import Footer from "~/components/Footer";
import { NextPage } from "next";
import { GetServerSideProps } from "next";
import { GetServerSidePropsContext } from "next";
interface Timings {
    Fajr: string;
    Sunrise: string;
    Dhuhr: string;
    Asr: string;
    Maghrib: string;
    Isha: string;
  
  }
  
  interface TimingsData {
    timings: Timings;
    date: {
      readable: string;
     
    };
 
  }
  interface JummahItem {
    time: string;
    room: string;
  }
  
  const fetchTimings = async (): Promise<TimingsData[]> => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // January is 0!
    const date = currentDate.getDate();
  
    const response = await fetch(`https://api.aladhan.com/v1/calendarByCity/${year}/${month}?city=Waterloo&country=Canada&method=2&school=1`);
    if (!response.ok) {
      throw new Error("Failed to fetch prayer time data from the API.");
    }
    const jsonResponse = await response.json();
    const timingsData: TimingsData[] = jsonResponse.data;

    const todayIndex = timingsData.findIndex(timing => {
      const timingDate = new Date(timing.date.readable);
      return timingDate.getDate() === date && timingDate.getMonth() + 1 === month && timingDate.getFullYear() === year;
    });
  
   
    return todayIndex >= 0 ? timingsData.slice(todayIndex, todayIndex + 7) : [];
  };
  export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    try {
      const prayerTimes = await fetchTimings();
      return {
        props: { prayerTimes },
      };
    } catch (error) {
      console.error(error);
      return {
        props: { prayerTimes: null, error: 'Failed to fetch data' },
      };
    }
  };


  const PrayerTimes: NextPage<{ prayerTimes: TimingsData[]; error?: string }> = ({ prayerTimes, error }) => {
  
    const [jummahInfo, setJummahInfo] = useState<JummahItem[]>([]);
    const [iqamahTimes, setIqamahTimes] = useState<Timings | null>(null);
  
    useEffect(() => {
      
    
     
  
      const fetchJummahInfo = async () => {
        const jummahCollectionRef = collection(db, "Jummah");
        const querySnapshot = await getDocs(jummahCollectionRef);
        setJummahInfo(querySnapshot.docs.map(doc => doc.data() as JummahItem));
      };
  
      const fetchIqamahTimes = async () => {
        const iqamahTimesRef = collection(db, "IqamahTimings");
        const snapshot = await getDocs(iqamahTimesRef);
      
        const iqamahTimesData = snapshot.docs[0]?.data() as Timings | undefined;
        console.log(iqamahTimesData)
        setIqamahTimes(iqamahTimesData || null);
      };
  
     
      fetchJummahInfo();
      fetchIqamahTimes();
    }, []);

    const convertTo12HourFormat = (timeString?: string): string => {
      if (!timeString) {
          return "N/A";
      }
  
      const [time] = timeString.split(' '); 
      let [hours, minutes] = time?.split(":") ?? ["", ""];
  
      if (!hours || !minutes) {
          return "N/A";
      }
  
      let hoursInNumber = parseInt(hours, 10);
      let period = "AM";
  
      if (hoursInNumber >= 12) {
          period = "PM";
          if (hoursInNumber > 12) {
              hoursInNumber -= 12;
          }
      }
  
      if (hoursInNumber === 0) {
          hoursInNumber = 12; 
      }
  
      // Convert hours back to string without leading 0 if it's less than 10
      const formattedHours = hoursInNumber.toString();
  
      return `${formattedHours}:${minutes} ${period}`;
  };
  

  const prayerNames: (keyof Timings)[] = [
    'Fajr',
    'Sunrise',
    'Dhuhr',
    'Asr',
    'Maghrib',
    'Isha',
  ];

  const getAllJummahTimesAndRooms = (): string[] => {
    return jummahInfo.map(jummah => `${jummah.time} in ${jummah.room}`);
  };

  const transposedData = prayerNames.map((prayerName) => ({
    prayerName,
    timings: prayerTimes.map((dayTimings) => {
      const date = new Date(dayTimings.date.readable);
      const isFriday = date.getDay() === 5;
      let iqamahTimeText = "Loading..."; 
      
      if (iqamahTimes) {
        const iqamahTimeForPrayer = iqamahTimes[prayerName];
        iqamahTimeText = isFriday && prayerName === 'Dhuhr' ? 
          getAllJummahTimesAndRooms().join("\n") : 
          iqamahTimeForPrayer; 
      }

      return {
        date: dayTimings.date.readable,
        time: dayTimings.timings[prayerName],
        iqamahTime: iqamahTimeText,
      };
    }),
  }));

  
  return (
    <div className="pt-16 flex flex-col items-center">
      <Navbar />
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-4">Prayer Times</h1>
        <p className="text-gray-600 mb-4">
          <span className="text-green-600 font-bold">Green</span> = Iqamah times<br />
          <span className="text-black font-bold">Black</span> = Adhan Times  
        </p>
        <div className="overflow-x-auto">
        <table className="min-w-full bg-white text-black rounded-lg shadow-lg">
  <thead className="bg-primary text-white">
    <tr>
      <th className="px-4 py-2 font-bold text-left text-xs uppercase border border-gray-400">
        Prayer Time
      </th>
      {prayerTimes.map((dayTimings) => (
        <th
          key={dayTimings.date.readable}
          className="px-4 py-2 font-bold text-left text-xs uppercase border border-gray-400"
        >
          {dayTimings.date.readable}
        </th>
      ))}
    </tr>
  </thead>
  <tbody className="bg-base-200">
    {transposedData.map((prayerData) => (
      <tr key={prayerData.prayerName}>
        <td className="px-4 py-2 font-bold text-left text-xs uppercase border border-gray-400">
          {prayerData.prayerName}
        </td>
        {prayerData.timings.map((timing) => (
          <td key={timing.date} className={`px-4 py-2 whitespace-nowrap border border-gray-400 ${
            timing === prayerData.timings[0] ? "border-l border-gray-400" : "border-gray-400"
          } ${prayerData === transposedData[0] ? "border-t" : ""}`}>
                
                      <div className="text-black">{convertTo12HourFormat(timing.time)}</div>
                      {/* Check for Dhuhr on Friday for Jummah times */}
                      {prayerData.prayerName === 'Dhuhr' && new Date(timing.date).getDay() === 5
                        ? <div className="text-green-600">
                            {jummahInfo.map((jummah, index) => (
                              <React.Fragment key={index}>
                                {`${jummah.time} in ${jummah.room}`}
                                {index < jummahInfo.length - 1 ? <br /> : null}
                              </React.Fragment>
                            ))}
                          </div>
                        : <div className="text-green-600">
                           
                            {iqamahTimes ? timing.iqamahTime : "Loading..."}
                          </div>
                      }
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          Based on ISNA with Hanafi Asr calculation method. 
        </p>
      </div>
      <Footer/>
    </div>
  );
};

export default PrayerTimes;

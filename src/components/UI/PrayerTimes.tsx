import React from "react";
import { getFormatedTiming, getTodaysTimings } from "@/Utils/dateFormater";
import { PrayerTiming } from "@/payload-types";
interface PrayerTimesProps {
  timingsData:PrayerTiming
}

const PrayerTimes: React.FC<PrayerTimesProps> = ({ timingsData }) => {
  if (!timingsData) {
    return <div>Loading...</div>;
  }

  const today = new Date()
 
  const todaysTimings = getTodaysTimings(today,timingsData)!
  const formattedTiming = getFormatedTiming("fajr",todaysTimings["fajr"])
  console.log(formattedTiming)
  //const orderedKeys: (keyof timingsData)[] = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"];
  
  return (
    <div className="mb-4 stats stats-vertical shadow lg:stats-horizontal ">
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Time</th>
            <th>Iqamah</th>
          </tr>
        </thead>
        <tbody>
          {/* {orderedKeys.map((key) => {
            const iqamahKey = `${key}Iqamah` as keyof Timings;
            const showIqamah = !["Sunrise", "Fajr"].includes(key);
            const iqamahTime = showIqamah ? timingsData.timings[iqamahKey] : "N/A";
            const timeSuffix = ["Fajr", "Sunrise"].includes(key) ? " AM" : " PM";
            
            return (
              <tr key={key}>
                <td>{key}</td>
                <td>{timingsData.timings[key] + timeSuffix}</td>
                <td>{iqamahTime + (showIqamah ? timeSuffix : "")}</td>
              </tr>
            );
          })} */}
        </tbody>
      </table>
    </div>
  );
};

export default PrayerTimes;

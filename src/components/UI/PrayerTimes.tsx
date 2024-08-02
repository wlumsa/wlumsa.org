import React from "react";
import { getTodaysTimings } from "@/Utils/dateFormater";
import { PrayerTiming } from "@/payload-types";

interface PrayerTimesProps {
  timingsData: PrayerTiming;
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


const PrayerTimes: React.FC<PrayerTimesProps> = ({ timingsData }) => {
  if (!timingsData) {
    return <div>Loading...</div>;
  }

  const today = new Date();
  const todaysTimings = getTodaysTimings(today, timingsData)!;

  const timesToShow: TimingKey[] = ["fajr", "dhuhr", "asr", "maghrib", "isha",];

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
        </tbody>
      </table>
    </div>
  );
};

export default PrayerTimes;
import React from "react";
import { getFormatedTiming, getTodaysTimings } from "@/Utils/dateFormater";
import { PrayerTiming } from "@/payload-types";

interface PrayerTimesProps {
  timingsData: PrayerTiming;
}

type TimingKey = "fajr" | "fajr_iqamah" | "sunrise" | "dhuhr" | "dhuhr_iqamah" | "asr" | "asr_iqamah" | "maghrib" | "maghrib_iqamah" | "isha" | "isha_iqamah";

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
            const formattedTiming = getFormatedTiming(key, todaysTimings[key]!);
            const iqamahKey = `${key}_iqamah` as TimingKey;
            let iqamahTime = "N/A";
            if (key !== "fajr") {
              const iqamahKey = `${key}_iqamah` as TimingKey;
               iqamahTime = getFormatedTiming(iqamahKey, todaysTimings[iqamahKey]!);
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
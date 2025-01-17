import React from "react";
import { getTodaysTimings } from "@/Utils/dateFormater";
import { PrayerTiming } from "@/payload-types";

interface PrayerTimesProps {
  timingsData: PrayerTiming;
}

type TimingKey = "fajr" | "fajr_iqamah" | "sunrise" | "dhuhr" | "dhuhr_iqamah_1" |"dhuhr_iqamah_2" | "asr" | "asr_iqamah_1" | "maghrib" | "maghrib_iqamah" | "isha" | "isha_iqamah";
const timingDictonary = {
  "fajr": "AM",
  "fajr_iqamah": "AM",
  "sunrise": "AM",
  "dhuhr": "PM",
  "dhuhr_iqamah_1": "PM",
  "dhuhr_iqamah_2": "PM",
  "asr": "PM",
  "asr_iqamah_1": "PM",
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

  const todaysTimings = getTodaysTimings(today, timingsData);

  if (!todaysTimings) {
    return <div className="text-neutral">Error fetching prayer timings, <br/>
    please contact msa@wlu.ca</div>;
  }

  const timesToShow: TimingKey[] = ["fajr", "dhuhr", "asr", "maghrib", "isha"];

  return (
    <div className="mb-4 stats stats-vertical shadow lg:stats-horizontal">
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
            const formattedTiming = todaysTimings[key] + " " + timingDictonary[key];
            let iqamahTime = "N/A";

            if (key === "dhuhr") {
              return (
                <tr key={key}>
                  <td>{key.toUpperCase()}</td>
                  <td>{formattedTiming}</td>
                  <td>
                    {todaysTimings["dhuhr_iqamah_1"]} {timingDictonary["dhuhr_iqamah_1"]}<br />
                    {todaysTimings["dhuhr_iqamah_2"]} {timingDictonary["dhuhr_iqamah_2"]}
                  </td>
                </tr>
              );
            } else if (key === "asr") {
              iqamahTime = todaysTimings["asr_iqamah_1"] + " " + timingDictonary["asr_iqamah_1"];
            }
            return (
              <tr key={key}>
                <td>{key.toUpperCase()}</td>
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
import React from "react";

interface PrayerTimesProps {
  timingsData: DayTimings | null;
}

const PrayerTimes: React.FC<PrayerTimesProps> = ({ timingsData }) => {
  if (!timingsData) {
    return <div>Loading...</div>;
  }

  const orderedKeys: (keyof Timings)[] = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"];
  
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
          {orderedKeys.map((key) => {
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
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PrayerTimes;

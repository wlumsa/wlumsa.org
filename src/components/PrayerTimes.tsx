// components/PrayerTimes.tsx
import React from 'react';

interface Timings {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

interface PrayerTimesProps {
  timings: Timings;
}
const convertTo12HourFormat = (timeString?: string): string => {
    if (!timeString) {
      return "N/A"; // or any other placeholder you wish to display
    }
  
    const [hours, minutes] = timeString.split(":");
    if (!hours || !minutes) {
      return "N/A"; // Handle invalid time format
    }
  
    let period = "AM";
    let hoursInNumber = parseInt(hours, 10);
    if (hoursInNumber >= 12) {
      period = "PM";
      if (hoursInNumber > 12) {
        hoursInNumber -= 12;
      }
    } else if (hoursInNumber === 0) {
      hoursInNumber = 12;
    }
  
    return `${hoursInNumber}:${minutes} ${period}`;
  };

  const PrayerTimes: React.FC<PrayerTimesProps> = ({ timings }) => {
    // Check if timings is not null before rendering
    if (!timings) {
      // Render some fallback UI or a loading state
      return <div>Loading prayer times...</div>;
    }
  
    // Define the keys for the timings you want to display
    const timingKeysToShow: (keyof Timings)[] = [
      'Fajr',
      'Sunrise',
      'Dhuhr',
      'Asr',
      'Maghrib',
      'Isha',
    ];
  
    return (
      <div className="overflow-x-auto shadow mb-4">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {timingKeysToShow.map((key) => (
              <tr key={key}>
                <td>{key}</td>
                <td>{convertTo12HourFormat(timings[key])}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  

export default PrayerTimes;

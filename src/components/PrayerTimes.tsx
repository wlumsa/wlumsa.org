import React, { useEffect, useState } from "react";

interface Timings {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

interface TimingsData {
  data: {
    timings: Timings;
  };
}

const fetchTimings = async (): Promise<TimingsData> => {
  const city = "Waterloo";
  const country = "Canada";
  const state = "Ontario";
  const response = await fetch(
    `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&state=${state}&school=1`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch prayer time data from the API.");
  }
  return response.json() as Promise<TimingsData>;
};

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
  

const PrayerTimes: React.FC = () => {
  const [timings, setTimings] = useState<Timings>({
    Fajr: "",
    Sunrise: "",
    Dhuhr: "",
    Asr: "",
    Maghrib: "",
    Isha: "",
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTimings();
        setTimings(data.data.timings);
      } catch (error) {
        setError("Failed to load prayer times.");
        console.error(error);
      }
    };
    fetchData();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  const timingEntriesToShow: (keyof Timings)[] = [
    "Fajr",
    "Sunrise",
    "Dhuhr",
    "Asr",
    "Maghrib",
    "Isha",
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
          {timingEntriesToShow.map((key) => (
            <tr key={key}>
              <td>{key}</td>
              <td>{timings[key] ? convertTo12HourFormat(timings[key]) : "Loading..."}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PrayerTimes;

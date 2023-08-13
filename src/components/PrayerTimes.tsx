import React, { useEffect, useState } from "react";

interface TimingsData {
  data: {
    timings: {
      Fajr: string;
      Sunrise: string;
      Dhuhr: string;
      Asr: string;
      Maghrib: string;
      Isha: string;
    };
  };
}

const fetchTimings = async (): Promise<TimingsData> => {
    const city = "Waterloo";
    const country = "Canada";
    const state = "Ontario";
    const response = await fetch(`https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&state=${state}`);
    if (!response.ok) {
      console.error("Failed to fetch prayer time data from the API.");
    }
    return response.json() as Promise<TimingsData>;
};

const convertTo12HourFormat = (timeString: string | undefined): string => {
    if (!timeString)
        return "N/A";
    const [hours, minutes] = timeString.split(":");
    let period = "AM";
    if (!hours || !minutes)
        return "N/A";
    let hoursInNumber = parseInt(hours, 10);
    if (hoursInNumber > 12) {
      hoursInNumber -= 12;
      period = "PM";
    }
    return `${hoursInNumber}:${minutes} ${period}`;
};

const PrayerTimes: React.FC = () => {
    const [timings, setTimings] = useState<TimingsData>({ data: { timings: {
        Fajr: "",
        Sunrise: "",
        Dhuhr: "",
        Asr: "",
        Maghrib: "",
        Isha: "",
    } } });

    const timingEntriesToShow: (keyof TimingsData["data"]["timings"])[] = [
        "Fajr",
        "Sunrise",
        "Dhuhr",
        "Asr",
        "Maghrib",
        "Isha",
    ]; 

    useEffect(() => {
    const fetchData = async () => {
            try {
                const data = await fetchTimings();
                setTimings(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []); 
    
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
                        <td>
                            {convertTo12HourFormat(timings.data.timings[key])}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default PrayerTimes;
import { useEffect, useState } from "react";

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
        <div className="flex w-full py-8 px-6 bg-base-100 text-sm md:text-base lg:text-lg">
            <div className="grid flex-grow card rounded-box place-items-center mb-auto">
                <h3 className="text-xl md:text-2xl lg:text-3xl text-center pb-2 font-bold text-primary">Prayer Times</h3>
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
            </div>
            <div className="divider divider-horizontal"></div>
            <div className="grid flex-grow card rounded-box place-items-center">
                <div className="flex flex-col w-full">
                    <div className="grid card bg-base-100 rounded-box place-items-center">
                        <h3 className="text-xl md:text-2xl lg:text-3xl text-center pb-2 font-bold text-primary">Jummah Info</h3>
                        <div className="overflow-x-auto shadow mb-2">
                            <table className="table">
                                <thead>
                                <tr>
                                    <th>Time</th>
                                    <th>Room</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>1:45 PM</td>
                                    <td>MLU 103</td>
                                </tr>
                                <tr>
                                    <td>2:30 PM</td>
                                    <td>MLU 103</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        </div> 
                    <div className="divider"></div> 
                    <div className="grid card bg-base-100 rounded-box place-items-center">
                        <h3 className="text-xl md:text-2xl lg:text-3xl text-center pb-2 font-bold text-primary">Prayer Rooms</h3>
                        <div className="stats stats-vertical lg:stats-horizontal shadow">
                        <div className="stat">
                            <div className="stat-title">Frank C. Peters</div>
                            <div className="stat-value">110</div>
                            <div className="stat-desc">Wudhu Station</div>
                        </div>
                        <div className="stat">
                            <div className="stat-title">Bricker Academic</div>
                            <div className="stat-value">103</div>
                            <div className="stat-desc">Washrooms Nearby</div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PrayerTimes;
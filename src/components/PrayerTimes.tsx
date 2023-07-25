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

const PrayerTimes: React.FC = () => {
    const [timings, setTimings] = useState<TimingsData>({ data: { timings: {
        Fajr: "",
        Sunrise: "",
        Dhuhr: "",
        Asr: "",
        Maghrib: "",
        Isha: "",
      } } });

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

    const timingEntriesToShow: (keyof TimingsData["data"]["timings"])[] = [
        "Fajr",
        "Sunrise",
        "Dhuhr",
        "Asr",
        "Maghrib",
        "Isha",
      ];    

    return (
        <div className="flex w-full py-8 px-4 bg-base-100">
            <div className="grid flex-grow card bg-base-100 rounded-box place-items-center">
                <div className="overflow-x-auto">
                    <h3 className="text-2xl text-center pb-2 font-bold text-accent">Prayer Times</h3>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Time</th>
                            </tr>
                        </thead>
                        <tbody className="text-neutral-content">
                        {timingEntriesToShow.map((key) => (
                            <tr key={key}>
                                <td>{key}</td>
                                <td>{timings.data.timings[key]}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="divider divider-horizontal"></div>
            <div className="grid flex-grow card bg-base-100 rounded-box place-items-center">
                <div className="flex flex-col  w-full">
                    <div className="grid card bg-base-100 rounded-box place-items-center">
                        <h3 className="text-2xl text-center pb-2 font-bold text-accent">Jummah Info</h3>
                        <div className="overflow-x-auto">
                            <table className="table">
                                <thead>
                                <tr>
                                    <th>Time</th>
                                    <th>Room</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>13:45</td>
                                    <td>MLU 103</td>
                                </tr>
                                <tr>
                                    <td>14:30</td>
                                    <td>MLU 103</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        </div> 
                    <div className="divider"></div> 
                    <div className="grid card bg-base-100 rounded-box place-items-center">
                        <h3 className="text-2xl text-center pb-2 font-bold text-accent">Prayer Rooms</h3>
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


const PrayerTimes: React.FC = () => {
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
                        <tr>
                            <th>Fajr</th>
                            <td>XX:XX</td>
                        </tr>
                        <tr>
                            <th>Sunrise</th>
                            <td>XX:XX</td>
                        </tr>
                        <tr>
                            <th>Dhuhr</th>
                            <td>XX:XX</td>
                        </tr>
                        <tr>
                            <th>Asr</th>
                            <td>XX:XX</td>
                        </tr>
                        <tr>
                            <th>Maghrib</th>
                            <td>XX:XX</td>
                        </tr>
                        <tr>
                            <th>Isha</th>
                            <td>XX:XX</td>
                        </tr>
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
                                    <td>1:45pm</td>
                                    <td>MLU 103</td>
                                </tr>
                                <tr>
                                    <td>2:30pm</td>
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
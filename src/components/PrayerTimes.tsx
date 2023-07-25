const PrayerTimes: React.FC = () => {
    return (
        <div className="flex w-full py-8 px-4 bg-base-100">
            <div className="grid flex-grow card bg-base-100 rounded-box place-items-center">
                <div className="overflow-x-auto">
                    <h3 className="text-2xl text-center pb-2 font-bold text-accent">Prayer Times</h3>
                    <table className="table">
                        <tbody className="text-accent-neutral-content">
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
                
            </div>
        </div>
    );
}

export default PrayerTimes;
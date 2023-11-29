import React from 'react';
import Link from 'next/link';
import JummahInfo from "./JummahInfo";
import PrayerRooms from "./PrayerRooms";
import PrayerTimes from "./PrayerTimes";

const PrayerSection: React.FC = () => {  
    return (
        <div id="prayer_info" className="flex w-full py-8 px-6 bg-base-100 text-sm md:text-base lg:text-lg">
            <div className="grid flex-grow card rounded-box place-items-center mb-auto">
                <h3 className="text-xl md:text-2xl lg:text-3xl text-center pb-2 font-bold text-primary hover:scale-105 duration-200">Prayer Times</h3>
                <PrayerTimes />
                <Link href="/prayertimings" className="btn btn-primary mt-4 text-secondary hover:bg-secondary hover:text-primary border-0 shadow hover:scale-105 duration-200">View Prayer Timings</Link>
                
            </div>
            <div className="divider divider-horizontal"></div>
            <div className="grid flex-grow card rounded-box place-items-center">
                <div className="flex flex-col w-full">
                    <div className="grid card bg-base-100 rounded-box place-items-center">
                        <h3 className="text-xl md:text-2xl lg:text-3xl text-center pb-2 font-bold text-primary hover:scale-105 duration-200">Jummah Info</h3>
                        <JummahInfo />
                    </div> 
                    <div className="divider"></div> 
                    <div className="grid card bg-base-100 rounded-box place-items-center">
                        <h3 className="text-xl md:text-2xl lg:text-3xl text-center pb-2 font-bold text-primary hover:scale-105 duration-200">Prayer Rooms</h3>
                        <PrayerRooms />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PrayerSection;
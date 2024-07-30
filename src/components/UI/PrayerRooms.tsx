import React from "react";
import { PrayerRoom } from "@/payload-types";

interface PrayerRoomsProps {
  prayerRoomsData: PrayerRoom[];
}


const PrayerRooms: React.FC<PrayerRoomsProps> = ({ prayerRoomsData }) => {
  return (
    <div className="stats stats-vertical shadow lg:stats-horizontal">
      {prayerRoomsData.map((room, index) => (
        <div className="stat" key={index}>
          <div className="stat-title">{room.building}</div>
          <div className="stat-value">{room.room_number}</div>
          <div className="stat-desc">{room.description}</div>
        </div>
      ))}
    </div>
  );
};

export default PrayerRooms;

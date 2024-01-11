import React from "react";


interface PrayerRoomItem {
  building: string;
  roomNumber: number;
  description: string;
}
interface PrayerRoomsProps {
  prayerRoomsData: PrayerRoomItem[]; // The type you defined for prayer room items
}
const PrayerRooms: React.FC<PrayerRoomsProps> = ({ prayerRoomsData }) => {
 

  return (
    <div className="stats stats-vertical shadow lg:stats-horizontal">
      {prayerRoomsData.map((room, index) => (
        <div className="stat" key={index}>
          <div className="stat-title">{room.building}</div>
          <div className="stat-value">{room.roomNumber}</div>
          <div className="stat-desc">{room.description}</div>
        </div>
      ))}
    </div>
  );
};

export default PrayerRooms;

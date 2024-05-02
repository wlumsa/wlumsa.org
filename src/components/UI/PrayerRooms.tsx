import React from "react";


interface PrayerRoomItem {
  building: string;
  roomNumber: number;
  description: string;
}
interface PrayerRoomsProps {
  prayerRoomsData: PrayerRoomItem[]; // The type you defined for prayer room items
}
/**
 * Renders a list of prayer rooms.
 *
 * @component
 * @param {Object[]} prayerRoomsData - The data for the prayer rooms.
 * @param {string} prayerRoomsData[].building - The building name of the prayer room.
 * @param {string} prayerRoomsData[].roomNumber - The room number of the prayer room.
 * @param {string} prayerRoomsData[].description - The description of the prayer room.
 * @returns {JSX.Element} The rendered PrayerRooms component.
 */
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

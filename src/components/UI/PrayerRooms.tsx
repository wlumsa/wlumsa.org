import React from "react";
import { PrayerRoom } from "@/payload-types";

interface PrayerRoomsProps {
  prayerRoomsData: PrayerRoom[];
}

const PrayerRooms: React.FC<PrayerRoomsProps> = ({ prayerRoomsData }) => {
  return (
    <div className="grid gap-3 divide-y divide-base-300 lg:grid-flow-col lg:divide-y-0">
      {prayerRoomsData.map((room, index) => (
        <div className="min-w-0 pb-3 last:pb-0 lg:px-3 lg:pb-0" key={index}>
          <div className="text-sm text-base-content/80">{room.building}</div>
          <div className="my-1 text-2xl font-bold tabular-nums">{room.room_number}</div>
          <div className="text-xs text-base-content/80">{room.description}</div>
        </div>
      ))}
    </div>
  );
};

export default PrayerRooms;

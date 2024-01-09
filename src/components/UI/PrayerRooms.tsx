import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import db from "../../firebase";

interface PrayerRoomItem {
  building: string;
  roomNumber: number;
  description: string;
}

const PrayerRooms: React.FC = () => {
  const [prayerRooms, setPrayerRooms] = useState<PrayerRoomItem[]>([]);

  useEffect(() => {
    const fetchPrayerRooms = async () => {
      const prayerRoomsCollectionRef = collection(db, "PrayerRooms");
      const querySnapshot = await getDocs(prayerRoomsCollectionRef);

      const prayerRoomsData = querySnapshot.docs.map(
        (doc) => doc.data() as PrayerRoomItem
      );

      setPrayerRooms(prayerRoomsData);
    };

    fetchPrayerRooms();
  }, []);

  return (
    <div className="stats stats-vertical shadow lg:stats-horizontal">
      {prayerRooms.map((room, index) => (
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

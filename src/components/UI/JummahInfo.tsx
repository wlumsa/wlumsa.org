import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import db from "../../firebase";

interface JummahItem {
  time: string;
  room: string;
}

const JummahInfo: React.FC = () => {
  const [jummahInfo, setJummahInfo] = useState<JummahItem[]>([]);

  useEffect(() => {
    const fetchJummahInfo = async () => {
      const jummahCollectionRef = collection(db, "Jummah");
      const querySnapshot = await getDocs(jummahCollectionRef);

      const jummahInfoData = querySnapshot.docs.map(
        (doc) => doc.data() as JummahItem
      );
      setJummahInfo(jummahInfoData);
    };

    fetchJummahInfo();
  }, []);

  return (
    <div className="stats stats-vertical shadow lg:stats-horizontal ">
      <table className="table">
        <thead>
          <tr>
            <th>Time</th>
            <th>Room</th>
          </tr>
        </thead>
        <tbody>
          {jummahInfo.map((item, index) => (
            <tr key={index}>
              <td>{item.time}</td>
              <td>{item.room}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JummahInfo;

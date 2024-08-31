import React from "react";
import { JummahTiming } from "@/payload-types";
import { formatJummahTiming } from "@/Utils/dateFormater";
interface JummahProps {
  jummahInfo : JummahTiming[],
}
/**
 * JummahInfo component displays the Jummah prayer time and room information in a table format.
 *
 * @param jummahInfo - An array of JummahItem objects containing the time and room information.
 */
const JummahInfo: React.FC<JummahProps> = ({ jummahInfo }) => {
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
              <td>{formatJummahTiming(item.timing)}</td>
              <td>{item.building} {item.room_number}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JummahInfo;

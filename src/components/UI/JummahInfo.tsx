import React from "react";
import { JummahTiming } from "@/payload-types";
import { formatJummahTiming } from "@/Utils/dateFormater";
interface JummahProps {
  jummahInfo: JummahTiming[];
}
/**
 * JummahInfo component displays the Jummah prayer time and room information in a table format.
 *
 * @param jummahInfo - An array of JummahItem objects containing the time and room information.
 */
const JummahInfo: React.FC<JummahProps> = ({ jummahInfo }) => {
  return (
    <div className="max-w-full overflow-x-auto rounded-lg border border-base-content/15">
      <table className="table text-base-content tabular-nums [&_th]:text-base-content [&_tr]:border-base-content/15">
        <thead>
          <tr>
            <th scope="col">Time</th>
            <th scope="col">Room</th>
          </tr>
        </thead>
        <tbody>
          {jummahInfo.map((item, index) => (
            <tr
              key={
                item.id ??
                `${item.building}-${item.room_number ?? "room"}-${
                  item.timing
                }-${index}`
              }
            >
              <td>{formatJummahTiming(item.timing)}</td>
              <td>
                {item.building} {item.room_number}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JummahInfo;

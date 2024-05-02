import React from "react";

/**
 * JummahInfo component displays the Jummah prayer time and room information in a table format.
 *
 * @param jummahInfo - An array of JummahItem objects containing the time and room information.
 */
const JummahInfo: React.FC<{ jummahInfo: JummahItem[] }> = ({ jummahInfo }) => {
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

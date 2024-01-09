import React from "react";




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

import React, {useState} from "react";
import "./LeaderBoard.css";

const getSnakePoints = () =>
  JSON.parse(localStorage.getItem("snake-points")) || [];

const LeaderBoard = () => {
  const [pointsList, setPointsList] = useState(getSnakePoints());

  window.addEventListener("storage", () => {
    setPointsList(getSnakePoints());
  });

  return (
    <div className="LeaderBoard">
      <div className="LeaderBoard-header">Top 5</div>
      <div className="LeaderBoard-points">
        {pointsList
          .sort((a, b) => b - a)
          .slice(0, 5)
          .map((points, i) => (
            <div key={`${points}-${i}`}>{points} pistettä</div>
          ))}
      </div>
    </div>
  );
};

export default LeaderBoard;

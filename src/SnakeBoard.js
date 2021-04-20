import React, {useState} from "react";
import {useInterval} from "./utils";
import "./SnakeBoard.css";

const SnakeBoard = ({points, setPoints}) => {
  const height = 30;
  const width = 30;
  var initialRows = [];
  for (var i = 0; i < height; i++) {
    initialRows[i] = [];
    for (var j = 0; j < width; j++) {
      initialRows[i][j] = "blank";
    }
  }

  const randomPosition = () => {
    const position = {
      x: Math.floor(Math.random() * width),
      y: Math.floor(Math.random() * height)
    };
    return position;
  };

  const [rows, setRows] = useState(initialRows);
  const [snake, setSnake] = useState([{x: 0, y: 0}]);
  const [direction, setDirection] = useState("right");
  const [food, setFood] = useState(randomPosition);
  const [intervalId, setIntervalId] = useState();
  const [isGameOver, setIsGameOver] = useState(false);

  const changeDirectionWithKeys = e => {
    const {keyCode} = e;
    switch (keyCode) {
      case 37:
        setDirection("left");
        break;
      case 38:
        setDirection("top");
        break;
      case 39:
        setDirection("right");
        break;
      case 40:
        setDirection("bottom");
        break;
      default:
        break;
    }
  };
  document.addEventListener("keydown", changeDirectionWithKeys);

  const displayRows = rows.map((row, i) => (
    <div className="Snake-row" key={i}>
      {row.map((tile, j) => (
        <div className={`tile ${tile}`} key={`${i}-${j}`} />
      ))}
    </div>
  ));

  const displaySnake = () => {
    const newRows = initialRows;
    snake.forEach(tile => {
      newRows[tile.x][tile.y] = "snake";
    });
    newRows[food.x][food.y] = "food";
    setRows(newRows);
  };

  const checkGameOver = () => {
    const head = snake[0];
    const body = snake.slice(1, -1);
    return body.find(b => b.x === head.x && b.y === head.y);
  };

  const moveSnake = () => {
    const newSnake = [];
    switch (direction) {
      case "right":
        newSnake.push({x: snake[0].x, y: (snake[0].y + 1) % width});
        break;
      case "left":
        newSnake.push({x: snake[0].x, y: (snake[0].y - 1 + width) % width});
        break;
      case "top":
        newSnake.push({x: (snake[0].x - 1 + height) % height, y: snake[0].y});
        break;
      case "bottom":
        newSnake.push({x: (snake[0].x + 1) % height, y: snake[0].y});
        break;
      default:
        break;
    }

    if (checkGameOver()) {
      setIsGameOver(true);
      clearInterval(intervalId);
      const pointsList = JSON.parse(localStorage.getItem("snake-points")) || [];
      pointsList.push({name: "Taru", points});
      // [5,8] -> [{name: "Nimi", points: 5}, {name: "Nimi", points: 8}]
      localStorage.setItem("snake-points", JSON.stringify(pointsList));
      window.dispatchEvent(new Event("storage"));
    }

    // Lisätään madolle joka askeleella uusi pala,
    // joka poistetaan jos mato ei saa tällä askeleella ruokaa
    snake.forEach(tile => {
      newSnake.push(tile);
    });
    // Tarkistetaan saako mato ruuan kiinni
    const madonPaa = snake[0];
    if (madonPaa.x === food.x && madonPaa.y === food.y) {
      setFood(randomPosition);
      setPoints(points + 1);
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
    displaySnake();
  };

  useInterval(moveSnake, 150, setIntervalId);

  return (
    <div className="Snake-board">
      {displayRows}
      {isGameOver && <div className="Game-over">Game over!</div>}
    </div>
  );
};

export default SnakeBoard;

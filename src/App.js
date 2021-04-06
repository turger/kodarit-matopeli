import "./App.css";
import SnakeBoard from "./SnakeBoard";
import Points from "./Points";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">Matopeli</header>
      <Points points={3} />
      <SnakeBoard />
    </div>
  );
};

export default App;

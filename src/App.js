import Board from "./Board";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <h1>Tic Tac Toe</h1>
      <h2>Play tic tac toe with history of moves!</h2>
      <Board />
    </div>
  );
}

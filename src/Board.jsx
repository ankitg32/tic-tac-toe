import React, { useState, useEffect } from "react";
import Square from "./Square";

function checkWinner(state) {
  const winLogics = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  let i = 0;
  let winLogic = null;
  let winner = null;
  while (i < winLogics.length && winLogic === null) {
    const [a, b, c] = winLogics[i];
    if (state[a] && state[a] === state[b] && state[a] === state[c]) {
      winLogic = winLogics[i];
      winner = state[a];
    }
    i++;
  }
  return { winner, logic: winLogic };
}

export default function Board() {
  const initialState = Array(9).fill(null);
  const initialHistory = Array(9).fill(null);
  const [state, setState] = useState(initialState);
  const [history, setHistory] = useState(initialHistory);
  const [currMove, setCurrMove] = useState(0);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    const { winner, logic } = checkWinner(state);
    if (logic) {
      setWinner(winner);
    }
    console.log("FOO ", history);
  });

  function handleClick(i) {
    if (winner) {
      return;
    }
    if (state[i]) {
      return;
    }
    const newState = [...state];
    newState[i] = currMove % 2 === 0 ? "X" : "O";
    const newHistory = [...history];
    newHistory[currMove] = newState;
    setHistory(newHistory);
    setState(newState);
    setCurrMove(currMove + 1);
  }

  function handleReset() {
    setState(initialState);
    setHistory(initialHistory);
    setCurrMove(0);
    setWinner(null);
  }

  function handleTimeTravel(move) {
    const newState = history[move];
    const newHistory = history.slice(0, move + 1);
    setHistory(newHistory);
    setState(newState);
    // travelling to a move means showing state AFTER THAT move was done, so current move will be move+1
    setCurrMove(move + 1);
    setWinner(null);
  }

  function getAvailableHistory() {
    const availableHistory = history.filter((state) => !!state);
    return availableHistory;
  }

  return (
    <div className="board">
      <div className="board-header">
        {winner ? (
          <h3 className="board-header--info">Player {winner} won!</h3>
        ) : (
          <p className="board-header--info">
            Your turn, player {currMove % 2 === 0 ? "X" : "O"}
          </p>
        )}
        <button className="board-header--reset button" onClick={handleReset}>
          Reset
        </button>
      </div>
      <div className="board-main-container">
        <div className="board-content">
          <div className="board-row">
            <Square
              id={0}
              value={state[0]}
              handleClick={() => handleClick(0)}
            />
            <Square
              id={1}
              value={state[1]}
              handleClick={() => handleClick(1)}
            />
            <Square
              id={2}
              value={state[2]}
              handleClick={() => handleClick(2)}
            />
          </div>
          <div className="board-row">
            <Square
              id={3}
              value={state[3]}
              handleClick={() => handleClick(3)}
            />
            <Square
              id={4}
              value={state[4]}
              handleClick={() => handleClick(4)}
            />
            <Square
              id={5}
              value={state[5]}
              handleClick={() => handleClick(5)}
            />
          </div>
          <div className="board-row">
            <Square
              id={6}
              value={state[6]}
              handleClick={() => handleClick(6)}
            />
            <Square
              id={7}
              value={state[7]}
              handleClick={() => handleClick(7)}
            />
            <Square
              id={8}
              value={state[8]}
              handleClick={() => handleClick(8)}
            />
          </div>
        </div>
        <div className="board-sidebar">
          {getAvailableHistory().length > 1 &&
            getAvailableHistory().map((state, move) => {
              return (
                <button
                  className="button"
                  onClick={() => handleTimeTravel(move)}
                >
                  Rollback to Move #{move + 1}
                </button>
              );
            })}
        </div>
      </div>
    </div>
  );
}

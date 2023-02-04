import React from "react";

export default function Square(props) {
  return (
    <div className="board-square" onClick={props.handleClick}>
      {props.value}
    </div>
  );
}

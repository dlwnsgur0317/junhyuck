import board from '../images/board2.png'
import noLineBoard from '../images/nolineField.png'
import logo from '../images/blackLogo.png'
import React from 'react';
import { Stage, Layer, Line, Circle } from 'react-konva';
import { useState,useRef, useEffect } from 'react';


export const Board = () => {
  //펜기능
  const [lines, setLines] = useState([]);
  const isDrawing = useRef(false);
  const lastLine = useRef(null);

  const handleMouseDown = (e) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    const newLine = {
      points: [pos.x, pos.y, pos.x, pos.y],
      stroke: 'black',
      strokeWidth: 2,
      lineCap: 'round',
      lineJoin: 'round',
    };
    setLines([...lines, newLine]);
    lastLine.current = newLine;
  };

  const handleMouseMove = (e) => {
    if (!isDrawing.current) return;
    const pos = e.target.getStage().getPointerPosition();
    let newPoints = [...lastLine.current.points];
    newPoints[2] = pos.x;
    newPoints[3] = pos.y;
    lastLine.current.points = newPoints;
    setLines([...lines.slice(0, -1), lastLine.current]);
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const [field, setField] = useState(board);

  const fnChangeBoard = () => {
    field === board ? setField(noLineBoard) : setField(board);
  };
  return (
    <div className="boardContainer">
      <Stage
        style={{ position: "absolute", top: 0, left: 0}}
        width={1356}
        height={902}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <Layer>
        {lines.map((line, i) => (
          <Line key={i} {...line} />
        ))}
        </Layer>
      </Stage>
      <img src={field} alt="Soccer field" draggable={false} className="board" />
      <div className="menuContainer">
        <div className="changeBoard" onClick={fnChangeBoard}>
          변경
        </div>
      </div>
    </div>
  );
};

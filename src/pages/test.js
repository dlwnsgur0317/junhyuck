import React, { useEffect, useRef } from 'react';
import { fabric } from 'fabric';
import SoccerField from '../images/board2.png'; // import the soccer field image

export const Test = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current);

    // set canvas dimensions to match the image
    const image = new Image();
    image.onload = () => {
      canvas.setDimensions({ width: image.width, height: image.height });
      canvas.setBackgroundImage(SoccerField, canvas.renderAll.bind(canvas));
    };
    image.src = SoccerField;

    // add player circles to the canvas
    const player1 = new fabric.Circle({
      radius: 10,
      fill: 'red',
      left: 100,
      top: 100,
      selectable: true,
      hasControls: false,
      hasBorders: false,
    });
    const player2 = new fabric.Circle({
      radius: 10,
      fill: 'blue',
      left: 200,
      top: 200,
      selectable: true,
      hasControls: false,
      hasBorders: false,
    });
    canvas.add(player1, player2);

    // add a line to represent a path
    const path = new fabric.Line([100, 100, 200, 200], {
      stroke: 'green',
      strokeWidth: 2,
      selectable: false,
      evented: false,
    });
    canvas.add(path);

    // add a text object to label a player
    const label = new fabric.Text('Player 1', {
      left: 80,
      top: 80,
      fontSize: 16,
      selectable: false,
      evented: false,
    });
    canvas.add(label);

    // handle player selection and movement
    canvas.on('mouse:down', (event) => {
      const { target } = event;
      if (target && target.selectable) {
        canvas.setActiveObject(target);
      } else {
        canvas.discardActiveObject();
      }
    });
    canvas.on('mouse:move', (event) => {
      if (canvas.getActiveObject()) {
        const { offsetX, offsetY } = event.e;
        canvas.getActiveObject().set({
          left: offsetX,
          top: offsetY,
        });
        canvas.renderAll();
      }
    });
  }, []);

  return (
    <canvas ref={canvasRef} />
  );
};
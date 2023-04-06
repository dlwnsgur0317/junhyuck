import React, { useState, useRef } from 'react';
import { fabric } from 'fabric';

export const Test = () => {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);

  function handleMouseDown(event) {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.globalCompositeOperation = 'destination-out';
    setDrawing(true);
  }

  function handleMouseMove(event) {
    if (drawing) {
      const canvas = canvasRef.current;
      const pointer = canvas.getPointerCoordinates(event.e);
      const brushSize = 10; // choose the size of the brush
      const brush = new fabric.Circle({
        left: pointer.x - brushSize / 2,
        top: pointer.y - brushSize / 2,
        radius: brushSize / 2,
        fill: 'white',
        selectable: false,
        hasBorders: false,
        hasControls: false,
        originX: 'center',
        originY: 'center',
      });
      canvas.add(brush);
      canvas.renderAll();
    }
  }

  function handleMouseUp() {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.globalCompositeOperation = 'source-over';
    setDrawing(false);
  }

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    />
  );
}

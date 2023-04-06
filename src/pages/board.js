import board from '../images/board2.png'
import noLineBoard from '../images/nolineField.png'
import logo from '../images/logo.png'
import React from 'react';
import { fabric } from 'fabric';
import { useState,useRef, useEffect } from 'react';
import boardWord from '../images/boardWord.png'
import cursorPen from '../images/pen.png'
import { Eraser, Nothing, Pen, Player } from '../modules/boardSubmenu';

const menu = [
  { name: "펜", icon: "fa-solid fa-pen", value:'pen'},
  { name: "지우개", icon: "fa-solid fa-eraser", value:'eraser'},
  { name: "이동", icon: "fas fa-arrows", value:'move' },
  { name: "메모", icon: "fas fa-sticky-note", value:'memo'},
  { name: "도구", icon: "fas fa-toolbox", value:'toolBox'},
  { name: "선수1", icon: "fas fa-users", value:'player1' },
  { name: "선수2", icon: "fas fa-users", value:'player2'},
  { name: "필드변경", icon: "fas fa-sync", value: 'changeField'}
];

export const Board = () => {
  const [tool, setTool] = useState("pen");
  const [brushColor, setBrushColor] = useState("black");
  const [brushSize, setBrushSize] = useState(10);
  const [isDrawing, setIsDrawing] = useState(false);
  const [canvas, setCanvas] = useState(null);
  const [toolName, setToolName] = useState("펜");
  const [field, setField] = useState(board);
  const [player1Color, setPlayer1Color] = useState('black')
  const [playerSub, setPlaterSub] = useState('black')
  const [playerSize, setPlayerSize] = useState(20)
  


  const fnSetTool = (item, item2) => {
    if (item === "changeField") {
      fnChangeBoard();
      setToolName("펜");
    } else if (item === "eraser") {
      setTool(item);
      setToolName(item2);
      setBrushColor("rgba(0,0,0,0)");
    } else {
      setToolName(item2);
      setTool(item);
    }
  };

  //캔버스 만들기
  const canvasRef = useRef(null);


  useEffect(() => {
    if (canvas && tool === "changeField") {
      // Remove existing background image
      canvas.getObjects().forEach((object) => {
        if (object.type === "image" && object.name === "backgroundImage") {
          canvas.remove(object);
        }
      });

      // Add new background image
      var backgroundImage = new fabric.Image.fromURL(field, function (img) {
        img.set({
          top: 0,
          left: 0,
          selectable: false,
          evented: false,
          name: "backgroundImage", // Add a name to identify the background image
        });
        img.scaleX = 1.473;
        img.scaleY = 1.536;
        canvas.add(img);
        canvas.renderAll();
        setTool("pen");
      });
    } else if (canvas) {
      canvas.isDrawingMode = tool === "pen" || tool === "eraser";
       canvas.freeDrawingBrush =
         tool === "pen"
           ? new fabric.PencilBrush(canvas)
           : new fabric.PencilBrush(canvas, {
               color: "rgba(0,0,0,0)",
               strokeWidth: brushSize,
               globalCompositeOperation: "destination-out",
             });
    } else {
      const newCanvas = new fabric.Canvas(canvasRef.current, {
        isDrawingMode: tool === "pen" || tool === "eraser",
        freeDrawingBrush:
          tool === "pen"
            ? new fabric.PencilBrush(canvas)
            : new fabric.PencilBrush(canvas, {
                color: "rgba(0,0,0,0)",
                strokeWidth: brushSize,
                globalCompositeOperation: "destination-out",
              }),
              
      });

      // Add background image
      var backgroundImage = new fabric.Image.fromURL(field, function (img) {
        img.set({
          top: 0,
          left: 0,
          selectable: false,
          evented: false,
        });
        img.scaleX = 1.473;
        img.scaleY = 1.536;
        newCanvas.add(img);
        newCanvas.renderAll();
      });

      newCanvas.setBackgroundColor("rgba(0,0,0,0)", () => {
        newCanvas.renderAll();
      });
      setCanvas(newCanvas);
    }
  }, [tool, brushSize, canvas, field]);

  //캔버스 모두 지우기
  const fnClearCanvas = () => {
    if(window.confirm('모든 작업을 지우시겠습니까?')){
      canvas.clear()
      var backgroundImage = new fabric.Image.fromURL(field, function (img) {
        img.set({
          top: 0,
          left: 0,
          selectable: false,
          evented: false,
          name: "backgroundImage", // Add a name to identify the background image
        });
        img.scaleX = 1.473;
        img.scaleY = 1.536;
        canvas.add(img);
        canvas.renderAll();
      });
    }
  }

  //선수추가
  const handleButtonClick = () => {
    const canvasMargin = 40;
    const left =
      Math.random() * (canvas.width - canvasMargin * 2) + canvasMargin;
    const top =
      Math.random() * (canvas.height - canvasMargin * 2) + canvasMargin;
    const right =
      Math.random() * (canvas.width - canvasMargin * 2) + canvasMargin;
    const bottom =
      Math.random() * (canvas.height - canvasMargin * 2) + canvasMargin;
    // Create the circular mask
    const circle = new fabric.Circle({
      left,
      top,
      right,
      bottom,
      radius: playerSize,
      fill: player1Color,
      strokeWidth:5,
      stroke: playerSub,
    });

    const playerNumber = canvas.getObjects().length;
    const text = new fabric.Text(canvas.getObjects().length.toString(), {
      left: playerNumber < 10 ? left + playerSize-(playerSize/5) : left + playerSize-(playerSize/44*22),
      top: top + playerSize-(playerSize/20*11) ,
      fontSize: playerSize+4, // adjust the font size as desired
      fill: player1Color === '#ffffff' ? 'black' : "white",
    });
    const group = new fabric.Group([circle, text], {
      selectable: true,
    });

    canvas.add(group);
    canvas.renderAll();

    //선수 색상 변경
    const colorInput = document.getElementById("color");
    colorInput.addEventListener("input", () => {
      const selectedObjects = canvas.getActiveObjects();
      if (selectedObjects.length >= 1) { // multiple objects selected
        selectedObjects.forEach((obj) => {
          if (obj instanceof fabric.Group) {
            obj.getObjects().forEach((groupObj) => {
              if (groupObj instanceof fabric.Circle) {
                console.log('asd')
                groupObj.set("fill", colorInput.value);
                groupObj.set("stroke", colorInput.value);
              }
            });
          }
        });
      }
      canvas.renderAll();
    });

    //선수 크기 변경
    const rangeInput = document.getElementById("range");

    rangeInput.addEventListener("input", () => {
      const groups = canvas.getObjects().filter((obj) => obj.type === "group");
      const rangeValue = parseInt(rangeInput.value);

      groups.forEach((group) => {
        const scaleFactor = rangeValue / playerSize ;
        group.scale(scaleFactor).setCoords();
      });

      canvas.renderAll();
    });

    //요소 삭제
    document.addEventListener("keydown", function(e) {
      if (e.code === "Backspace") {
        const activeObjects = canvas.getActiveObjects();
        activeObjects.forEach(function(object) {
          canvas.remove(object);
        });
        canvas.discardActiveObject().renderAll();
        e.preventDefault();
      }
    });
  }; 

  const fnChangeBoard = () => {
    setTool("pen");
    if (window.confirm("필드 변경시 현재 작업중인 내용이 모두 삭제됩니다.")) {
      field === board ? setField(noLineBoard) : setField(board);
      setTool("changeField");
    } else {
      return;
    }
  };

  return (
    <div className="boardContainer">
      <canvas ref={canvasRef} width={1300} height={900} />
      <div className="menuContainer">
        {menu.map((arr, idx) => {
          return (
            <div className="buttonBox" key={idx}>
              <button
                type="button"
                className={
                  arr.value === tool
                    ? "mt-1 ml-2 btn btn-secondary"
                    : "mt-1 ml-2 btn btn-light"
                }
                onClick={() => {
                  fnSetTool(arr.value, arr.name);
                }}
              >
                <i className={`${arr.icon}`}></i>
                <div>{arr.name}</div>
              </button>
            </div>
          );
        })}
      </div>
      <div className="subMenuContainer mt-3">
        <div className="subMenuTitle">{toolName}</div>
        {tool === "pen" ? (
          <Pen
            setBrushColor={setBrushColor}
            setBrushSize={setBrushSize}
            brushColor={brushColor}
            brushSize={brushSize}
          />
        ) : tool === "eraser" ? (
          <Eraser setBrushSize={setBrushSize} brushSize={brushSize} fnClearCanvas={fnClearCanvas}/>
        ) : tool === "player1" ? (
          <Player handleButtonClick={handleButtonClick} player1Color={player1Color} setPlayer1Color={setPlayer1Color} plyerSize={playerSize} setPlayerSize={setPlayerSize} setPlaterSub={setPlaterSub}/>
        ) : (
          <Nothing />
        )}
      </div>
    </div>
  );
};

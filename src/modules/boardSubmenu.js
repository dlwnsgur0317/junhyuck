import { useState } from 'react';
import logo from '../images/boardWord.png'
import eraserIcon from '../images/eraserIcon.png'

export const Pen = ({ setBrushColor, setBrushSize, brushColor, brushSize }) => {
  return (
    <div >
    <div className="none mt-3">
    <div className='subMenuWrap'>
      <input
        className="penTool"
        type="color"
        id="color"
        value={brushColor}
        onChange={(e) => setBrushColor(e.target.value)}
      />
      <input
        className="range"
        type="range"
        id="thickness"
        min={1}
        max={20}
        value={brushSize}
        onChange={(e) => setBrushSize(e.target.value)}
      />
    </div>
      </div>
    </div>
  );
};

export const Eraser = ({ setEraserSize, fnClearCanvas, tool, setEraserClick, eraserClick }) => {
  const eraserIcon =(['smallEraserIcon','middleEraserIcon', 'largeEraserIcon'])
  
  const fnsertEraserSize = (item) => {
    setEraserClick(item)
    eraserClick === 'smallEraserIcon' ? setEraserSize(12) : eraserClick === 'middleEraserSize' ? setEraserSize(26) : setEraserSize(34)
  }
  return (
    <>
      <div className="none mt-3">
        <div className="eraserMenuWrap">
          <div className="eraserImageWrap">
            {eraserIcon.map ((arr, idx) => {
              return <div className={`eraserIcon ${tool !== 'eraser' ? null : arr === eraserClick ? 'eraserIconClick' : null }`} id={arr} key={idx} onClick={() => {fnsertEraserSize(arr)}}/>
            })}
          </div>
          <div className="allClearWrap">
            <button
              type="button"
              className="btn btn-secondary allClear"
              onClick={fnClearCanvas}
            >
              모두지우기
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export const Player = ({
  addPlayer1,
  addPlayer2,
  player1Color,
  setPlayer1Color,
  plyerSize,
  setPlayerSize,
  setPlayer1Sub,
  setPlayer2Sub,
  player2Color,
  setPlayer2Color,
}) => {
  const fnSetColor = (item1, item2) => {
    if(item1==='player1'){
      setPlayer1Color(item2);
      setPlayer1Sub(item2);
    }else{
      setPlayer2Color(item2);
      setPlayer2Sub(item2);
    }
  };
  return (
    <>
      <div className="none mt-3">
        <div className="playerInputWrap">
          <div className="subMenuWrap2">
            <div className="addPlayer" onClick={addPlayer1} style={{backgroundColor: player1Color}}>
              <img src={logo} />
            </div>
            <input
              className="playerColor"
              type="color"
              id="color"
              value={player1Color}
              onChange={(e) => fnSetColor('player1', e.target.value)}
            />
          </div>
          <div className="subMenuWrap2">
            <div className="addPlayer2" onClick={addPlayer2} style={{backgroundColor: player2Color}}>
              <img src={logo} />
            </div>
            <input
              className="playerColor"
              type="color"
              id="color"
              value={player2Color}
              onChange={(e) => fnSetColor('player2', e.target.value)}
            />
          </div>
        </div>
        <div className="inputRangeWrap">
          <input
            className="range mt-3"
            type="range"
            id="range"
            min={15}
            max={40}
            value={plyerSize}
            onChange={(e) => {
              setPlayerSize(Number(e.target.value));
            }}
          />
        </div>
      </div>
    </>
  );
};

export const Nothing = () => {
    return (
        <div>
            <div className='none mt-3'>
            </div>
        </div>
    )
}
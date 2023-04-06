import logo from '../images/logo.png'
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

export const Eraser = ({ setBrushSize, brushSize, fnClearCanvas }) => {
  return (
    <>
      <div className="none mt-3">
      <div className='subMenuWrap'>
        <input
          className="mt-4 range"
          type="range"
          id="thickness"
          min={1}
          max={20}
          value={brushSize}
          onChange={(e) => setBrushSize(e.target.value)}
        />
        <button type="button" className="btn btn-secondary allClear" onClick={fnClearCanvas}>모두지우기</button>
        </div>
      </div>
    </>
  );
};

export const Player = ({handleButtonClick, player1Color, setPlayer1Color, plyerSize,setPlayerSize, setPlaterSub}) => {

  const fnSetColor = (item) => {
    setPlayer1Color(item)
    setPlaterSub(item)
  }
  return (

    <>
      <div className="none mt-3">
      <div className='subMenuWrap'>
        <div onClick={handleButtonClick}> 선수추가</div>
        <input
        className="playerColor"
        type="color"
        id="color"
        value={player1Color}
        onChange={(e) => fnSetColor(e.target.value)}
      />
      <input
        className="range"
        type="range"
        id="range"
        min={15}
        max={40}
        value={plyerSize}
        onChange={(e) => {setPlayerSize(Number(e.target.value))}}
      />
        </div>
      </div>
    </>
  )
}

export const Nothing = () => {
    return (
        <div>
            <div className='none mt-3'>
            </div>
        </div>
    )
}
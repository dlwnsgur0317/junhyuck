import { useState } from 'react';
import logo from '../images/logo.png'
import { useNavigate } from 'react-router-dom'

const navMenu = ["Information", "Training", "Board"];
const trainingMenu = [
  {
    name: "Warm Up",
    click: false,
    menu: ["With Ball", "Without Ball", "E.T.C"],
  },
  { name: "Drill", click: false, menu: ["Pass", "Drible", "Shoot", "E.T.C"] },
  { name: "Game", click: false, menu: ['Shooting Game', 'Pass Game', 'E.T.C'] },
];

export const Navbar =() => {

    const navigate = useNavigate()
    const [menu, setMenu] = useState(0)

    const mouseOut = (item) => {
      if (item !== 1) {
        setMenu(0);
      }
    }

    const moveMain =(item) => {
      if(item === 0){
        navigate('/')
      }
    }

    return (
      <>
        <nav className="navbar navbar-dark bg-dark">
          <img
            src={logo}
            width="100"
            className="d-inline-block align-top navbarLogo"
            alt=""
            onClick={() => {navigate('/')}}
          />
          <div className="searchBox">
            <input type="text" className="form-control searchInput" />
            <i className="fa-solid fa-magnifying-glass searchIcon"></i>
          </div>
          <div className="menuContainer">
            {navMenu.map((arr, idx) => {
              return (
                <div className="menuWrap">
                  <div
                    className={`menu ${menu === idx + 1 ? "click" : null}`}
                    onMouseEnter={() => {
                      setMenu(idx + 1);
                    }}
                    onMouseLeave={() => {mouseOut(idx)}}
                    onClick={() => {moveMain(idx)}}
                  >
                    {" "}
                    {arr}{" "}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="loginWrap">
            <i className="fa fa-sign-in loginIcon"></i>
            <div className="login ml-1"> Login </div>
          </div>
        </nav>
        <div className={`trainingContainer ${menu === 2 ? 'showOut' : null }`}>
          {trainingMenu.map((arr, idx) => {
            return (
              <div
                className={`trainingMenu`}
                key={idx}
                onMouseEnter={() => {
                  setMenu(2);
                }}
                onMouseLeave={() => {
                  setMenu(0)
                }}
                onClick={() => {navigate(`/training/${arr.name}`); setMenu(0)}}
              >
                {arr.name}
                <i
                  className={`fa fa-angle-up ml-1 mt-3`}
                ></i>
                <hr className='mainHr'></hr>
                <div className={`trainingWrap`}>
                {trainingMenu[idx].menu.map((arr, idx2) => {
                  return (
                      <div className={`trainingBox`}>
                        <div> {arr} </div>
                        {idx2+1 === trainingMenu[idx].menu.length ? null : <hr style={{width: "50%"}}></hr>}
                      
                    </div>
                  );
                })}
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
}
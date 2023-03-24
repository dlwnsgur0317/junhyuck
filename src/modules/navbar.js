import { useEffect, useState } from 'react';
import logo from '../images/logo.png'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import {AuthContext} from '../comm/index'

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
export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [menu, setMenu] = useState(0);

  //전역변수
  const {session, setSession} = useContext(AuthContext)

  const logOut = async () => {
    if(window.confirm('로그아웃 하시겠습니까?')){
      try {
        const response = await axios.get('http://localhost:8080/clear-cookies');
        console.log(response.data);
        setSession(null);
        navigate('/login')
      } catch (error) {
        console.error(error);
      }
    }
  }

  const mouseOut = (item) => {
    if (item !== 1) {
      setMenu(0);
    }
  };

  const moveMain = (item) => {
    if (item === 0) {
      navigate("/");
    }
  };

  // const save = async () => {
  //   let data = {name : 1, age : 12}
  //   let response = await test(data.info)
  //   console.log(response)
  // }

  return (
    <>
      <nav className="navbar navbar-dark bg-dark">
        <img
          src={logo}
          width="100"
          className="d-inline-block align-top navbarLogo"
          alt=""
          onClick={
            location.pathname === "/login"
              ? null
              : () => {
                  navigate("/");
                }
          }
        />
        {location.pathname === "/login" ? null : (
          <>
            <div className="searchBox">
              <input type="text" className="form-control searchInput" />
              <i className="fa-solid fa-magnifying-glass searchIcon"></i>
            </div>
            <div className="menuContainer">
              {navMenu.map((arr, idx) => {
                return (
                  <div className="menuWrap" key={idx}>
                    <div
                      className={`menu ${menu === idx + 1 ? "click" : null}`}
                      onMouseEnter={() => {
                        setMenu(idx + 1);
                      }}
                      onMouseLeave={() => {
                        mouseOut(idx);
                      }}
                      onClick={() => {
                        moveMain(idx);
                      }}
                    >
                      {" "}
                      {arr}{" "}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="loginWrap">
              
              {!session ? (
                <>
                  <i className="fa fa-sign-in loginIcon"></i>
                  <div
                    className="login ml-1"
                    onClick={() => {
                      navigate("/login");
                    }}
                  >
                    Login
                  </div>
                </>
              ) : (
                <>
                  <i className="fa-solid fa-right-from-bracket loginIcon"></i>
                  <div
                    className="login ml-1"
                    onClick={() => {
                      logOut()
                    }}
                  >
                    Logout
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </nav>
      <div className={`trainingContainer ${menu === 2 ? "showOut" : null}`}>
        {trainingMenu.map((arr1, idx) => {
          return (
            <div
              className={`trainingMenu ${menu === 0.5 ? "none" : null}`}
              key={idx}
              onMouseEnter={() => {
                setMenu(2);
              }}
              onMouseLeave={() => {
                setMenu(0);
              }}
            >
              {arr1.name}
              <i className={`fa fa-angle-up ml-1 mt-3`}></i>
              <hr className="mainHr"></hr>
              <div className={`trainingWrap`}>
                {trainingMenu[idx].menu.map((arr, idx2) => {
                  return (
                    <div
                      className={`trainingBox`}
                      key={idx2}
                      onClick={() => {
                        navigate(`/training/${arr1.name}/${arr}`);
                        setMenu(0.5);
                      }}
                    >
                      <div> {arr} </div>
                      {idx2 + 1 === trainingMenu[idx].menu.length ? null : (
                        <hr style={{ width: "50%" }}></hr>
                      )}
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
};

export const nonLoginNavbar =() => {
  return (
    <nav className="navbar navbar-dark bg-dark">
          <img
            src={logo}
            width="100"
            className="d-inline-block align-top navbarLogo"
            alt=""
          />
          <div className="searchBox">
            <input type="text" className="form-control searchInput" />
            <i className="fa-solid fa-magnifying-glass searchIcon"></i>
          </div>
    </nav>
  )
}
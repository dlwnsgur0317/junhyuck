import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postLogin } from '../api';
import logo from '../images/blackLogo.png'
import { useContext } from 'react';
import {AuthContext} from '../comm/index'


export const Login = () => {

    const navigate = useNavigate()
    const [userInfo,setUserInfo] = useState({id : '', pw : ''})

    const {session, setSession} = useContext(AuthContext)

    const fnSetInfo = (item, val) => {
        if(item === 'id'){
            setUserInfo({...userInfo, id : val})
        }else{
            setUserInfo({...userInfo, pw : val})
        }
    }
 

    const loginCheck = async(e) => {
        e.preventDefault()
        if (!userInfo.id.trim()){
            alert('아이디를 입력하세요')
        }else if(!userInfo.pw.trim()) {
            alert('비밀번호를 입력하세요')
        } else {
            try {
                const response = await axios.post('http://localhost:8080/login', userInfo);
                console.log(response.data);
                if(response.data.message){
                  (async () => {
                    try {
                      const response = await axios.get('http://localhost:8080/api/get-cookie');
                      const cookieValue = response.data["connect.sid"];
                      console.log(cookieValue);
                      setSession(response.data["connect.sid"])
                    } catch (error) {
                      console.error(error);
                    }
                  })()
                  navigate('/')
                }
            } catch (error) {
                console.error(error);
                alert('아이디 혹은 비밀번호가 틀립니다')
            }
        }
    }

  return (
    <>
      <div className="loginContainer">
        <div className="imgWrap">
          <img src={logo} width="100" className="loginTitle" alt="로고" />
        </div>
        <div className="loginInputWrap">
          <div className="loginInputBox">
            <form>
              <div className="form-group">
                <label htmlFor="id" className="inputLabel mt-5">
                  ID
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="id"
                  onChange={(e) => {fnSetInfo('id', e.target.value)}}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password" className="inputLabel mt-4">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  onChange={(e) => {fnSetInfo('pw', e.target.value)}}
                />
              </div>
              <div className="buttonWrap mt-5">
                <div className="form-group form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="saveId"
                  />
                  <label className="form-check-label" htmlFor="saveId">
                    아이디 저장
                  </label>
                </div>
                <button
                  type="submit" className="btn btn-dark" 
                  onClick={loginCheck}  
                >
                  LOGIN
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className='joinMembershipWrap mt-2'>
          <div className='joinMembership' 
            onClick={() => {navigate('/joinMember')}}
          > 
            | <i className="fa-solid fa-user"></i> 회원가입 | 
          </div>
        </div>
      </div>
    </>
  );
};
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkId, postMembership } from "../api";
import logo from "../images/blackLogo.png";
import { SmallInfo } from "../modules/smallInfo";

let month = Array(12).fill();
for (let i = 0; i < month.length; i++) {
  month[i] = i + 1;
}
//입력한 정보
export const JoinMember = () => {
  const navigate = useNavigate();

  const [passwordCheck, setPasswordCheck] = useState();
  const [info, setInfo] = useState({
    id: "",
    password: "",
    name: "",
    dateOfBirth: { year: "", month: "월", day: "" },
    phone: "",
  });

  const [duplicateId, setDuplicateId] = useState(0);
  const [possiblePassword, setPossiblePassword] = useState(0);
  const [checkPwInput, setCheckPwInput] = useState(0)
  const [checkName, setCheckName] = useState(0);
  const [checkDate, setCheckDate] = useState(0);
  const [checkPhone, setCheckPhone] = useState(0);

  const inputRefs = useRef(Array(9).fill(null))

  //입력시 정보 변경
  const InfoModify = (item, val) => {
    if (!info.id) {
      setDuplicateId(null);
    }
    if (item === "year" || item === "month" || item === "day") {
      setInfo({ ...info, dateOfBirth: { ...info.dateOfBirth, [item]: val } });
    } else {
      setInfo({ ...info, [item]: val });
    }
  };

  //input값에 숫자만 입력
  const JustNumber = (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, "");
  };

  //폼 유효성 검사
  const formCheck = () => {
    const {password, name, dateOfBirth, phone} = info
    if (duplicateId !== 4) {
      duplicateId === 0 || duplicateId === 1 ?
        alert('아이디를 입력하세요') :
        alert('사용하실 다른 아이디를 입력해주세요')
      fnAutoFocus(0)
    } else if (!password || possiblePassword){
      alert('형식에 맞게 비밀번호를 입력해주세요')
      fnAutoFocus(1)
    } else if(password !== passwordCheck){
      alert('비밀번호를 확인해주세요')
      fnAutoFocus(2)
    }else if (!name){
      alert('이름을 입력해주세요')
      fnAutoFocus(3)
    }else if (!dateOfBirth.year || checkDate){
      alert('생년월일을 정확히 입력해주세요')
      const idx = checkDate === 1 || !dateOfBirth.year ? 4 : checkDate === 2 ? 5 : checkDate === 3 ? 6 : null;
      fnAutoFocus(idx);
    }else if(!phone){
      alert('전화번호를 확인해주세요')
      fnAutoFocus(7)
    }else {
      postMembership(info);
    }
  };

  //아이디 중복체크(숫자에 따라 인풋밑에 정보가 뜸)
  const CheckId = async (item) => {
    let response = await checkId(item);
    const regex = /^[a-z0-9]{5,20}$/;
    if (!info.id) {
      setDuplicateId(1);
    } else if (!regex.test(info.id)) {
      setDuplicateId(2);
    } else if (response.id) {
      setDuplicateId(3);
    } else {
      setDuplicateId(4);
    }
  };

  //비밀번호 유효성 체크
  const CheckPassword = (item) => {
    const regex = /^[^\s]{8,16}$/;
    if (item === "password") {
      if(!info.password){
        setPossiblePassword(1)
      }else if (!regex.test(info.password)) {
        setPossiblePassword(2);
      } else {
        setPossiblePassword(0);
      }
    } else if (item === "checkPassword") {
      if(!passwordCheck) {
        setCheckPwInput(1)
      }else if (passwordCheck !== info.password) {
        setCheckPwInput(2);
      }else{
        setCheckPwInput(0)
      }
    }
  };

  //이름 및 생년월일 유효성 체크
  const CheckInfo = (item) => {
    if (item === "name") {
      if (!info.name) {
        setCheckName(1);
      } else {
        setCheckName(0);
      }
    } else if (item === "date") {
      const regexYear = /^\d{4}$/;
      const regexDay = /^\d{2}$/;
      if (!regexYear.test(info.dateOfBirth.year)) {
        setCheckDate(1);
      } else if (info.dateOfBirth.month === "월") {
        setCheckDate(2);
      } else if (!regexDay.test(info.dateOfBirth.day)) {
        setCheckDate(3);
      } else {
        setCheckDate(0);
      }
    } else if (item === 'phone'){
      if(!info.phone){
        setCheckPhone(1)
      }else{
        setCheckPhone(0)
      }
    }
  };

  //인증번호 발송
  const fnAutNumber = () => {
    const regex = /^\d{11}$/;
    if(!regex.test(info.phone)){
      setCheckPhone(2)
    }
  }

  //자동 포커싱
  const fnAutoFocus =(idx) => {
    inputRefs.current[idx].focus()
  }

  useEffect(() => {
    fnAutoFocus(0)  
  },[]) 

  return (
    <div className="backGround">
      <div className="joinMemberContainer">
        <div className="titleImg">
          <img
            src={logo}
            width="200"
            className="loginTitle mt-5 mb-5"
            alt="로고"
            onClick={() => {
              navigate("/");
            }}
          />
        </div>
        <form>
          <div className="form-group">
            <label htmlFor="id">아이디</label>
            <input
              type="email"
              className="form-control"
              id="id"
              ref={(el) => inputRefs.current[0] = el}
              onChange={(e) => {
                InfoModify("id", e.target.value);
              }}
              onBlur={(e) => {
                CheckId({ id: info.id });
              }}
            />
            {duplicateId === 1 && !info.id ? <SmallInfo/> : null}
            <small
              style={{ color: "red" }}
              className={duplicateId === 2 && info.id ? "show" : null}
            >
              {" "}
              *5~20자의 영문 소문자, 숫자만 사용 가능합니다.{" "}
            </small>
            <small
              style={{ color: "red" }}
              className={duplicateId === 3 && info.id ? "show" : null}
            >
              {" "}
              *이미 사용중인 아이디입니다{" "}
            </small>
            <small
              style={{ color: "green" }}
              className={duplicateId === 4 && info.id ? "show" : null}
            >
              {" "}
              *사용 가능한 아이디입니다{" "}
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="Password">비밀번호</label>
            <input
              type="password"
              className="form-control"
              id="Password"
              maxLength={16}
              ref={(el) => inputRefs.current[1] = el}
              onChange={(e) => {
                InfoModify("password", e.target.value);
              }}
              onBlur={(e) => {
                CheckPassword("password");
              }}
            />
           {possiblePassword === 1 ? <SmallInfo/> : null}
            <small
              style={{ color: "red" }}
              className={possiblePassword === 2 ? "show" : null}
            >
              {" "}
              *8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.{" "}
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="PasswordCheck">비밀번호 확인</label>
            <input
              type="password"
              className="form-control"
              id="PasswordCheck"
              ref={(el) => inputRefs.current[2] = el}
              onChange={(e) => {
                setPasswordCheck(e.target.value);
              }}
              onBlur={(e) => {
                CheckPassword("checkPassword");
              }}
            />
           {checkPwInput === 1 ? <SmallInfo/> : null}
            <small
              style={{ color: "red" }}
              className={checkPwInput === 2 ? "show" : null}
            >
              {" "}
              *비밀번호가 일치하지 않습니다{" "}
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="name">이름</label>
            <input
              type="text"
              className="form-control"
              id="name"
              ref={(el) => inputRefs.current[3] = el}
              onChange={(e) => {
                InfoModify("name", e.target.value);
              }}
              onBlur={() => {
                CheckInfo("name");
              }}
            />
            {checkName === 1 ? <SmallInfo/> : null}
          </div>

          <label htmlFor="year">생년월일</label>
          <div className="dateOfBirthWrap">
            <input
              type="text"
              className="form-control"
              id="year"
              placeholder="년(4자)"
              maxLength={4}
              ref={(el) => inputRefs.current[4] = el}
              onInput={(e) => {
                JustNumber(e);
              }}
              onChange={(e) => {
                InfoModify("year", e.target.value);
              }}
              onBlur={() => {
                CheckInfo("date");
              }}
            />
            <select
              className="form-control ml-3"
              value={info.dateOfBirth.month}
              ref={(el) => inputRefs.current[5] = el}
              onChange={(e) => {
                InfoModify("month", e.target.value);
              }}
              onBlur={() => {
                CheckInfo("date");
              }}
            >
              <option value={"월"} disabled>
                월
              </option>
              {month.map((arr, idx) => {
                return <option key={idx}> {arr}</option>;
              })}
            </select>
            <input
              type="text"
              className="form-control ml-3"
              id="day"
              placeholder="일"
              maxLength={2}
              ref={(el) => inputRefs.current[6] = el}
              onInput={(e) => {
                JustNumber(e);
              }}
              onChange={(e) => {
                InfoModify("day", e.target.value);
              }}
              onBlur={() => {
                CheckInfo("date");
              }}
            />
          </div>
          <small
            style={{ color: "red" }}
            className={checkDate === 1 ? "show" : null}
          >
            {" "}
            *태어난 년도 4자리를 정확하게 입력하세요.{" "}
          </small>
          <small
            style={{ color: "red" }}
            className={checkDate === 2 ? "show" : null}
          >
            {" "}
            *태어난 월을 선택하세요.{" "}
          </small>
          <small
            style={{ color: "red" }}
            className={checkDate === 3 ? "show" : null}
          >
            {" "}
            *태어난 일(날짜) 2자리를 정확하게 입력하세요.{" "}
          </small>
          <label htmlFor="phone" className="mt-3">
            휴대전화
          </label>
          <div className="phoneWrap">
            <div className="form-group">
              <input
                type="text"
                className="form-control phone"
                id="phone"
                placeholder="-없이 번호만 입력"
                maxLength={11}
              ref={(el) => inputRefs.current[7] = el}
                onInput={(e) => {
                  JustNumber(e);
                }}
                onChange={(e) => {
                  InfoModify("phone", e.target.value);
                }}
                onBlur={() => {
                  CheckInfo("phone");
                }}
              />
            </div>
            <button
              type="button"
              className="btn btn-dark ml-5 phoneButton"
              onClick={fnAutNumber}
            >
              인증번호 받기
            </button>
          </div>
          <input
            type="text"
            className="form-control AuthenticationNumber"
            placeholder="인증번호 입력하세요"
            onInput={(e) => {
              JustNumber(e);
            }}
          />
          {checkPhone === 1 ? <SmallInfo/> : null}
          <small
            style={{ color: "red" }}
            className={checkPhone === 2 ? "show" : null}
          >
            {" "}
            *형식에 맞지 않는 번호입니다.{" "}
          </small>
          <button
            type="button"
            className="btn btn-dark mt-5 form-control"
            onClick={() => {
              formCheck();
            }}
          >
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
};


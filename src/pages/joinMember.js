import { useState } from "react";
import { postMembership } from "../api";

let month = Array(12).fill()
for (let i = 0; i < month.length; i++){
    month[i] =  i + 1
}

export const JoinMember = () => {
  const [passwordCheck, setPasswordCheck] = useState();
  const [info, setInfo] = useState({
    id: "",
    password: "",
    name: "",
    dateOfBirth: { year: "", month: "월", day: "" },
  });

  const InfoModify = (item, val) => {
    if (item == "year" || item == "month" || item == "day") {
      setInfo({ ...info, dateOfBirth: { ...info.dateOfBirth, [item]: val } });
    } else {
      setInfo({ ...info, [item]: val });
    }
  };
  console.log(info);

  return (
    <div className="joinMemberContainer">
      회원가입 페이지임
      <form>
        <div className="form-group">
          <label htmlFor="id">아이디</label>
          <input
            type="email"
            className="form-control"
            id="id"
            onChange={(e) => {
              InfoModify("id", e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Password">비밀번호</label>
          <input
            type="password"
            className="form-control"
            id="Password"
            onChange={(e) => {
              InfoModify("password", e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="PasswordCheck">비밀번호 확인</label>
          <input
            type="password"
            className="form-control"
            id="PasswordCheck"
            onChange={(e) => {
              setPasswordCheck(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">이름</label>
          <input
            type="text"
            className="form-control"
            id="name"
            onChange={(e) => {
              InfoModify("name", e.target.value);
            }}
          />
        </div>
        <label htmlFor="year">생년월일</label>
        <div className="dateOfBirthWrap">
          <input
            type="text"
            className="form-control"
            id="year"
            placeholder="년(4자)"
            onChange={(e) => {
              InfoModify("year", e.target.value);
            }}
          />
          <select
            className="form-control ml-3"
            value={info.dateOfBirth.month}
            onChange={(e) => {
              InfoModify("month", e.target.value);
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
            onChange={(e) => {
              InfoModify("day", e.target.value);
            }}
          />
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            postMembership(info);
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

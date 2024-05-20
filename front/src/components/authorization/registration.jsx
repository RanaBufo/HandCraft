import "./style/inputStyle.css";
import nodeRight from "../../img/noodle.png";
import nodeLeft from "../../img/noodle2.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Registration() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [patronymic, setPatronymic] = useState("");
  const [dateBurn, setDateBurn] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [doublePassword, setDoublePassword] = useState("");
  let id;
  const navigate = useNavigate();
  function saveToken(token) {

    sessionStorage.setItem("refreshToken", JSON.stringify(token));
  }
  const registrationUser = () => {
    if (
      name !== "" &&
      surname !== "" &&
      dateBurn !== "" &&
      number !== "" &&
      email !== "" &&
      password !== "" &&
      doublePassword === password
    ) {
      let body = {
        FirstName: name,
        LastName: surname,
        Patronymic: patronymic,
        Description: null,
        Birhday: dateBurn,
        Contact: {
          Email: email,
          Phone: number,
          Password: password,
          IdRole: 2,
        },
      };
      let url = "https://localhost:7073/user/UserPost";

      let headers = {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json;charset=utf-8",
      };

      fetch(url, {
        method: "POST",
        body: JSON.stringify(body),
        headers: headers,
      })
        .then((response) => {
          if (!response.ok) {
            return response.text().then((text) => {
              throw new Error(text);
            });
          }
        })
        .then((data) => {
          // После успешного выполнения первого запроса, выполняем второй
          body = {
            Email: email,
            Phone: number,
            Password: password,
            IdRole: 2,
          };
          url = "https://localhost:7073/Login/LogIn";

          return fetch(url, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
              "Content-Type": "application/json;charset=utf-8",
              Accept: "application/json",
            },
          });
        })
        .then((response) => {
          if (!response.ok) {
            return response.text().then((text) => {
              throw new Error(text);
            });
          }

          // Обработка тела ответа
          return response
            .json()
            .then((data) => ({ data }))
            .catch(() => {
              // Если ответ не является JSON, возвращаем пустой объект и userId
              return { data: {} };
            });
        })
        .then((data) => {
          id = data.data;
          return id;
        })
        .then((myId) => {
          body = {};
          const url = `https://localhost:7073/api/Registration/GetRefreshToken?minutes=300&id=${id}`;

          return fetch(url, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
              "Content-Type": "application/json;charset=utf-8",
              Accept: "application/json",
            },
          }).then((response) => response.text().then((data) => ({ data, myId })));
        })
        .then((data) => {
          saveToken(data.data);
          navigate("/user/" + data.myId);
        })
        .catch((error) => {
          console.error("Ошибка:", error);
        });

    }
  };
  return (
    <>
      <img className="rightSH" src={nodeRight}></img>
      <img className="leftSH" src={nodeLeft}></img>
      <div className="in-block">
        <h1>Регистрация</h1>
        <div className="input-group">
          <label>Имя</label>
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          ></input>
        </div>

        <div className="input-group">
          <label>Фамилия</label>
          <input
            type="text"
            value={surname}
            onChange={(event) => setSurname(event.target.value)}
          ></input>
        </div>
        <div className="input-group">
          <label>Отчество</label>
          <input
            type="text"
            value={patronymic}
            onChange={(event) => setPatronymic(event.target.value)}
          ></input>
        </div>
        <div className="input-group">
          <label>День рождения</label>
          <input
            type="date"
            value={dateBurn}
            onChange={(event) => setDateBurn(event.target.value)}
          ></input>
        </div>
        <div className="input-group">
          <label>Номер телефона</label>
          <input
            type="text"
            value={number}
            onChange={(event) => setNumber(event.target.value)}
          ></input>
        </div>
        <div className="input-group">
          <label>E-mail</label>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          ></input>
        </div>
        <div className="input-group">
          <label>Пароль</label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          ></input>
        </div>
        <div className="input-group">
          <label>Повторите пароль</label>
          <input
            type="password"
            value={doublePassword}
            onChange={(event) => setDoublePassword(event.target.value)}
          ></input>
        </div>
        <button onClick={registrationUser}>Регистрация</button>
      </div>
    </>
  );
}

export default Registration;

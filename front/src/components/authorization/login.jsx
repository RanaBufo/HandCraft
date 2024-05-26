import "./style/inputStyle.css";
import nodeRight from "../../img/noodle.png";
import nodeLeft from "../../img/noodle2.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [errorLog, setErrorLog] = useState(false);
  const navigate = useNavigate();
  function saveToken(token, id) {
    sessionStorage.setItem("refreshToken", token);
    sessionStorage.setItem("idUser", id);
  }
  const loginUser = () => {
    setErrorLog(false)
    let body = {
      Email: "",
      Phone: login,
      Password: password,
      IdRole: 2,
    };

    if (login !== "" && password !== "") {
      let url = "https://localhost:7073/login/LogIn";

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
            return response.json().then((text) => {
              throw new Error(text);
            });
          }
          return response.json(); // Возвращаем строковый ответ
        })
        .then((token) => {
          saveToken(token.token, token.id);
          navigate("/user");
        })
        .catch((error) => {
          setErrorLog(true);
          console.error("Ошибка:", error);
        });
    }
  };
  const onRegistration = () => {
    navigate("/registration");
  };
  return (
    <>
      <img className="rightSH" src={nodeRight}></img>
      <img className="leftSH" src={nodeLeft}></img>
      <div className="in-block">
        <h1>Вход</h1>
        {errorLog && <p className="errorStyle">Ошибка!!!</p>}
        <div className="input-group">
          <label>Номер телефона/ E-mail</label>
          <input
            type="text"
            value={login}
            onChange={(event) => setLogin(event.target.value)}
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
        <button onClick={loginUser}>Вход</button>        
        <a onClick={onRegistration}>Зарегистрироваться</a>
      </div>
    </>
  );
}

export default Login;
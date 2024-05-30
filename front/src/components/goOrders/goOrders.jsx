import { useState } from "react";
import { useNavigate } from "react-router-dom";

function GoOrders() {
  const [name, setName] = useState("");
  const [patronymic, setPatronymic] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [entrance, setEntrance] = useState("");
  const [house, setHouse] = useState("");
  const [room, setRoom] = useState("");
  const [intercom, setIntercom] = useState("");
  const [errorLog, setErrorLog] = useState(false);
  const [items, setItems] = useState([]);
  const refreshToken = sessionStorage.getItem("refreshToken");
  const idUser = sessionStorage.getItem("idUser");

  const navigate = useNavigate();

  const orderGo = async () => {
    if (
      name === "" ||
      lastName === "" ||
      birthday === "" ||
      country === "" ||
      region === "" ||
      city === "" ||
      street === "" ||
      house === "" ||
      room === ""
    ) {
      setErrorLog(true);
    } else {
      setErrorLog(false);
      try {
        const headers = {
          Accept: "*/*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${refreshToken}`,
        };

        const deleteResponse = await fetch(
          `https://localhost:7073/Basket/BasketDeleteUserId?id=${idUser}`,
          {
            method: "DELETE",
            headers: headers,
          }
        );

        if (!deleteResponse.ok) {
          const errorText = await deleteResponse.text();
          throw new Error(errorText);
        }

        // Обновляем список элементов после удаления
        setItems((prevItems) => prevItems.filter((item) => item.id !== idUser));
        navigate("/yep");
      } catch (error) {
        console.error("Ошибка при удалении элемента:", error);
      }
    }
  };
  return (
    <>
      <div className="back"></div>
      <div className="in-block">
        <h1>Вход</h1>
        {errorLog && <p className="errorStyle">Ошибка!!!</p>}
        <div className="input-group">
          <label>Имя</label>
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
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
          <label>Фамилия</label>
          <input
            type="text"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
          ></input>
        </div>
        <div className="input-group">
          <label>День рождения</label>
          <input
            type="date"
            value={birthday}
            onChange={(event) => setBirthday(event.target.value)}
          ></input>
        </div>
        <div className="input-group">
          <label>Страна</label>
          <input
            type="text"
            value={country}
            onChange={(event) => setCountry(event.target.value)}
          ></input>
        </div>
        <div className="input-group">
          <label>Регион</label>
          <input
            type="text"
            value={region}
            onChange={(event) => setRegion(event.target.value)}
          ></input>
        </div>
        <div className="input-group">
          <label>Город</label>
          <input
            type="text"
            value={city}
            onChange={(event) => setCity(event.target.value)}
          ></input>
        </div>
        <div className="input-group">
          <label>Улица</label>
          <input
            type="text"
            value={street}
            onChange={(event) => setStreet(event.target.value)}
          ></input>
        </div>
        <div className="input-group">
          <label>Подъезд</label>
          <input
            type="text"
            value={entrance}
            onChange={(event) => setEntrance(event.target.value)}
          ></input>
        </div>
        <div className="input-group">
          <label>Дом</label>
          <input
            type="text"
            value={house}
            onChange={(event) => setHouse(event.target.value)}
          ></input>
        </div>
        <div className="input-group">
          <label>Домофон</label>
          <input
            type="text"
            value={intercom}
            onChange={(event) => setIntercom(event.target.value)}
          ></input>
        </div>
        <div className="input-group">
          <label>Квартира</label>
          <input
            type="text"
            value={room}
            onChange={(event) => setRoom(event.target.value)}
          ></input>
        </div>
        <button onClick={orderGo}>Оформить заказ</button>
      </div>
    </>
  );
}

export default GoOrders;

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import backgroung from "../../img/background.jpg";
function UserPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const prodId = params.id;
  let refreshToken = sessionStorage.getItem("refreshToken");
  refreshToken = refreshToken.substring(1);
  refreshToken = refreshToken.substring(0, refreshToken.length - 1);
  console.log(refreshToken);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const body = {};
        const url = `https://localhost:7073/api/Registration/GetAccessToken?minutes=2`;
        const headers = {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json;charset=utf-8",
          Authorization: `Bearer ${refreshToken}`,
        };
        const tokenResponse = await fetch(url, {
          method: "POST",
          body: JSON.stringify(body),
          headers: headers,
        });
        if (!tokenResponse.ok) {
          const errorText = await tokenResponse.text();
          throw new Error(errorText);
        }
        const token = await tokenResponse.text();
        return fetch(`https://localhost:7073/User/OneUserGet`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((userResponse) => {
            if (!userResponse.ok) {
              return userResponse.text().then((errorText) => {
                throw new Error(errorText);
              });
            }
            return userResponse.json();
          })
          .then((userData) => {
            setItems(userData);
            setLoading(true);
            return userData;
          });
      } catch (error) {
        console.error("Ошибка:", error);
        throw error;
      }
    };
    fetchData()
      .then((data) => {})
      .catch((error) => {
        console.error("Ошибка при получении данных пользователя:", error);
      });
  }, []);

  let imgData = items.ImgName;
  if (imgData == null) {
    imgData = "cat.png";
  }
  console.log(items);
  return loading ? (
    <main>
      <div className="cardBackground">
        <img
          src={backgroung}
          alt={items.ImgName ? "Item Image" : "Default Image"}
          className="imgBackground"
        />
      </div>
      <div className="userCard">
        <div className="centerElement">
          <div className="circle">
            <div className="imgCircle">
              <img
                src={`https://localhost:7073/img/${imgData}`}
                alt={items.ImgName ? "Item Image" : "Default Image"}
                className="imgCircle"
              />
            </div>
          </div>
        </div>
        <div className="rowInfo">
          <p className="pCLass">{items.firstName}</p>
          <p className="pCLass">{items.lastName}</p>
          <p className="pCLass">{items.patronymic}</p>
        </div>
        <div className="k"></div>
        <div className="centerElement">
          <div className="newCont">
            <div className="rowInfo">
              <div className="smallCircle"></div>
              <p className="infoP">{items.contact.email}</p>
            </div>
            <div className="rowInfo">
              <div className="smallCircle"></div>
              <p className="infoP">{items.contact.phone}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  ) : (
    <p>Loading...</p>
  );
}

export default UserPage;

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function UserPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const prodId = params.id;
  let refreshToken = sessionStorage.getItem("refreshToken");
  refreshToken = refreshToken.substring(3);
  refreshToken = refreshToken.substring(0, refreshToken.length - 3);
  console.log(refreshToken);
  useEffect(() => {
    const body = {};
    const url = `https://localhost:7073/api/Registration/GetAccessToken?minutes=300`;
    const headers = {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json;charset=utf-8",
      Authorization: `Bearer ${refreshToken}`,
    };
  
    fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: headers,
    })
      .then((response) => response.text())
      .then((token) => {
        fetch(`https://localhost:7073/User/OneUserGet?id=${prodId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => res.json())
          .then((arr) => {
            setItems(arr);
            setLoading(true);
          });
      });
  }, []);
  
  let imgData = items.ImgName;
  if (imgData == null) {
    imgData = "cat.png";
  }

  return loading ? (
    <main>
      <div className="userCard">
        <div className="circle"></div>
        <img
          src={`https://localhost:7073/img/${imgData}`}
          alt={items.ImgName ? "Item Image" : "Default Image"}
        />

        <div className="rowInfo">
          <p>{items.name}</p>
          <p>{items.lastName}</p>
          <p>{items.patronymic}</p>
        </div>
      </div>
      <div className="circle"></div>
    </main>
  ) : (
    <p>Loading...</p>
  );
}

export default UserPage;

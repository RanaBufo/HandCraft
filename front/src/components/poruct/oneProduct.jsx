import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Product() {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const prodId = params.id;
  const userId = sessionStorage.getItem("idUser");
  const refreshToken = sessionStorage.getItem("refreshToken");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://localhost:7073/Product/ProductByIdGet?id=" + prodId)
      .then((res) => res.json())
      .then((product) => {
        setItem(product);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Ошибка при загрузке продукта:", error);
        setLoading(false);
      });
  }, [prodId]);

  const addBasket = async () => {
    if (userId != null && userId !== 'null') {
      try {
        let body = {};
        const url = `https://localhost:7073/api/Registration/GetAccessToken?minutes=2`;
        let headers = {
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
        body = {
          idUser: userId,
          idProduct: prodId,
          quantity: 1
        };
        headers = {
          Accept: "*/*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };

        const addResponse = await fetch(
          `https://localhost:7073/Basket/BasketPost`,
          {
            method: "POST",
            body: JSON.stringify(body),
            headers: headers,
          }
        );

        if (!addResponse.ok) {
          const errorText = await addResponse.text();
          throw new Error(errorText);
        }

        console.log("Продукт добавлен в корзину");
      } catch (error) {
        console.error("Ошибка при добавлении в корзину:", error);
      }
    } else {
      navigate("/Login");
    }
  };

  return loading ? (
    <p>Loading...</p>
  ) : (
    item && (
      <div key={item.id}>
        <section className="leftSideText">
          <div className="picCuter">
            <img src={`https://localhost:7073/img/${item.imgName}`} className="imgProduct" alt={item.title} />
          </div>
        </section>
        <section className="rightSideText">
          <p className="name">{item.name}</p>
          <p className="descriptionStyle">{item.description}</p>
          <p>{item.category}</p>
          <p>${item.price}</p>
          <button className="buyButton" onClick={addBasket}>
            Add To Cart
          </button>
          <br />
          <button className="returnButton" onClick={() => navigate(-1)}>
            Return
          </button>
        </section>
      </div>
    )
  );
}

export default Product;

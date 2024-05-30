import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Bascket() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const refreshToken = sessionStorage.getItem("refreshToken");
  const idUser = sessionStorage.getItem("idUser");

  useEffect(() => {
    if (!refreshToken || refreshToken === "null") {
      navigate("/Login");
      return;
    }

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

        const userResponse = await fetch(
          `https://localhost:7073/Basket/BasketGet?id=${idUser}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!userResponse.ok) {
          const errorText = await userResponse.text();
          throw new Error(errorText);
        }

        const userData = await userResponse.json();
        setItems(userData);
        setLoading(true);
      } catch (error) {
        console.error("Ошибка:", error);
      }
    };

    fetchData();
  }, [navigate, refreshToken, idUser]);
  const updateBasket = async () => {
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

      const userResponse = await fetch(
        `https://localhost:7073/Basket/BasketGet?id=${idUser}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!userResponse.ok) {
        const errorText = await userResponse.text();
        throw new Error(errorText);
      }

      const userData = await userResponse.json();
      setItems(userData);
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  const onDelete = async (id) => {
    console.log(id);
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
      body = {
        id: id,
      };
      headers = {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${refreshToken}`,
      };
      const token = await tokenResponse.text();

      const deleteResponse = await fetch(
        `https://localhost:7073/Basket/BasketDelete?id=` + id,
        {
          method: "DELETE",
        }
      );

      if (!deleteResponse.ok) {
        const errorText = await deleteResponse.text();
        throw new Error(errorText);
      }

      // Обновляем список элементов после удаления
      setItems(items.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Ошибка при удалении элемента:", error);
    }
  };

  const onPlus = async (id, Quentity) => {
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
      body = {
        id: id,
        Quentity: Quentity
      };
      headers = {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${refreshToken}`,
      };
      const token = await tokenResponse.text();

      const deleteResponse = await fetch(
        `https://localhost:7073/Basket/BasketPut`,
        {
          method: "PUT",
          body: JSON.stringify(body),
          headers: headers,
        }
      );

      if (!deleteResponse.ok) {
        const errorText = await deleteResponse.text();
        throw new Error(errorText);
      }

      // Обновляем список элементов после удаления
      updateBasket();
    } catch (error) {
      console.error("Ошибка при изменении колли:", error);
    }
  };

  const goOrders = () => {
    navigate("/order")
  }

  return loading ? (
    <>
      {items.map((item) => (
        <div key={item.id} className="in-block-basket">
          <div className="content-basket row">
            <p className="p-in-basket">{item.product.name}</p>
            <p className="p-in-basket">Цена: {item.price} руб</p>
            <button className="button-basket" onClick={() => onPlus(item.id, item.quantity+1)}>
              +
            </button>
            <p className="p-in-basket">{item.quantity}</p>
            <button className="button-basket" onClick={() => onPlus(item.id, item.quantity-1)}>-</button>
            <button className="button-basket" onClick={() => onDelete(item.id)}>
              Удалить
            </button>
          </div>
        </div>
      ))}
      {items.length > 0 && <button onClick={goOrders} className="centerC">Оформить заказ</button>}

    </>
  ) : (
    <p>Loading...</p>
  );
}

export default Bascket;
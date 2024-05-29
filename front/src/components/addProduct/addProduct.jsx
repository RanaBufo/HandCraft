import "./style/addProduct.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const refreshToken = sessionStorage.getItem("refreshToken");
  const role = sessionStorage.getItem("role");
  const [errorLog, setErrorLog] = useState(false);
  const [color, setColor] = useState([]);
  const [category, setCategory] = useState([]);
  const [composition, setComposition] = useState([]);
  const [loading, setLoading] = useState(false);
  const [img, setImg] = useState("");
  const [quentity, setQuentity] = useState("");
  const [selectedColorIds, setSelectedColorIds] = useState([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  const [selectedCompositionIds, setSelectedCompositionIds] = useState([]);
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const colorResponse = await fetch(
          `https://localhost:7073/Color/GetColor`,
          {
            method: "GET",
            headers: {
              // Добавьте необходимые заголовки
            },
          }
        );

        if (!colorResponse.ok) {
          const errorText = await colorResponse.text();
          throw new Error(errorText);
        }

        const colorData = await colorResponse.json();
        setColor(colorData);
        console.log(colorData);

        const categoryResponse = await fetch(
          `https://localhost:7073/Category/GetCategory`,
          {
            method: "GET",
            headers: {
              // Добавьте необходимые заголовки
            },
          }
        );

        if (!categoryResponse.ok) {
          const errorText = await categoryResponse.text();
          throw new Error(errorText);
        }

        const categoryData = await categoryResponse.json();
        setCategory(categoryData);
        console.log(categoryData);

        const compositionResponse = await fetch(
          `https://localhost:7073/Composition/GetComposition`,
          {
            method: "GET",
            headers: {
              // Добавьте необходимые заголовки
            },
          }
        );

        if (!compositionResponse.ok) {
          const errorText = await compositionResponse.text();
          throw new Error(errorText);
        }

        const compositionData = await compositionResponse.json();
        setComposition(compositionData);
        console.log(compositionData);

        setLoading(true);
      } catch (error) {
        console.error("Ошибка:", error);
        setErrorLog(true);
      }
    };

    fetchData();
  }, []);

  const addButton = async () => {
    if (!name || !description || !price || !quentity) {
      setErrorLog(true);
    } else {
      const body = {
        name: name,
        description: description,
        price: parseFloat(price),
        imgName: img,
        discount: 0,
        quantity: parseInt(quentity),
        productComposition: selectedCompositionIds.map(id => ({ id })),
        productColor: selectedColorIds.map(id => ({ id })),
        productCategory: selectedCategoryIds.map(id => ({ id }))
      };
      console.log(body);
      const url = "https://localhost:7073/Product/ProductPost";

      const headers = {
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
          return true
        })
        .then((r) => {
          navigate("/");
        })
        .catch((error) => {
          console.error("Ошибка:", error);
        });
    }
  };

  return loading ? (
    <>
      {role !== "admin" ? (
        <p>Нет доступа!</p>
      ) : (
        <div className="in-block">
          <h1>Добавить продукт</h1>
          {errorLog && <p className="errorStyle">Ошибка!!!</p>}
          <div className="row ">
            <div className="L">
              <div className="parentProduct addImg margin-el">
                <img
                  src={`https://localhost:7073/img/${img}`}
                  className="imgProduct"
                  alt="lola"
                  onError={(e) => {
                    e.target.src =
                      "https://localhost:7073/img/download_8633526.png"; // Заменяем src на путь к "1.png" в случае ошибки 404
                  }}
                />
              </div>
            </div>

            <div className="L">
              <div className="input-group">
                <label>Название продукта</label>
                <input
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                ></input>
              </div>
              <div className="input-group">
                <label>Описание продукта</label>
                <input
                  type="text"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                ></input>
              </div>
              <div className="input-group">
                <label>Цена продукта</label>
                <input
                  type="text"
                  value={price}
                  onChange={(event) => {
                    const value = event.target.value;
                    if (/^[1-9]\d*$/.test(value)) {
                      setPrice(value);
                    }
                  }}
                ></input>
              </div>
              <div className="input-group">
                <label>Количество продуктов</label>
                <input
                  type="text"
                  value={quentity}
                  onChange={(event) => {
                    const value = event.target.value;
                    if (/^[1-9]\d*$/.test(value)) {
                      setQuentity(value);
                    }
                  }}
                ></input>
              </div>
              <div className="input-group">
                <label>Имя картинки</label>
                <input
                  type="text"
                  value={img}
                  onChange={(event) => setImg(event.target.value)}
                ></input>
              </div>
            </div>
            <div className="L">
              {color.map((item) => (
                <div className="row" key={item.id}>
                  <input
                    className="checkboxStyle"
                    type="checkbox"
                    id={`color-${item.id}`}
                    name={`color-${item.id}`}
                    value={item.id}
                    onChange={(event) => {
                      const selectedId = parseInt(event.target.value);
                      if (event.target.checked) {
                        setSelectedColorIds([...selectedColorIds, selectedId]);
                      } else {
                        setSelectedColorIds(
                          selectedColorIds.filter((id) => id !== selectedId)
                        );
                      }
                    }}
                  />
                  <label htmlFor={`color-${item.id}`}>{item.name}</label>
                </div>
              ))}
            </div>

            <div className="L">
              {category.map((item) => (
                <div className="row" key={item.id}>
                  <input
                    className="checkboxStyle"
                    type="checkbox"
                    id={`category-${item.id}`}
                    name={`category-${item.id}`}
                    value={item.id}
                    onChange={(event) => {
                      const selectedId = parseInt(event.target.value);
                      if (event.target.checked) {
                        setSelectedCategoryIds([
                          ...selectedCategoryIds,
                          selectedId,
                        ]);
                      } else {
                        setSelectedCategoryIds(
                          selectedCategoryIds.filter((id) => id !== selectedId)
                        );
                      }
                    }}
                  />
                  <label htmlFor={`category-${item.id}`}>{item.name}</label>
                </div>
              ))}
            </div>

            <div className="L">
              {composition.map((item) => (
                <div className="row" key={item.id}>
                  <input
                    className="checkboxStyle"
                    type="checkbox"
                    id={`composition-${item.id}`}
                    name={`composition-${item.id}`}
                    value={item.id}
                    onChange={(event) => {
                      const selectedId = parseInt(event.target.value);
                      if (event.target.checked) {
                        setSelectedCompositionIds([
                          ...selectedCompositionIds,
                          selectedId,
                        ]);
                      } else {
                        setSelectedCompositionIds(
                          selectedCompositionIds.filter(
                            (id) => id !== selectedId
                          )
                        );
                      }
                    }}
                  />
                  <label htmlFor={`composition-${item.id}`}>{item.name}</label>
                </div>
              ))}
            </div>
          </div>
          <button onClick={addButton}>Добавить</button>
        </div>
      )}
    </>
  ) : (
    <p>Loading...</p>
  );
}

export default AddProduct;

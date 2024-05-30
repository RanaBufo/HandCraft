import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import undo from "../../img/Vector 13.png";
import circleImg from "../../img//young-woman-makes-pottery-workshop 2.png";
function Product() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetch("https://localhost:7073/Product/ProductsGet/")
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr);
        setLoading(true);
      });
  }, []);
  const navigate = useNavigate();
  const handleInfoClick = (id) => {
    navigate("/products/" + id); // Используйте navigate для перехода на другую страницу
  };
  window.addEventListener("scroll", function () {
    var element1 = document.querySelector(".leftUndo");
    var element2 = document.querySelector(".rightUndo");
    var scrollPosition = window.scrollY;
    if (element1){
    // Проверяем, прокрутилась ли страница достаточно, чтобы зафиксировать элемент
    if (scrollPosition >= 366) {
      element1.classList.add("fixedPosition");
      element2.classList.add("fixedPosition");
    } else {
      element1.classList.remove("fixedPosition");
      element2.classList.remove("fixedPosition");
    }}
  });
  console.log(items.length)
  return loading ? (
    <>
    <div className="lol">
      
      <img src={undo} className="rightUndo" />
      <img src={undo} className="leftUndo" />
      
    </div>
      <div className="topBlock">
        <img src={circleImg} className="circleImg" />
        <h1 className="tovarTitle">ТОВАРЫ</h1>
      </div>

      <div className={`row position-el ${items.length == 4 ? 'hideScroll' : ''}`}>
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => handleInfoClick(item.id)}
            className="cardProduct"
          >
            <div className="parentProduct">
              <img
                src={`https://localhost:7073/img/${item.imgName}`}
                className="imgProduct"
                alt={item.title}
              />
            </div>
            <p className="name">{item.name}</p>
            <p>${item.price}</p>
          </div>
        ))}
      </div>
    </>
  ) : (
    <p>Loading...</p>
  );
}

export default Product;

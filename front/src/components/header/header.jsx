import "./style/header.css";
import { useLocation } from "react-router-dom";
import magnifier from "./../../img/magnifier.png";
import basket from "./../../img/Vectorbasket.png";
import menu from './../../img/MenuIcon.png';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const [headerBackground, setHeaderBackground] = useState("");
  const [isOpen, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    let headerBackgroundValue = "";
    if (pathname.startsWith("/registration") || pathname.startsWith("/login") || pathname.startsWith("/addProduct") )  {
      headerBackgroundValue = "linear-gradient(90deg, rgb(255, 255, 223, 45%) 0%, rgb(255, 229, 204, 45%) 100%)";
      document.body.style.background = "linear-gradient(rgba(245,214,172,1), rgba(249,180,175,1), rgba(249,167,156,1), rgba(244,215,177,1))";
    } else {
      headerBackgroundValue = "linear-gradient(90deg, rgba(255,193,189,1) 0%, rgba(255,128,127,1) 100%)";
      document.body.style.background = "#F0DEC6";
    }
    setHeaderBackground(headerBackgroundValue);
  }, [pathname]);

  const userPageClick = () => {
    const refreshToken = sessionStorage.getItem("refreshToken");
    if (refreshToken !== null && refreshToken !== 'null') {
      navigate("/user");
    } else {
      navigate("/login");
    }
  };

  let imgName = "icons8-пользователь-48.png";
  const refreshToken = sessionStorage.getItem("refreshToken");
  if (refreshToken !== 'null' && refreshToken !== null) {
    if (imgName == 'null' && imgName != null) {
      imgName = sessionStorage.getItem("imgUser");
    } else {
      imgName = "cat.png";
    }
  } else {
    imgName = "icons8-пользователь-48.png";
  }
  return (
    <header>
      <div className="h-container" style={{ background: headerBackground }}>
        <div className="header_row">
          <div>
            <img src={magnifier} className="search-img" alt="Search" />
            <input className="search" />
          </div>
          <div className="menu row">
            <div className="parentImg">
              <img
                src={`https://localhost:7073/img/${imgName}`}
                onClick={userPageClick}
                className="icon-user"
                alt="User"
              />
            </div>
            <img src={basket} onClick={() => navigate("/bascket")} className="icon-header" alt="Basket" />
            <img className='menuButton icon-header icon-menu' onClick={() => setOpen(!isOpen)} src={menu} alt="Menu" />
            <div className={`menuCategories ${isOpen ? "active" : ""}`}>
                <ul className="menu__list"> 
                    <li className="menu__item">Шапки</li>
                    <li className="menu__item">Шарфы</li>
                    <li className="menu__item">Шали</li>
                    <li className="menu__item">Свитеры</li>
                    <li className="menu__item">Пледы</li>
                    <li className="menu__item">Платья</li>
                    <li className="menu__item">Топы</li>
                    <li className="menu__item">Юбки</li>
                    <li className="menu__item">Шопперы</li>
                </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;

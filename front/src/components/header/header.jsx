import "./style/header.css";
import { useLocation } from "react-router-dom";
import magnifier from "./../../img/magnifier.png";
import basket from "./../../img/Vectorbasket.svg";
import settings from "./../../img/Vectorsettings.svg";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  let imgUser = sessionStorage.getItem("imgUser");
  let refreshToken = sessionStorage.getItem("refreshToken");
  let headerBackground = "";
  let bodyBackground = "";
  let imgName = "icons8-пользователь-48.png";
  const { pathname } = useLocation();
  if (pathname.startsWith("/registration") || pathname.startsWith("/login")) {
    headerBackground =
      "linear-gradient(90deg, rgb(255, 255, 223, 45%) 0%, rgb(255, 229, 204, 45%) 100%)"; // Любой цвет, который вам нужен
    document.body.style.background =
      "linear-gradient(rgba(245,214,172,1), rgba(249,180,175,1), rgba(249,167,156,1), rgba(244,215,177,1))";
  } else {
    headerBackground =
      "linear-gradient(90deg, rgba(255,193,189,1) 0%, rgba(255,128,127,1) 100%)";
    document.body.style.background = "#F0DEC6";
  }
  const userPageClick = () => {
    if (refreshToken != null) {
      navigate("/user");
    }
    navigate("/login");
  };
  if (refreshToken != 'null') {
    if (imgName == "null") {
      imgName = imgUser;
    } else {
      imgName = "cat.png";
    }
  }
  else{
    
  imgName = "icons8-пользователь-48.png";
  }
  console.log()
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
            <img src={basket} className="icon-header" alt="Basket" />
            <img src={settings} className="icon-header" alt="Settings" />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;

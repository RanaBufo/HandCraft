import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/header/header.jsx";
import UserPage from "./components/userPage/userPage.jsx";
import Registration from "./components/authorization/registration.jsx";
import Login from "./components/authorization/login.jsx";
import AllProduct from "./components/poruct/allProduct.jsx";
import OneProduct from "./components/poruct/oneProduct.jsx";
import Bascket from "./components/bascket/bascket.jsx";
import GoOrder from "./components/goOrders/goOrders.jsx";
import AddProduct from "./components/addProduct/addProduct.jsx";
import Yep from "./components/yep/yep.jsx";
import "./style/common.css";
import "./components/userPage/style/main.css";
import "./components/poruct/style/allProduct.css";
import "./components/authorization/style/inputStyle.css";
import "./components/bascket/style/basket.css";
//создание функции с названием App()
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/user" element={<UserPage />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/" element={<AllProduct />} />
        <Route path="/bascket" element={<Bascket />} />
        <Route path="/products/:id" element={<OneProduct />} />
        <Route path="/addProduct" element={<AddProduct />} />
        <Route path="/order" element={<GoOrder />} />
        <Route path="/yep" element={<Yep />} />
      </Routes>
    </>
  );
}

export default App;

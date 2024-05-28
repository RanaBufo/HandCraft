import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/header/header.jsx";
import UserPage from "./components/userPage/userPage.jsx";
import Registration from "./components/authorization/registration.jsx";
import Login from './components/authorization/login.jsx';
import AllProduct from './components/poruct/allProduct.jsx';
import OneProduct from './components/poruct/oneProduct.jsx';
import './style/common.css';
import './components/userPage/style/main.css'
import './components/poruct/style/allProduct.css'
import AddProduct from "./components/addProduct/addProduct.jsx";
//создание функции с названием App()
function App() { 
 
  return (
    <>
  
  <Header/>
    <Routes>
      <Route path = "/user" element={<UserPage/>} />
      <Route path = "/registration" element={<Registration/>} />
      <Route path = "/Login" element = {<Login />} />
      <Route path = "/" element={<AllProduct/>}/>
      <Route path = "/products/:id" element = {<OneProduct />} />
      <Route path="/addProduct" element={<AddProduct />} />
    </Routes>
    </>
  );
}

export default App;

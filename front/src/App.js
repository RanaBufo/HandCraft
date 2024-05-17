import Header from "./components/header/header.jsx";
import Main from "./components/main/main.jsx";
import './style/common.css';
//создание функции с названием App()
function App() { 
  //jsx
  //у всех тэегов должен быть родитель, поэтому используем пустой тег - ReactFragment, в качетсве родителя
  return (
    <>
    <Header />
    <Main />
    </>
  );
}

export default App;

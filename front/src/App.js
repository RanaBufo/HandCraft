import Header from "./components/header/header.jsx";
import MainMenu from "./components/MainMenu/mainMenu.jsx";
import './style/common.css';
//создание функции с названием App()
function App() { 
  //jsx
  //у всех тэегов должен быть родитель, поэтому используем пустой тег - ReactFragment, в качетсве родителя
  return (
    <>
    <Header />
    <MainMenu />
    </>
  );
}

export default App;

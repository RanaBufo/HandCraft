import './style/header.css';
import { useLocation } from "react-router-dom";
import magnifier from './../../img/magnifier.png';
import userIcon from './../../img/Ellipse 6userIcon.png';
import basket from './../../img/Vectorbasket.svg';
import menu from './../../img/MenuIcon.png';
import { useState, useEffect } from "react";

function Header() {
    let headerBackground = '';
    let bodyBackground = '';
    const { pathname } = useLocation();  
    if (pathname.startsWith('/registration') || pathname.startsWith('/login')) {
        headerBackground = 'linear-gradient(90deg, rgb(255, 255, 223, 45%) 0%, rgb(255, 229, 204, 45%) 100%)'; // Любой цвет, который вам нужен
        document.body.style.background = 'linear-gradient(rgba(245,214,172,1), rgba(249,180,175,1), rgba(249,167,156,1), rgba(244,215,177,1))';
    }
    else{
        headerBackground = 'linear-gradient(90deg, rgba(255,193,189,1) 0%, rgba(255,128,127,1) 100%)';
        document.body.style.background = '#F0DEC6';
    }
    const [isOpen, setOpen] = useState(false);
    return (
        <header>
            <div className='h-container' style={{ background: headerBackground }}>
                <div className='header_row' >
                    <div>
                        <img src={magnifier} className='search-img' alt="Search" />
                        <input className='search' />
                    </div>
                    <div className='menu'>
                        <img src={userIcon} className='icon-user' alt="User" />
                        <img src={basket} className='icon-header icon-cart' alt="Basket" />
                        <img className='menuButton icon-header icon-menu' onClick={() => setOpen(!isOpen)} src={menu} alt="Menu" />
                        <nav className={`menuCategories ${isOpen ? "active" : ""}`}>
                            <ul className="menu__list">
                                <li className="menu__item">Свитеры</li>
                                <li className="menu__item">Шапки</li>
                                <li className="menu__item">Шали</li>
                                <li className="menu__item">Пледы</li>
                                <li className="menu__item">Платья</li>
                                <li className="menu__item">Топы</li>
                                <li className="menu__item">Юбки</li>
                                <li className="menu__item">Шоперы</li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;

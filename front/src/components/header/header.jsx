import './style/header.css';
import magnifier from './../../img/magnifier.png';
import userIcon from './../../img/Ellipse 6userIcon.png';
import basket from './../../img/Vectorbasket.svg';
import settings from './../../img/Vectorsettings.svg';
function Header() {
    return(
        <header>
            <div className='h-container'>
                <div className='header_row'>
                <div >
                    <img src={magnifier} className='search-img'/>
                    <input className='search'></input>
                </div>
                <div className='menu'>
                    <img src={userIcon} className='icon-user' />
                    <img src={basket} className='icon-header'/>
                    <img src={settings} className='icon-header'/>
                </div>
                
                
                </div>
            </div>
        </header>
    )
}

export default Header;
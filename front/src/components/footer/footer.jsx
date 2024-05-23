import './style/footer.css';
import { useLocation } from "react-router-dom";
import footer from './../../img/Footer.png';

function Footer() {
    
    return (
        <footer>
            <div className = 'footer'>
                <img src ={footer}></img>
            </div>

        </footer>
    );
}

export default Footer;

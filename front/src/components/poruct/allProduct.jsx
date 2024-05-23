import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import YarnIcon from "../../img/YarnIcon.png";
import CeramicIcon from "../../img/CeramicIcon.png";
import NeedleIcon from "../../img/NeedleIcon.png";
//import ProductBackground from "../../img/ProductBackground.png";


function Product() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then((res) => res.json())
            .then((arr) => {
                setItems(arr);
                setLoading(true);
            });
    }, []);
    const navigate = useNavigate();
    const handleInfoClick = (id) => {
        navigate("/" + id);// Используйте navigate для перехода на другую страницу
    };
    console.log(items)
    return (

        loading ? (
            <>
                <div className="rowInfo">
                    <div className="typeIconCircle">
                            <img
                                src={YarnIcon}
                                alt={items.ImgName ? "Item Image" : "Перейти в раздел Вязаных изделий"}
                                className="iconPic"
                            /> 
                    </div>
                    <div className="typeIconCircle">
                        <img
                            src={CeramicIcon}
                            alt={items.ImgName ? "Item Image" : "Перейти в раздел Керамики"}
                            className="iconPic"
                        />
                    </div>
                    <div className="typeIconCircle">
                        <img
                            src={NeedleIcon}
                            alt={items.ImgName ? "Item Image" : "Перейти в раздел Бисероплетения"}
                            className="iconPic"
                        />
                    </div>
                </div>
        <div className="background">
        
            <div className="row ">
                {items.map((item) => (
                    <div key={item.id} className="cardProduct">
                        
                    
                        <img src={item.image} className="imgProduct" alt={item.title} />
                    
                        <p className="name">{item.title}</p>
                        <div className="productText"><p className="descriptionStyle">{item.description}</p></div>
                        <div className="productText"><p className="descriptionStyle">${item.price}</p></div>
                        <div className="productText"><button className="buyButton" onClick={() => handleInfoClick(item.id)}>Buy</button></div>
                    </div>
                ))}
            </div>
        </div>
            </>
        ) : (
            <p>Loading...</p>
        )
    );
}

export default Product;
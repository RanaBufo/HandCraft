import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Product() {
    const [item, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const prodId = params.id;

    useEffect(() => {
        fetch('https://fakestoreapi.com/products/' + prodId)
            .then((res) => res.json())
            .then((arr) => {
                setItems(arr);
                setLoading(true);
            });
    }, [prodId]);

    const navigate = useNavigate();

    return (
        loading ? (
            <section key={item.id} className="cardOfOneProduct">
                <section>
                    <img src={item.image} className="imgOfOneProduct" alt={item.title} />
                </section>
                <section className="sideText">
                    <p className="productName">{item.title}</p>
                    <p className="descriptionStyle">{item.description}</p>
                    <p>{item.category}</p>
                    <p className="priceStyle">{item.price}$</p>
                    <button className="returnButton" onClick={() => navigate(-1)}>Return</button>
                    <button className="buyButton" onClick={() => navigate(-1)}>AddToCart</button>
                </section>
                
            </section>
        ) : (
            <p>Loading...</p>
        )
    );
}

export default Product;

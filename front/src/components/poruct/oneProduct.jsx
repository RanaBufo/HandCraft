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
            <div key={item.id} className="cardProduct">
                <img src={item.image} className="imgProduct" alt={item.title} />
                <p className="name">{item.title}</p>
                <p className="descriptionStyle">{item.description}</p>
                <p>${item.category}</p>
                <p>${item.price}</p>
                <button className="returnButton" onClick={() => navigate(-1)}>Return</button>
            </div>
        ) : (
            <p>Loading...</p>
        )
    );
}

export default Product;

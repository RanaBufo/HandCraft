import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Product() {
    const [item, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const prodId = params.id;

    useEffect(() => {
        fetch('https://localhost:7073/Product/ProductByIdGet?id=' + prodId)
            .then((res) => res.json())
            .then((arr) => {
                setItems(arr);
                setLoading(true);
            });
    }, [prodId]);

    const navigate = useNavigate();

    return (
        loading ? (
            <div key={item.id} >
                <section className="leftSideText">
                    <div className="picCuter">
                        <img src={item.image} className="imgProduct" alt={item.title} />
                    </div>
                </section>
                <section className="rightSideText">
                    <p className="name">{item.name}</p>
                    <p className="descriptionStyle">{item.description}</p>
                    <p>{item.category}</p>
                    <p>${item.price}</p>
                    <button className="buyButton" onClick={() => navigate(-1)}>Add To Cart</button>
                    <br /><button className="returnButton" onClick={() => navigate(-1)}>Return</button>

                </section>
            </div>
        ) : (
            <p>Loading...</p>
        )
    );
}

export default Product;
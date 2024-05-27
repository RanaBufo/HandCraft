import { useState, useEffect } from "react";
import {Link, useNavigate  } from "react-router-dom";

function Product(category) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);

    //const { categoryId } = useParams(); 
    

    const allProductUrl = `https://localhost:7073/Product/ProductsGet`;
    const categoryProductUrl = `https://localhost:7073/Product/ProductByCategoryGet?id=${category}`;
    
    if (category != 0 ) {
        const url = categoryProductUrl;
        console.log(category)
        console.log(url)
    }
    else{
        const url = allProductUrl;
        console.log(category)
        console.log(url)
    }
        

    useEffect(() => {
        fetch('https://localhost:7073/Product/ProductsGet/')
        .then((res) => res.json())
        .then((arr) => {
            setItems(arr);
            setLoading(true);
        });
    }, []);
    const navigate = useNavigate();
    const handleInfoClick = (id) => {
        navigate("/products/"+id);// Используйте navigate для перехода на другую страницу
    };

    return (
        loading ? (<div className="row position">
            {items.map((item) => (
              <div key={item.id} className="cardProduct">
                <img src={item.image} className="imgProduct" alt={item.title} />
                  <p className="name">{item.name}</p>
                  <p className="descriptionStyle">{item.description}</p>
                  <p>${item.price}</p>
                  <button onClick={() => handleInfoClick(item.id)}>Info</button>
              </div>
            ))}
        </div>
        ) : (
            <p>Loading...</p>
        )
    );
}

export default Product;
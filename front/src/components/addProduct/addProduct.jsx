import "./style/addProduct.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
function AddProduct() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [imgName, setImgName] = useState("");
    const [quantity, setQuantity] = useState("");
    const navigate = useNavigate();

    const addProduct = (data) => {
    const body = {
        Name: data.name,
        Description: data.description,
        Price: data.price,
        ImgName: null,
        //Discount: null,
        Quantity: data.quantity,
        //ProductComposition: {
        //    Id: null,
        //},
        //ProductColor: {
        //    Id: null,
        //},
        //ProductCategory: {
        //    Id: null,
        //},
    };

        let headers = {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json;charset=utf-8",
        };

        fetch("https://localhost:7073/Product/ProductPost", {
        method: "POST",
        body: JSON.stringify(body),
        headers: headers,
        
    })
        .then((response) => {
            if (!response.ok) {
                return response.json().then((text) => {
                    throw new Error(text);
                });
            }
            return response.json();
        })
        .catch((error) => {
            console.error("Ошибка:", error);
        });

            console.log(name, description, price, imgName, quantity);
            navigate("/user");
        
};
    
    
    return (
        <>
            
            <div className="in-block">
                <h1>Добавить товар</h1>
                
                <div className="input-group">
                    <label>Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    ></input>

                    <label>Description</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                    ></input>

                    <label>Name image</label>
                    <input
                        type="text"
                        value={imgName}
                        onChange={(event) => setImgName(event.target.value)}
                    ></input>

                    <label>Price</label>
                    <input
                        type="text"
                        value={price}
                        onChange={(event) => setPrice(event.target.value)}
                    ></input>

                    <label>Quantity</label>
                    <input
                        type="text"
                        value={quantity}
                        onChange={(event) => setQuantity(event.target.value)}
                    ></input>

                </div>
                <button onClick={addProduct} type="submit">Создать</button>
                
            </div>
        </>
    );
}

export default AddProduct;
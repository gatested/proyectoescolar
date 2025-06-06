import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "../styles/App.css";
import "../styles/Product.css";
import { useNavigate, useParams } from "react-router-dom";

function Product(ProductElement) {
    const navigate = useNavigate();
    const product = ProductElement.ProductElement;
    return (
        <button className="Product" onClick={() => navigate("/Product/" + product.id)}>
            <div className="cover" style={{backgroundImage: "url(" + product.image_url + ")"}}></div>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
        </button>
    )

}

export default Product;
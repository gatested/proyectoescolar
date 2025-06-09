import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "../styles/App.css";
import "../styles/Product.css";
import { useNavigate, useParams } from "react-router-dom";

function Product(props) {
    const { ProductElement, styles } = props;
    const navigate = useNavigate();
    
    return (
        <button className="Product" onClick={() => navigate("/Product/" + ProductElement.id)} style={styles}>
            <div className="cover" style={{backgroundImage: "url(" + ProductElement.image_url + ")"}}></div>
            <h3>{ProductElement.name}</h3>
            <p>{ProductElement.description}</p>
        </button>
    )

}

export default Product;
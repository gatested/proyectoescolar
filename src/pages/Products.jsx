import {useEffect, useState} from "react";
import Product from "../elements/product";
import { useNavigate } from "react-router-dom";
import ProductSkeleton from "../elements/productSkeleton";
import { APIURl } from "../services/APIPath";

function Products() {
    const navigate = useNavigate();
    const [productos, setProductos] = useState([]);
    const [IsLoading, setIsLoading] = useState(true);
    
  
    useEffect(() => {
      fetch(APIURl + '/products/products')
        .then(response => {
    
          // Verifica si la respuesta fue exitosa
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
    
          // Retorna el cuerpo de la respuesta en JSON
          return response.json();
        })
        .then(data => {
          setProductos(data);
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Error al obtener productos:', error);
        });
    }, []);
    return (
      <div style={{marginTop: "100px"}}>
        <h1 style={{width: "100%", textAlign: "center", fontSize: "30px"}}>Nuestros Productos</h1>
        <div className="ProductsContainer">
        {IsLoading && Array(5).fill(0).map((_, i) => <ProductSkeleton key={i}/>)}
        {productos.map((producto, i) => (
           <Product ProductElement={producto} styles={{ marginLeft: i > 0 ? '10px' : 0 }} key={i}/>
        ))}
      </div>
      </div>
    )
}

export default Products;
import {useEffect, useState} from "react";
import "../styles/App.css";
import Product from "../elements/product";
import { useNavigate } from "react-router-dom";
import ProductSkeleton from "../elements/productSkeleton";


function Home() {
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [IsLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('https://auriliabackend.onrender.com/products/products/isprincipal')
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
    <div className="Home">
      <iframe className="welcomeVideo" 
      src='https://www.youtube.com/embed/aABU_YO1MZo?si=oBJmo7ITFpjCzCRN&amp;controls=0&autoplay=1&mute=1'
       title="YouTube video player"
        frameborder="0" 
        allow="accelerometer; 
        autoplay; clipboard-write; 
        encrypted-media; gyroscope; 
        picture-in-picture; 
        web-share" 
        referrerpolicy="strict-origin-when-cross-origin" 
        allowfullscreen></iframe>
      <div className="Welcome">
        <div className="HomeLogo"></div>
        <h1>Aurilia</h1>
        <p>"Lo natural en cada producto"</p>
      </div>
      <div className="ProductsContainer">
        {IsLoading && <ProductSkeleton />}
        {productos.map((producto, i) => (
           <Product ProductElement={producto} key={i}/>
        ))}
      </div>
      <div style={{display: "flex", justifyContent: "center"}}>
      <button className="mainButton" onClick={() => navigate("/Products")}>
          Ver Todos Los Productos
        </button>
      </div>
      <p>* Video de prueba</p>
    </div>
  );
}

export default Home;
import {useEffect, useState} from "react";
import "../styles/App.css";
import { Link } from "react-router-dom";


function Home() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch('https://auriliabackend.onrender.com/api/products')
      .then(response => response.json())
      .then(data => setProductos(data))
      .catch(error => console.error('Error al obtener productos:', error));
  }, []);

  console.log(productos);
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
        <Link to="/Products">
          <button className="mainButton">Ver Productos</button>
        </Link>
      </div>
      <p>* Video de prueba</p>
    </div>
  );
}

export default Home;
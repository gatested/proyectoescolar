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
      <div className="Welcome">
        <div className="HomeLogo"></div>
        <h1>Aurilia</h1>
        <p>"Lo natural en cada producto"</p>
        <Link to="/Productos">
          <button>Ver Productos</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
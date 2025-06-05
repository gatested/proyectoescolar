import React from "react";
import "../styles/App.css";
import { Link } from "react-router-dom";

function Home() {
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
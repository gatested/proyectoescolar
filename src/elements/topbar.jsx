import React from "react";
import "../styles/Topbar.css";
import { Link } from "react-router-dom";

function TopBar() {
    return (
        <div className="TopBar">
            <div className="TopbarLogo"></div>
            <ul className="TopbarDirections">
                <li><Link to="/">Inicio</Link></li>
                <li><Link to="/Products">Productos</Link></li>
                <li><Link to="/faq">FAQ</Link></li>
                <li><Link to="/About-us">Sobre nosotros</Link></li>
            </ul>
        </div>
    )
}

export default TopBar;
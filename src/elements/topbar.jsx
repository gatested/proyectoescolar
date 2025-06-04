import React from "react";
import "../styles/Topbar.css";
import { Link } from "react-router-dom";

function TopBar() {
    return (
        <div className="TopBar">
            <div className="TopbarLogo"></div>
            <ul className="TopbarDirections">
                <li><a href={'/'}>Inicio</a></li>
                <li><a href={'/'}>Productos</a></li>
                <li><a href={'/'}>FAQ</a></li>
                <li><a href={'/'}>Sobre nosotros</a></li>
            </ul>
        </div>
    )
}

export default TopBar;
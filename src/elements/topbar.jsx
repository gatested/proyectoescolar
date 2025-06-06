import React, { useState } from "react";
import "../styles/Topbar.css";
import { Link } from "react-router-dom";

function TopBar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className="TopBar">
            <Link to="/"><div className="TopbarLogo"></div></Link>

            <button className="TopbarMenuButton" onClick={toggleMenu}>
                &#9776; {/* hamburger icon */}
            </button>

            <ul className={`TopbarDirections ${menuOpen ? "open" : ""}`}>
                <li><Link to="/">Inicio</Link></li>
                <li><Link to="/Products">Productos</Link></li>
                <li><Link to="/faq">FAQ</Link></li>
                <li><Link to="/About-us">Sobre nosotros</Link></li>
            </ul>
        </div>
    );
}

export default TopBar;

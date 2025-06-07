import React, { useEffect, useState } from "react";
import "../styles/Topbar.css";
import { Link, useLocation  } from "react-router-dom";

function TopBar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };
    useEffect(() => {
        setMenuOpen(false);
    }, [location.pathname]);

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

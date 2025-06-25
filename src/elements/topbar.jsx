import React, { useEffect, useState } from "react";
import "../styles/Topbar.css";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion"; // corregido a framer-motion
import { useWindowSize } from "../hooks/useWindowSize";
import { FaHome, FaBoxOpen, FaQuestionCircle, FaInfoCircle } from 'react-icons/fa';


// Variantes para el contenedor (solo opacidad)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  exit: { opacity: 0 }
};

// Variantes para los items hijos
const itemVariants = {
  hidden: { y: -20, opacity: 0, filter: 'blur(10px)' },
  visible: { y: 0, opacity: 1, filter: 'blur(0px)', transition: { type: 'spring', stiffness: 300, damping: 24 } },
  exit: { y: -20, opacity: 0, filter: 'blur(10px)' }
};

function TopBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { width } = useWindowSize();
  const isMobile = width <= 900;

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  // Cierra menú al navegar
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Desmonta menú si pasa a pantalla grande
  useEffect(() => {
    if (!isMobile) {
      setMenuOpen(false);
    }
  }, [isMobile]);

  return (
    <>
      <div className={`TopBar ${menuOpen ? "Tactive" : ""}`}>
        <Link to="/"><div className="TopbarLogo"></div></Link>

        {isMobile && (
        <button className="TopbarMenuButton" onClick={toggleMenu}>
            {menuOpen ? "✕" : "☰"}
        </button>
        )}


        {!isMobile && (
          <ul className="TopbarDirections">
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/@Aurilia">Productos</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/About-us">Sobre nosotros</Link></li>
          </ul>
        )}
      </div>

      {/* Menú móvil animado */}
      <AnimatePresence>
        {isMobile && menuOpen && (
            <motion.div
            className="MobileMenu"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            >
            <motion.ul>
                <motion.li variants={itemVariants}>
                <Link to="/">
                    <FaHome className="MobileIcon" />
                    Inicio
                </Link>
                </motion.li>

                <motion.li variants={itemVariants}>
                <Link to="/@Aurilia">
                    <FaBoxOpen className="MobileIcon" />
                    Productos
                </Link>
                </motion.li>

                <motion.li variants={itemVariants}>
                <Link to="/faq">
                    <FaQuestionCircle className="MobileIcon"/>
                    FAQ
                </Link>
                </motion.li>

                <motion.li variants={itemVariants}>
                <Link to="/About-us">
                    <FaInfoCircle className="MobileIcon"/>
                    Sobre nosotros
                </Link>
                </motion.li>

            </motion.ul>
            </motion.div>
        )}
    </AnimatePresence>
    </>
  );
}

export default TopBar;

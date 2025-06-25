import { useEffect, useState } from "react";
import React from 'react';
import "../styles/App.css";
import Product from "../elements/product";
import { useNavigate } from "react-router-dom";
import ProductSkeleton from "../elements/productSkeleton";
import { motion } from "motion/react";
import { APIURl } from "../services/APIPath";

type Producto = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
};

const Slogan = '"Lo natural en cada producto"';

const palabraVariant = {
  hidden: { opacity: 0, y: 20, filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' }
};

const SloganP = () => {
  return (
    <motion.p
      initial="hidden"
      animate="visible"
      style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}
    >
      {Slogan.split(" ").map((palabra, i) => (
        <motion.span
          key={i}
          variants={palabraVariant}
          transition={{ duration: 0.8, delay: (i * 0.15) + 0.2 }}
          style={{ display: 'inline-block', whiteSpace: 'pre' }}
        >
          {palabra}
        </motion.span>
      ))}
    </motion.p>
  );
};

function Home() {
  const navigate = useNavigate();

  const [productos, setProductos] = useState<Producto[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(APIURl+'/products/products/isprincipal')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data: Producto[]) => {
        setProductos(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error al obtener productos:', error);
      });
  }, []);

  return (
    <>
    <div className="Home">
      {/* <iframe
        className="welcomeVideo"
        src="https://www.youtube.com/embed/aABU_YO1MZo?si=oBJmo7ITFpjCzCRN&amp;controls=0&autoplay=1&mute=1"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe> */}

      <div className="Welcome">
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 50},
            visible: { opacity: 1, y: 0 },
          }}
          transition={{duration: 0.8}}
          initial="hidden"
          animate="visible"
         className="HomeLogo"></motion.div>
        <motion.h1
          variants={{
            hidden: { opacity: 0, y: 50, filter: 'blur(6px)'  },
            visible: { opacity: 1, y: 0, filter: 'blur(0px)'  },
          }}
          transition={{duration: 0.8, delay: 0.1}}
          initial="hidden"
          animate="visible"
        >
          Aurilia
        </motion.h1>
        <SloganP />
      </div>
      <div className="ProductsContainer">
        {isLoading && <ProductSkeleton />}
        {productos.map((producto, i) => (
          <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={palabraVariant}
          transition={{ duration: 0.8, delay: i * 0.15}}
          >
            <Product ProductElement={producto} styles={{ marginLeft: i > 0 ? '10px' : 0 }} key={i}/>
          </motion.div>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        {!isLoading && 
        <motion.button
        initial="hidden"
        whileInView="visible"
        whileHover={{ scale: 1.06,transition: { duration: 0.2, ease: "easeInOut" }, }}
        viewport={{ once: true }}
        variants={palabraVariant}
        transition={{duration: 0.8, delay: 0.2}}
         className="mainButton" onClick={() => navigate("/@Aurilia")}>
          Ver Todos Los Productos
        </motion.button>
        }
      </div>
    </div>
    </>
  );
}

export default Home;

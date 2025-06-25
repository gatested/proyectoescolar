import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import '../styles/PDP.css'
import { APIURl } from '../services/APIPath';
import { motion, AnimatePresence } from "motion/react";
import { blur } from 'three/tsl';

function ProductDedicatedPage() {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [IsLoading, setIsLoading] = useState(true);
    const [parsedFeatures, setParsedFeatures] = useState([]);
    const [MarketServiceLoaded, setMarketServiceLoaded] = useState(false);
    const blurvalue = "10px"


    useEffect(() => {
      window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth' // o 'auto'
    });
        if (!product.features) return;
      
        try {
          if (typeof product.features === 'string') {
            const temp = JSON.parse(product.features);
            if (Array.isArray(temp)) {
              setParsedFeatures(temp);
            }
          } else if (Array.isArray(product.features)) {
            setParsedFeatures(product.features);
          }
        } catch (error) {
          console.warn('Error al parsear product.features:', error);
          setParsedFeatures([]); // opcional: reset en caso de error
        }
      }, [product]);
      
    useEffect(() => {
        window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth' // o 'auto'
    });
    }, [id]);
    useEffect(() => {
        fetch(APIURl + '/products/product/' + id)
          .then(response => {
      
            // Verifica si la respuesta fue exitosa
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
      
            // Retorna el cuerpo de la respuesta en JSON
            return response.json();
          })
          .then(data => {
            if (data && data.length > 0) {
                setProduct(data[0]);
                setIsLoading(false);
              } else {
                console.warn("Producto no encontrado o respuesta vacía.");
                setProduct({}); // o {} si prefieres
              }
          })
          .catch(error => {
            console.error('Error al obtener productos:', error);
          });
      }, [id]);
      useEffect(() => {
        if (IsLoading) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        // Limpieza al desmontar (por si acaso)
        return () => {
            document.body.style.overflow = '';
        };
    }, [IsLoading]);

    return (
        <div className="ProductDedicatedPage">
            <AnimatePresence mode="wait">
  {IsLoading ? (
    <motion.div
      key="cover-skeleton"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      style={{width: "100%"}}
    >
      <Skeleton className="Cover" />
    </motion.div>
  ) : (
   <motion.div
  key="cover-loaded"
  className="Cover Coverloaded"
  style={{ backgroundImage: `url(${product.cover_url})` }}
  initial={{ opacity: 0, y: 20, filter: `blur(${blurvalue})` }}
  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
  exit={{ opacity: 0 }}
  transition={{
    type: "spring",
    stiffness: 120,
    damping: 20,
    duration: 0.8,
  }}
/>

  )}
</AnimatePresence>

<div className="ProductInfo">
  <AnimatePresence mode="wait">
    {IsLoading ? (
      <motion.div
        key="product-skeletons"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="SkeletonGroup"
      >
        <Skeleton className="Image" />
        <Skeleton className="Texts" width="100%" height={40} />
        <Skeleton className="Texts" width="50%" height={13} />
        <Skeleton className="Texts" width="50%" height={20} />
        <Skeleton className="Texts" width="100%" height={220} />
      </motion.div>
    ) : (
      <>
      <motion.div
        key="image-loaded"
        initial={{ opacity: 0, y: 10, filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
          className="Image loaded"
          style={{
            backgroundImage: `url(${product.image_url})`,
            marginBottom: "21px",
          }}
      />
      <motion.div
        key="product-content"
        initial={{ opacity: 0, y: 10, filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className='ProductInfo'
      >

        <h1>{product.name}</h1>

        <p style={{ fontWeight: "bold", marginBottom: "10px" }}>
          <Link to={`/@${product.vendor_info.username}`}>
            {product.vendor_info.display_name}
          </Link>
        </p>

        <h2>Price</h2>
        <div className='productMarket'>
          <p>${new Intl.NumberFormat('en-US').format(product.price)} {MarketServiceLoaded? null : "(Waiting for MarketHandlerAsyncService)"}</p>
          {MarketServiceLoaded? <button>Buy</button> : <Skeleton className='buttonSkeleton' width={150} height={35} />}
        </div>

        <h2>Description</h2>

        <p>{product.description}</p>
         {parsedFeatures.length > 0 ? (
                  <>
                    {parsedFeatures.map((feature, index) => (
                      <div key={index}>
                        <h2 style={{ marginTop: "20px" }}>{feature.title}</h2>
                        <div className='espec'>
                          <ul style={{ marginLeft: "15px" }}>
                            {feature.elements.map((item, idx) => (
                              <li key={idx}>
                                <strong>{item.titulo}</strong>: {item.descripcion}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  !IsLoading && <strong>No hay especificaciones disponibles</strong>
                )}
        <h2>Comments</h2>
        <Skeleton width={"100%"} height={35} count={5} />
      </motion.div>
      </>
    )}
  </AnimatePresence>
</div>
</div>
    )
}
export default ProductDedicatedPage;
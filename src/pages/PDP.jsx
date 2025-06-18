import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import '../styles/PDP.css'
import { APIURl } from '../services/APIPath';

function ProductDedicatedPage() {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [IsLoading, setIsLoading] = useState(true);
    const [parsedFeatures, setParsedFeatures] = useState([]);


    useEffect(() => {
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
        window.scrollTo(0, 0);
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
            {IsLoading? <Skeleton className='Cover'/> : <div className='Cover Coverloaded' style={{backgroundImage: "url(" + product.cover_url + ")"}}></div>}
            <div className='ProductInfo'>
                {IsLoading? <Skeleton className='Image'/> : <div className='Image loaded' style={{backgroundImage: "url(" + product.image_url + ")"}}></div>}
                {IsLoading ? <Skeleton className='Texts' width="100%" height={40}/> : <h1>{product.name}</h1>}
                {IsLoading ? <Skeleton className='Texts' width="100%" height={40}/> : <p style={{fontWeight: "bold", marginBottom: "10px"}}>Seller: <Link to={'/@' + product.vendor_info.username}>{product.vendor_info.username}</Link></p> }
                {!IsLoading && <h2>Description</h2>}
                {IsLoading? <Skeleton className='Texts' width="100%" height={220}/> : <p>{product.description}</p>}
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

            </div>
        </div>
    )
}
export default ProductDedicatedPage;
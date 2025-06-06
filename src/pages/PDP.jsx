import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import '../styles/PDP.css'

function ProductDedicatedPage() {
    const { id } = useParams();
    console.log(id);
    const [product, setProduct] = useState({});
    const [IsLoading, setIsLoading] = useState(true);
    useEffect(() => {
        fetch('https://auriliabackend.onrender.com/products/product/' + id)
          .then(response => {
      
            // Verifica si la respuesta fue exitosa
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
      
            // Retorna el cuerpo de la respuesta en JSON
            return response.json();
          })
          .then(data => {
            setProduct(data[0]);
            setIsLoading(false);
            console.log(data[0]);
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
            {IsLoading? <Skeleton className='Cover'/> : <div className='Cover loaded' style={{backgroundImage: "url(" + product.image_url + ")"}}></div>}
            {IsLoading ? <Skeleton className='Texts' width="60%" height={40}/> : <h1>{product.name}</h1>}
            {IsLoading? <Skeleton className='Texts' width="70%" height={220}/> : <p>{product.description}</p>}
        </div>
    )
}
export default ProductDedicatedPage;
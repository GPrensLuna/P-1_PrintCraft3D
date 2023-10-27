import axios from 'axios';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import styles from './DetailProduct.module.css'; 

function DetailProduct() {
  const { id } = useParams();
  const [Producto, setProducto] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/PrintCraft3D/Inventario/${id}`)
      .then(response => {
        setProducto(response.data);
      });
  }, [id]);

  return (
    <div className={styles.productContainer}> 
      <img src={Producto.image} className={styles.Imagen} alt="" /> 
      <div className={styles.productDetails}> 
        <h4> 
          <b>{Producto.name}</b>
        </h4>
        <p> 
          {Producto.description}
        </p>
        <p> 
          ${Producto.price}
        </p>
      </div>
    </div>
  );
}

export default DetailProduct;







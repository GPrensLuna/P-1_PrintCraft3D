import axios from "axios";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import styles from "./DetailProduct.module.css";
import { URL } from "../../config.js";
function DetailProduct() {
  const { name } = useParams();
  const [Producto, setProducto] = useState([]);

  useEffect(() => {
    axios
      .get(`${URL}Producto/${name}`)
      .then((response) => {
        setProducto(response.data);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  }, [name]);

  return (
    <div className={styles.productContainer}>
      <img src={Producto.image} className={styles.Imagen} alt="" />
      <div className={styles.productDetails}>
        <h4>
          <b>{Producto.name}</b>
        </h4>
        <p>{Producto.description}</p>
        <p>${Producto.price}</p>
      </div>
    </div>
  );
}

export default DetailProduct;

import axios from "axios";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import styles from "./DetailProduct.module.css";
import { URL } from "../../config.js";
import Reviews from "../../Components/Review/Review.jsx";


function DetailProduct() {
  const { name, id } = useParams();
  const [Producto, setProducto] = useState([]);

  useEffect(() => {
    axios
      .get(`${URL}Producto/${name}`)
      .then((response) => {
        // Verificar que la respuesta tenga la estructura esperada
        if (response && response.data) {
          setProducto(response.data);
        } else {
          console.error("Error fetching product: Invalid response structure");
        }
      })
      .catch((error) => {
        // Manejar errores de manera más descriptiva
        if (error.response) {
          // El servidor respondió con un código de estado diferente de 2xx
          console.error(
            `Error fetching product: Server responded with ${error.response.status} - ${error.response.data}`
          );
        } else if (error.request) {
          // La solicitud fue hecha pero no se recibió respuesta
          console.error(
            "Error fetching product: No response received from the server"
          );
        } else {
          // Algo sucedió en la configuración de la solicitud que desencadenó un error
          console.error(
            "Error fetching product: Request configuration error",
            error.message
          );
        }
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
        <p>
          <Reviews productId={id}/>
        </p>
      </div>
    </div>
  );
}

export default DetailProduct;

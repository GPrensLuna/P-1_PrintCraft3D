import React, { useState, useEffect } from "react";
import { URL } from "../../config.js";
import axios from "axios";
import Swal from "sweetalert2";
import styles from "./Orden.module.css";

export default function Orden({ order, index }) {
  let { id, total } = order;

  const getProducts = async (data) => {
    // Utilizar Promise.all para esperar a que todas las Promises se resuelvan
    const productPromises = data.map(async (product) => {
      let foundProduct = await axios.get(`${URL}Product/${product.ProductId}`);
      return foundProduct.data; // Guardar los datos reales en lugar de la Promesa
    });

    const resolvedProducts = await Promise.all(productPromises);

    // Actualizar el estado con los datos resueltos
    return resolvedProducts;
  };
  const handleShowOrder = async () => {
    let { data } = await axios.get(`${URL}Order/${id}`);

    let resolvedProducts = await getProducts(data);

    // Formatear los productos para mostrar en la alerta
    const productHTML = resolvedProducts.map(
      (product) =>
        `<div class="product">
                <img src="${product.image}" alt="${product.name}" />
                <p><strong>${product.name}</strong></p>
                <p>Precio: ${product.price}</p>
            </div>`
    );

    Swal.fire({
      title: `<strong>Tu orden ${index + 1}</strong>`,
      html: `<div class="detail-card">
               <div class="detail-info">
                 <p><strong>Id:</strong> ${id}</p>
                 <p><strong>Total:</strong> ${total}</p>
                 <p><strong>Productos:</strong></p>
                <div class="product-list">${productHTML.join("")}</div>
               </div>
             </div>`,
      showCancelButton: true,
      showConfirmButton: false,
      cancelButtonText: "Cerrar",
      focusConfirm: false,
    });
  };

  return (
    <div>
      <div onClick={handleShowOrder} className={styles.li}>
        <p>Tu orden {index + 1}</p>
      </div>
    </div>
  );
}

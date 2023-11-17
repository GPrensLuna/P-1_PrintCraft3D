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
                <img class="imagen" src="${product.image}" alt="${product.name}" />
                <p><strong>${product.name}</strong></p>
                <p><strong>Precio: $</strong>${product.price}</p>
                <hr />
            </div>`
    );

    Swal.fire({
      title: `<strong>Tu compra N° ${index + 1}</strong>`,
      html: `<div class="detail-card">
               <div class="detail-info">
                 <span class="id"><strong>Id:</strong> ${id}</span>
                 <span class="total"><strong>-  Total de la Compra: $</strong>${total}</span>
                 <hr />
                 <p><strong><u>Productos:</u></strong></p>
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
        <p>Tu Compra N° {index + 1}</p>
      </div>
    </div>
  );
}

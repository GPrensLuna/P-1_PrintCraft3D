import React from "react";
// import style from "./Card.module.css";
import "./Card.css";
import Swal from "sweetalert2";

const Card = (props) => {
  const {
    id,
    name,
    image,
    description,
    price,
    size,
    material,
    category,
    // onDelete,
    addToCart,
  } = props;

  // const materialName = material ? material : "Material no disponible";
  // const categoryName = category ? category : "Categoría no disponible";
  // const SizeName = size ? size : "Categoría no disponible";
  // const nameM = name ? name.toUpperCase() : "Nombre no disponible";

  // const priceFormatted = parseFloat(price).toLocaleString("en-US", {
  //   style: "currency",
  //   currency: "USD",
  // });

  // const handleDeleteClick = () => {
  //   const idProduct = id;
  //   onDelete(idProduct);
  // };

  //funcion para para ver el detail del producto con sweetalert
  const handleDetailProductClick = () => {
    Swal.fire({
       title: `<strong>${name}</strong>`,
       html:
         `<div class="detail-card">
            <img class="detail-img" src="${image}" alt="${name}" />
            <div class="detail-info">
              <p><strong>Descripción:</strong> ${description}</p>
              <p><strong>Tamaño:</strong> ${size}</p>
              <p><strong>Material:</strong> ${material}</p>
              <p><strong>Categoria:</strong> ${category}</p>
              <p><strong>Precio:</strong> $${price}</p>
            </div>
          </div>`,
       showCloseButton: true,
       showCancelButton: true,
       focusConfirm: false,
       confirmButtonText: "Agregar al carrito",
       cancelButtonText: "Cancelar",
       confirmButtonColor: "#202020",
    }).then((result) => {
       if (result.isConfirmed) {
         handleAddToCartClick();
       }
    });
   };
   
  const handleAddToCartClick = () => {
    const productId = id;
    addToCart(productId);
  }
  return (
    <div className="product-card">
      <img className="product-image" alt={name} src={image}  onClick={handleDetailProductClick}/>{" "}
      <div className="size-info">
        {" "}
        <strong>size: {size}</strong>
      </div>
      <div className="product-title">
        <strong>{name}</strong>
      </div>
      <div className="product-desc">{description}</div>
      <div className="cart-price">
        <span className="offer-price">
          <strong>${price}</strong>
        </span>
      </div>
      <div className="add-to-cart-parent">
        <div className="cart-parent">
          <div className="ml-auto"></div>
          <div className="material-info">
            <strong>▓ {material}</strong>
          </div>
          <button className="cart-btn" onClick={handleAddToCartClick}>
            <i className="fa fa-plus"></i>
            <strong>Add to Cart</strong>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;

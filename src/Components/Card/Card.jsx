// Card.js
import React from "react";
import style from "./Card.module.css";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const Card = (props) => {
  const {
    id,
    name,
    image,
    description,
    Size,
    price,
    Material,
    Category,
    onDelete,
  } = props;

  const materialName = Material ? Material.name : "Material no disponible";
  const categoryName = Category ? Category.name : "Categoría no disponible";
  const SizeName = Category ? Size.name : "Categoría no disponible";
  const nameM = name ? name.toUpperCase() : "Nombre no disponible";

  const priceFormatted = parseFloat(price).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  const handleDeleteClick = () => {
    const idProduct = id; // Reemplaza con el ID real del producto que deseas eliminar
    onDelete(idProduct);
  };
  return (
    <div className={style.Card}>
      <button className={style.onClonse} onClick={handleDeleteClick}>
        X
      </button>
      <button className={style.BtnCarrito}>
        <FontAwesomeIcon icon={faShoppingCart} />
      </button>
      <Link className={style.Link} to={`Producto/${name}`}>
        <img className={style.Imagen} src={image} alt={name} />
      </Link>
      <div className={style.Container}>
        <Link className={style.Link} to={`Producto/${name}`}>
          <h3 className={style.name}>{nameM}</h3>
        </Link>
        <p className={style.description}>{description}</p>
        <p className={style.size}>Tamaño: {SizeName}</p>
        <p className={style.price}>Precio: {priceFormatted}</p>
        <p className={style.Material}>Material: {materialName}</p>
        <p className={style.Category}>Categoría: {categoryName}</p>
      </div>
    </div>
  );
};

export default Card;

import React from "react";
import style from "./Card.module.css";

const Card = (props) => {
  const { name, image, description, size, price, Material, Category } = props;
  const nameM = name ? name.toUpperCase() : "Nombre no disponible";
  const sizeM = size ? size.toUpperCase() : "Tamaño no disponible";

  const materialName = Material ? Material.name : "Material no disponible";
  const categoryName = Category ? Category.name : "Categoría no disponible";

  // Formatear el precio como moneda basado en la configuración regional del navegador
  const priceFormatted = parseFloat(price).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <div className={style.Card}>
      <img className={style.Imagen} src={image} alt={name} />
      <div className={style.Container}>
        <h3 className={style.name}>{nameM}</h3>
        <p className={style.description}>{description}</p>
        <p className={style.size}>Tamaño: {sizeM}</p>
        <p className={style.price}>Precio: {priceFormatted}</p>
        <p className={style.Material}>Material: {materialName}</p>
        <p className={style.Category}>Categoría: {categoryName}</p>
      </div>
    </div>
  );
};

export default Card;

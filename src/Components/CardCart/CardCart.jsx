import React from "react";
import style from "./CardCart.module.css";

const CardCart = ({ data, delAllFromCart, addToCart, removeFromCart }) => {
  const {
    id,
    name,
    image,
    description,
    size,
    price,
    material,
    cantidad,
    category,
  } = data;
  const nameM = name ? name.toUpperCase() : "Nombre no disponible";
  const sizeM = size ? size.toUpperCase() : "Tamaño no disponible";

  const priceFormatted = parseFloat(price).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  const subTotal = price * cantidad;
  const subTotalS = parseFloat(subTotal).toLocaleString("en-US", {
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
        <p className={style.material}>Material: {material}</p>
        <p className={style.category}>Categoría: {category}</p>
        <p className={style.category}>CANTIDAD: {cantidad}</p>
        <p>
          <b>
            {priceFormatted} x {cantidad} = {subTotalS}
          </b>
        </p>
        <button onClick={() => addToCart(id)}>Agregar 1</button>
        <button onClick={() => removeFromCart(id)}>Quitar 1</button>
        <br />
        <button onClick={() => delAllFromCart(id, true)}>
          Eliminar Todos los Items
        </button>
      </div>
    </div>
  );
};

export default CardCart;

import React from "react";
import style from "./Card.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const Card = (props) => {
  const {
    id,
    name,
    image,
    description,
    price,
    sizes,
    materials,
    categorys,
    onDelete,
    addToCart,
  } = props;

  const sizesString = sizes
    ? sizes.map((size) => size.name).join(" - ")
    : "Tamaño no disponible";
  const materialsString = materials
    ? materials.map((material) => material.name).join(" - ")
    : "Material no disponible";
  const categorysString = categorys
    ? categorys.map((category) => category.name).join(" - ")
    : "Categoría no disponible";

  // const materialName = materials ? materials : "Material no disponible";
  // const categoryName = categorys ? categorys : "Categoría no disponible";
  // const SizeName = sizes ? sizes : "Categoría no disponible";
  // const nameM = name ? name.toUpperCase() : "Nombre no disponible";

  // const priceFormatted = parseFloat(price).toLocaleString("en-US", {
  //   style: "currency",
  //   currency: "USD",
  // });

  const userData = useSelector((state) => state.userData);

  const handleDeleteClick = () => {
    const idProduct = id;
    onDelete(idProduct);
  };

  const DeleteButton = () => {
    if (!userData || userData.roll === null) {
      return null;
    }

    let user = userData.roll === null ? "user" : userData.roll;

    return user === "Admin" ? (
      <button className={style.onClonse} onClick={handleDeleteClick}>
        X
      </button>
    ) : (
      "user"
    );
  };

  return (
    <div className={style.Card}>
      <DeleteButton />

      <button className={style.BtnCarrito} onClick={() => addToCart(id)}>
        <FontAwesomeIcon icon={faShoppingCart} />
      </button>
      <Link className={style.Link} to={`Producto/${name}`}>
        <img className={style.Imagen} src={image} alt={name} />
      </Link>
      <div className={style.Container}>
        <Link className={style.Link} to={`Producto/${name}`}>
          <h3 className={style.name}>{name}</h3>
        </Link>
        <p className={style.description}>{description}</p>
        <p className={style.size}>Tamaño: {sizesString}</p>
        <p className={style.price}>Precio: {price}</p>
        <p className={style.material}>Material: {materialsString}</p>
        <p className={style.category}>Categoría: {categorysString}</p>
      </div>
    </div>
  );
};

export default Card;

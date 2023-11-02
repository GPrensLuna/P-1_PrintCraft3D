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
    size,
    material,
    category,
    onDelete,
    addToCart,
  } = props;

  const materialName = material ? material : "Material no disponible";
  const categoryName = category ? category : "Categoría no disponible";
  const SizeName = size ? size : "Categoría no disponible";
  const nameM = name ? name.toUpperCase() : "Nombre no disponible";

  const priceFormatted = parseFloat(price).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  const handleDeleteClick = () => {
    const idProduct = id;
    onDelete(idProduct);
  };
  const userData = useSelector((state) => state.userData);
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
          <h3 className={style.name}>{nameM}</h3>
        </Link>
        <p className={style.description}>{description}</p>
        <p className={style.size}>Tamaño: {SizeName}</p>
        <p className={style.price}>Precio: {priceFormatted}</p>
        <p className={style.material}>Material: {materialName}</p>
        <p className={style.category}>Categoría: {categoryName}</p>
      </div>
    </div>
  );
};

export default Card;

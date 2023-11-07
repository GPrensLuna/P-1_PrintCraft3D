import React from "react";
import style from "./Card.module.css";
<<<<<<< Updated upstream
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
=======
import "./Card.css";
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
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

  const handleAddToCartClick = () => {
    const productId = id;
    addToCart(productId); // Llama a la función addToCart pasada como prop
  };

  return (
    <div className={style.Card}>
      <DeleteButton />

      <button className={style.BtnCarrito} onClick={handleAddToCartClick}>
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
=======
  return (
    // <div className={style.Card}>
    //   <button className={style.onClonse} onClick={handleDelete}>
    //     X
    //   </button>
    //   <img className={style.Imagen} src={image} alt={name} />
    //   <div className={style.Container}>
    //     <h3 className={style.name}>{nameM}</h3>
    //     <p className={style.description}>{description}</p>
    //     <p className={style.size}>Tamaño: {sizeM}</p>
    //     <p className={style.price}>Precio: {priceFormatted}</p>
    //     <p className={style.Material}>Material: {materialName}</p>
    //     <p className={style.Category}>Categoría: {categoryName}</p>
    //   </div>
    // </div>
    <div className="product-card">
      <img className="product-image" src={image} />{" "}
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
            <strong>▓ {Material}</strong>
          </div>
          <button className="cart-btn">
            <i className="fa fa-plus"></i>
            <strong>Add to Cart</strong>
          </button>
        </div>
>>>>>>> Stashed changes
      </div>
    </div>
  );
};

export default Card;

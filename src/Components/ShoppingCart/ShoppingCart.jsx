import React, { useState, useEffect } from "react";
import CardCart from "../CardCart/CardCart.jsx";
import PagoPaypal from "../PagoPaypal/PagoPaypal.jsx";
import style from "./ShoppingCart.module.css";
// import { useSelector } from "react-redux";
// import axios from "axios";

const ShoppingCart = () => {
  // const userData = useSelector((state) => state.userData);

  const [cart, setCart] = useState(
    (typeof window !== "undefined" &&
      JSON.parse(localStorage.getItem("cart"))) ||
      []
  );

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleAddToCart = (id) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id) {
        return { ...item, cantidad: item.cantidad + 1 };
      }
      return item;
    });
    setCart(updatedCart);
    console.log(cart);
    console.log(JSON.parse(localStorage.getItem("cart")));
  };

  const handleRemoveFromCart = (id) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id) {
        const updatedCantidad = item.cantidad - 1;
        if (updatedCantidad <= 0) {
          return null;
        } else {
          return { ...item, cantidad: updatedCantidad };
        }
      }
      return item;
    });

    const filteredCart = updatedCart.filter((item) => item !== null);

    setCart(filteredCart);
    console.log(cart);
    console.log(JSON.parse(localStorage.getItem("cart")));
  };

  const handleRemoveAllFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
  };

  let total = 0;
  cart.forEach((item) => (total += item.price * item.cantidad));

  const priceFormatted = parseFloat(total).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  // console.log(userData.userId);
  // console.log(userData.userId);
  // console.log(JSON.parse(localStorage.getItem("cart")));
  // const carrito = JSON.parse(localStorage.getItem("cart"));

  // const addToCart = async (dataCart) => {
  //   try {
  //     const { data } = await axios.post(
  //       "http://localhost:3001/PrintCraft3D/addToCart",
  //       dataCart
  //     );
  //     console.log(data);
  //   } catch (error) {
  //     alert(error.message);
  //   }
  // };

  // addToCart(userData.userId, carrito, total);

  return (
    <div>
      <h1>Carrito de Compras</h1>
      <article className={style.ContainerCards}>
        {cart.map((p) => (
          <CardCart
            key={p.id}
            data={p}
            addToCart={() => handleAddToCart(p.id)}
            removeFromCart={() => handleRemoveFromCart(p.id)}
            delAllFromCart={() => handleRemoveAllFromCart(p.id)}
          />
        ))}
      </article>
      <h1>Total a pagar = {priceFormatted}</h1>
      <PagoPaypal cart={cart} total={total} />
    </div>
  );
};

export default ShoppingCart;

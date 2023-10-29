import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart, delFromCart } from "../../redux/actions/actions.js";
import CardCart from "../CardCart/CardCart.jsx";

const ShoppingCart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [total, setTotal] = useState(0);

  return (
    <div>
      <h1>Carrito de Compras</h1>
      <article>
        <button onClick={() => dispatch(clearCart())}>Limpiar Carrito</button>
        {cart.map((item, index) => (
          <CardCart
            key={index}
            data={item}
            delOneFromCart={() => dispatch(delFromCart(item.id))}
            delAllFromCart={() => dispatch(delFromCart(item.id, true))}
            total={total}
            setTotal={setTotal}
          />
        ))}
      </article>
      <h1>{total}</h1>
      <button>Comprar</button>
    </div>
  );
};

export default ShoppingCart;

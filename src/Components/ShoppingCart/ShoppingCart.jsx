import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart, delFromCart } from "../../redux/actions/actions.js";
import CardCart from "../CardCart/CardCart.jsx";
import style from "./SoppingCart.module.css";
import PagoPaypal from "../PagoPaypal/PagoPaypal.jsx";

const ShoppingCart = () => {
  const cart = useSelector((state) => state.cart);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  console.log(state);
  console.log(cart);

  // const [total, setTotal] = useState(0);
  let total = 0;
  cart.map((item) => (total = total + item.price * item.cantidad));

  const priceFormatted = parseFloat(total).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <div>
      <h1>Carrito de Compras</h1>
      <button onClick={() => dispatch(clearCart())}>Limpiar Carrito</button>
      <article className={style.ContainerCards}>
        {cart.map((item, index) => (
          <CardCart
            key={index}
            data={item}
            delOneFromCart={() => dispatch(delFromCart(item.id))}
            delAllFromCart={() => dispatch(delFromCart(item.id, true))}
          />
        ))}
      </article>
      <h1>Total a pagar = {priceFormatted}</h1>
      {/*<button>Comprar</button>*/}
      <PagoPaypal/>
    </div>
  );
};

export default ShoppingCart;
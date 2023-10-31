import React from "react";
import Card from "../Card/Card.jsx";

import {
  useSelector,
  //  useDispatch
} from "react-redux";
// import { clearCart, delFromCart } from "../../redux/actions/actions.js";
// import CardCart from "../CardCart/CardCart.jsx";
// import style from "./SoppingCart.module.css";

const ShoppingCart = () => {
  const cart = useSelector((state) => state.cart);
  // const dispatch = useDispatch();

  // // const [total, setTotal] = useState(0);
  // let total = 0;
  // cart.map((item) => (total = total + item.price * item.cantidad));

  // const priceFormatted = parseFloat(total).toLocaleString("en-US", {
  //   style: "currency",
  //   currency: "USD",
  // });

  return (
    <div>
      {cart.map((e) => (
        <Card
          key={e.id}
          id={e.id}
          name={e.name}
          image={e.image}
          description={e.description}
          size={e.size}
          price={e.price}
          material={e.material}
          category={e.category}
          // onDelete={handleProductDelete}
          // addToCart={() => dispatch(addToCart(e.id))}
        />
      ))}
    </div>
  );
};

export default ShoppingCart;

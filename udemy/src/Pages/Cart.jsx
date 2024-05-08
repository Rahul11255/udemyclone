import React from "react";
import "../Components/cart/cart.css";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Link } from "react-router-dom";
import ShoppingCart from "../Components/cart/ShoppingCart";

const Cart = () => {
  return (
    <>
      <section className="track_link">
        <p>
          <Link className="link" to={"/"}>
            Home
          </Link>
          <KeyboardArrowRightIcon /> YOUR SHOPPING CART
        </p>
      </section>
      <ShoppingCart />
    </>
  );
};

export default Cart;

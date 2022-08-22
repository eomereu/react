import React, { useContext } from "react";

import "./HeaderCartButton.css";

import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);

  const cartItemsCount = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  return (
    <button onClick={props.onClick} className="hcb__button">
      <span className="hcb__icon">
        <CartIcon />
      </span>
      <span>Cart</span>
      <span className="hcb__badge">{cartItemsCount}</span>
    </button>
  );
};

export default HeaderCartButton;

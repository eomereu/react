import React, { useContext, useEffect, useState } from "react";

import "./HeaderCartButton.css";

import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {
  const [btnHighlighted, setBtnHiglighted] = useState(false);
  const cartCtx = useContext(CartContext);
  const { items } = cartCtx;

  const cartItemsCount = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const btnClasses = "hcb__button" + `${btnHighlighted ? " hcb__bump": ""}`

  useEffect(() => {
    if (items.length === 0) {
      return
    }
    setBtnHiglighted(true);

    const timer = setTimeout(() => {
      setBtnHiglighted(false);
    }, 300)

    return () => {
      clearTimeout(timer);
    }
  }, [items])

  return (
    <button onClick={props.onClick} className={btnClasses}>
      <span className="hcb__icon">
        <CartIcon />
      </span>
      <span>Cart</span>
      <span className="hcb__badge">{cartItemsCount}</span>
    </button>
  );
};

export default HeaderCartButton;

import React, { useContext } from "react";

import "./Cart.css";

import Modal from "../UI/Modal";
import ButtonB from "../UI/Buttons/ButtonB";
import ButtonBInv from "../UI/Buttons/ButtonBInv";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const totalAmount = `€${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemAddHandler = (item) => {};
  const cartItemRemoveHandler = (id) => {};

  const cartItems = (
    <ul className="cart-items">
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onAdd={cartItemAddHandler.bind(null, item)}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  return (
    <Modal onCloseCart={props.onCloseCart}>
      {cartItems}
      <div className="cart-total">
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className="cart-actions">
        <ButtonBInv onClick={props.onCloseCart}>Close</ButtonBInv>
        {hasItems && <ButtonB>Order</ButtonB>}
      </div>
    </Modal>
  );
};

export default Cart;

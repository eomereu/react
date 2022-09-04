import React, { useContext, useState } from "react";

import "./Cart.css";

import Modal from "../UI/Modal";
import ButtonB from "../UI/Buttons/ButtonB";
import ButtonBInv from "../UI/Buttons/ButtonBInv";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [checkout, setCheckout] = useState(false);

  const totalAmount = `€${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const onCheckoutHandler = () => {
    setCheckout((prevState) => !prevState);
  };

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

  const modalActions = (
    <div className="cart-actions">
      <ButtonBInv onClick={props.onCloseCart}>Close</ButtonBInv>
      {hasItems && <ButtonB onClick={onCheckoutHandler}>Order</ButtonB>}
    </div>
  );

  return (
    <Modal onCloseCart={props.onCloseCart}>
      <p className="cart-header">Cart</p>
      {cartItems}
      <div className="cart-total">
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {checkout && <Checkout onCheckout={onCheckoutHandler} />}
      {!checkout && modalActions}
    </Modal>
  );
};

export default Cart;

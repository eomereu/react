import React from "react";

import "./Cart.css";

import Modal from "../UI/Modal";
import ButtonB from "../UI/Buttons/ButtonB";
import ButtonBInv from "../UI/Buttons/ButtonBInv";

const Cart = (props) => {
  const cartItems = (
    <ul className="cart-items">
      {[{ id: "c1", name: "sushi", amount: 2, price: 12.99 }].map((item) => (
        <li>{item.name}</li>
      ))}
    </ul>
  );

  return (
    <Modal onCloseCart={props.onCloseCart}>
      {cartItems}
      <div className="cart-total">
        <span>Total Amount</span>
        <span>35.62</span>
      </div>
      <div className="cart-actions">
        <ButtonBInv onClick={props.onCloseCart}>Close</ButtonBInv>
        <ButtonB>Order</ButtonB>
      </div>
    </Modal>
  );
};

export default Cart;

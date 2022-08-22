import React from "react";

import "./Cart.css";

import Modal from "../UI/Modal";

const Cart = () => {
  const cartItems = (
    <ul className="cart-items">
      {[{ id: "c1", name: "sushi", amount: 2, price: 12.99 }].map((item) => (
        <li>{item.name}</li>
      ))}
    </ul>
  );

  return (
    <Modal>
      {cartItems}
      <div className="cart-total">
        <span>Total Amount</span>
        <span>35.62</span>
      </div>
      <div className="cart-actions">
        <button className="cart-button__alt">Close</button>
        <button className="cart-button">Order</button>
      </div>
    </Modal>
  );
};

export default Cart;

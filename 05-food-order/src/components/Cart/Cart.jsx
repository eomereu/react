import React, { useContext, useState } from "react";

import "./Cart.css";

import Modal from "../UI/Modal";
import ButtonB from "../UI/Buttons/ButtonB";
import ButtonBInv from "../UI/Buttons/ButtonBInv";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import useHttp from "../../hooks/use-http";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [checkout, setCheckout] = useState(false);
  const [ordered, setOrdered] = useState(false);

  const totalAmount = `€${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const {
    loading: submitLoading,
    error: submitError,
    sendRequest: submitOrder,
  } = useHttp();

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const onCheckoutHandler = () => {
    setCheckout((prevState) => !prevState);
  };

  const submitOrderHandler = (userData) => {
    submitOrder(
      {
        url: "https://learn-react-7c3cf-default-rtdb.europe-west1.firebasedatabase.app/orders.json",
        method: "POST",
        body: {
          user: userData,
          orderedItems: cartCtx.items,
        },
        headers: {
          "Content-Type": "application/json",
        },
      },
      () => {}
    );
    setOrdered(true);
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

  const orderedContent = (
    <>
      <p className="cart-feedback_success">Thank you very much! We have recieved your order...</p>
      <div className="cart-actions">
        <ButtonB onClick={props.onCloseCart}>Close</ButtonB>
      </div>
    </>
  );

  const defaultContent = (
    <>
      <p className="cart-header">Cart</p>
      {cartItems}
      <div className="cart-total">
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {checkout && (
        <Checkout
          onCheckout={onCheckoutHandler}
          onSubmitOrder={submitOrderHandler}
        />
      )}
      {!checkout && modalActions}
    </>
  );

  return (
    <Modal onCloseCart={props.onCloseCart}>
      {!submitLoading && !ordered && defaultContent}
      {submitLoading && !ordered && <p>Placing Order...</p>}
      {!submitLoading && ordered && orderedContent}
    </Modal>
  );
};

export default Cart;

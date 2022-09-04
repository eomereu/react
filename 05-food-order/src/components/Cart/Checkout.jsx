import React, { useId } from "react";
import ButtonB from "../UI/Buttons/ButtonB";
import ButtonBInv from "../UI/Buttons/ButtonBInv";

import "./Checkout.css";

const Checkout = (props) => {
  const confirmHandler = (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={confirmHandler}>
      <div className="checkout-control">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" />
      </div>
      <div className="checkout-control">
        <label htmlFor="street">Street</label>
        <input type="text" id="street" />
      </div>
      <div className="checkout-control">
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" />
      </div>
      <div className="checkout-control">
        <label htmlFor="city">City</label>
        <input type="text" id="city" />
      </div>
      <div className="checkout-actions">
        <ButtonBInv onClick={props.onCheckout}>Cancel</ButtonBInv>
        <ButtonB>Confirm</ButtonB>
      </div>
    </form>
  );
};

export default Checkout;

import React, { useContext } from "react";
import useInput from "../../hooks/use-input";
import ButtonB from "../UI/Buttons/ButtonB";
import ButtonBInv from "../UI/Buttons/ButtonBInv";

import CartContext from "../../store/cart-context";
import "./Checkout.css";

const isOK = (value) => /\w+/.test(value);

const Checkout = (props) => {
  const cartCtx = useContext(CartContext);

  const {
    value: nameValue,
    valueIsValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    valueBlurHandler: nameBlurHandler,
    reset: nameReset,
  } = useInput(isOK);
  const {
    value: streetValue,
    valueIsValid: streetIsValid,
    hasError: streetHasError,
    valueChangeHandler: streetChangeHandler,
    valueBlurHandler: streetBlurHandler,
    reset: streetReset,
  } = useInput(isOK);
  const {
    value: postalCodeValue,
    valueIsValid: postalCodeIsValid,
    hasError: postalCodeHasError,
    valueChangeHandler: postalCodeChangeHandler,
    valueBlurHandler: postalCodeBlurHandler,
    reset: postalCodeReset,
  } = useInput(isOK);
  const {
    value: cityValue,
    valueIsValid: cityIsValid,
    hasError: cityHasError,
    valueChangeHandler: cityChangeHandler,
    valueBlurHandler: cityBlurHandler,
    reset: cityReset,
  } = useInput(isOK);

  const formIsValid =
    nameIsValid && streetIsValid && postalCodeIsValid && cityIsValid;

  const confirmHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      console.log("Form is not valid!");
      return;
    }

    props.onSubmitOrder({
      name: nameValue,
      street: streetValue,
      postalCode: postalCodeValue,
      city: cityValue,
    });

    cartCtx.clearItems();

    nameReset();
    streetReset();
    postalCodeReset();
    cityReset();
  };

  const nameClasses = nameHasError
    ? "checkout-control checkout-invalid"
    : "checkout-control";
  const streetClasses = streetHasError
    ? "checkout-control checkout-invalid"
    : "checkout-control";
  const postalCodeClasses = postalCodeHasError
    ? "checkout-control checkout-invalid"
    : "checkout-control";
  const cityClasses = cityHasError
    ? "checkout-control checkout-invalid"
    : "checkout-control";

  return (
    <>
      <p className="checkout-header">Checkout</p>
      <form className="checkout-form" onSubmit={confirmHandler}>
        <div className={nameClasses}>
          <label htmlFor="name">Name*</label>
          <input
            type="text"
            id="name"
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
            value={nameValue}
          />
          {nameHasError && (
            <p className="checkout-error_text">
              Name must not be empty or a non-alpha char
            </p>
          )}
        </div>
        <div className={streetClasses}>
          <label htmlFor="street">Street*</label>
          <input
            type="text"
            id="street"
            onChange={streetChangeHandler}
            onBlur={streetBlurHandler}
            value={streetValue}
          />
          {streetHasError && (
            <p className="checkout-error_text">
              Street must not be empty or a non-alpha char
            </p>
          )}
        </div>
        <div className={postalCodeClasses}>
          <label htmlFor="postal">Postal Code*</label>
          <input
            type="text"
            id="postal"
            onChange={postalCodeChangeHandler}
            onBlur={postalCodeBlurHandler}
            value={postalCodeValue}
          />
          {postalCodeHasError && (
            <p className="checkout-error_text">
              Postal Code must not be empty or a non-alpha char
            </p>
          )}
        </div>
        <div className={cityClasses}>
          <label htmlFor="city">City*</label>
          <input
            type="text"
            id="city"
            onChange={cityChangeHandler}
            onBlur={cityBlurHandler}
            value={cityValue}
          />
          {cityHasError && (
            <p className="checkout-error_text">
              City must not be empty or a non-alpha char
            </p>
          )}
        </div>
        <div className="checkout-actions">
          <ButtonBInv onClick={props.onCheckout}>Cancel</ButtonBInv>
          <ButtonB>Confirm</ButtonB>
        </div>
      </form>
    </>
  );
};

export default Checkout;

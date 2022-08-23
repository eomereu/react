import React, { useRef, useState } from "react";

import "./MealItemForm.css";
import Input from "../../UI/Input";
import Button from "../../UI/Buttons/Button";

const MealItemForm = (props) => {
  const amountInputRef = useRef();

  const [amountIsValid, setAmountIsValid] = useState(true);

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredAmountString = amountInputRef.current.value;
    const enteredAmount = +enteredAmountString;

    if (
      enteredAmountString.trim().length === 0 ||
      enteredAmount < 1 ||
      enteredAmount > 5
    ) {
      setAmountIsValid(false);      
      return;
    }

    props.onAddToCart(enteredAmount)
  };

  return (
    <form action="" className="meal_item-form" onSubmit={submitHandler}>
      <Input
        label="Amount"
        ref={amountInputRef}
        feat={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <Button>Add to Cart</Button>
      {!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
    </form>
  );
};

export default MealItemForm;

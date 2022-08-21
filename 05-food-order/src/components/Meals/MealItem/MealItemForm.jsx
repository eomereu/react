import React from "react";

import "./MealItemForm.css";
import Input from "../../UI/Input";
import Button from "../../UI/Button"

const MealItemForm = () => {
  return (
    <form action="" className="meal_item-form">
      <Input
        label="Amount"
        feat={{
          id: "amount",
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <Button>Add to Cart</Button>
    </form>
  );
};

export default MealItemForm;

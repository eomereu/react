import React from "react";

import "./MealItem.css";
import MealItemForm from "./MealItemForm";

const MealItem = (props) => {
  const price = `€${props.price.toFixed(2)}`;

  return (
    <li className="meal_item-meal">
      <div>
        <div className="meal_item-title_al_tags">
          <h3>{props.title}</h3>
          <span className="meal_item-al_tags">{props.al_tags}</span>
        </div>
        <div className="meal_item-desription">{props.description}</div>
        <div className="meal_item-price">{price}</div>
      </div>
      <div>
        <MealItemForm />
      </div>
    </li>
  );
};

export default MealItem;

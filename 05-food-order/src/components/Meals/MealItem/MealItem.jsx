import React, { useContext } from "react";

import "./MealItem.css";
import MealItemForm from "./MealItemForm";
import CartContext from "../../../store/cart-context";

const MealItem = (props) => {
  const cartCtx = useContext(CartContext);

  const price = `€${Number(props.price).toFixed(2)}`;

  const addToCartHandler = (amount) => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };

  return (
    <li className="meal_item-meal">
      <div>
        <div className="meal_item-title_al_tags">
          <h3>{props.name}</h3>
          <span className="meal_item-al_tags">{props.al_tags}</span>
        </div>
        <div className="meal_item-desription">{props.description}</div>
        <div className="meal_item-price">{price}</div>
      </div>
      <div>
        <MealItemForm id={props.id} onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;

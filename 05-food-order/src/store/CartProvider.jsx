import React, { useReducer } from "react";

import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id)
    const existingCartItem = state.items[existingCartItemIndex]

    let updatedItems;
    let updatedTotalAmount = state.totalAmount;
    
    if (existingCartItem) {
      if (existingCartItem.amount < 5) {
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + action.item.amount
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
        updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
      }
      else {
        updatedItems = state.items;
      }
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  } else if (action.type === "REMOVE_ITEM") {
    const existingCartItemIndex = state.items.findIndex(item => item.id === action.id)
    const existingCartItem = state.items[existingCartItemIndex]

    let updatedItems;
    let updatedTotalAmount = state.totalAmount;

    if (existingCartItem.amount === 1) {
      updatedItems = [...state.items]
      updatedItems.pop(existingCartItemIndex)
    } else {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1
      }
      updatedItems = [...state.items]
      updatedItems[existingCartItemIndex] = updatedItem
      updatedTotalAmount = state.totalAmount - existingCartItem.price;
    }

    
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchMealsState] = useReducer(
    cartReducer,
    defaultCartState
  );

  const saveMealHandler = (item) => {
    dispatchMealsState({ type: "ADD", item: item });
  };
  const listMealsHandler = (id) => {
    dispatchMealsState({ type: "LIST", id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    saveMeals: saveMealHandler,
    listMeals: listMealsHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;

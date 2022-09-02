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
  const [cartState, dispatchCartState] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartState({ type: "ADD_ITEM", item: item });
  };
  const removeItemFromCartHandler = (id) => {
    dispatchCartState({ type: "REMOVE_ITEM", id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;

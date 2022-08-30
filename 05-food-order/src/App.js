import { useReducer, useState } from "react";

import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from "./store/CartProvider";
import MealEnterForm from "./components/Meals/MealEnterForm";

function App() {
  const [cartActive, dispatchCartActive] = useReducer((state) => {
    return !state;
  }, false);

  const [adminMode, dispatchAdminMode] = useReducer((state) => {
    return !state;
  }, false);

  return (
    <CartProvider>
      {cartActive && <Cart onCloseCart={dispatchCartActive} />}
      <Header onOpenCart={dispatchCartActive} onAdminMode={dispatchAdminMode} />
      <div className="app-content">
        {adminMode && (
          <div className="app-admin_content">
            <MealEnterForm onAdminMode={dispatchAdminMode} />
          </div>
        )}
        <Meals />
      </div>
    </CartProvider>
  );
}

export default App;

import { useState, useReducer } from "react";

import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";

function App() {

  const [cartActive, dispatchCartActive] = useReducer((state) => {
    return !state;
  }, false);

  return (
    <>
      {cartActive && <Cart onCloseCart={dispatchCartActive} />}
      <Header onOpenCart={dispatchCartActive} />
      <main>
        <Meals />
      </main>
    </>
  );
}

export default App;

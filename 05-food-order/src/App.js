import { useReducer } from "react";

import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from "./store/CartProvider";

function App() {

  const [cartActive, dispatchCartActive] = useReducer((state) => {
    return !state;
  }, false);

  return (
    <CartProvider>
      {cartActive && <Cart onCloseCart={dispatchCartActive} />}
      <Header onOpenCart={dispatchCartActive} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;

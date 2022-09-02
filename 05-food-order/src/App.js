import { useReducer, useState } from "react";

import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from "./store/CartProvider";
import MealEnterForm from "./components/Meals/MealEnterForm";

function App() {
  const [meals, setMeals] = useState([]);

  const [cartActive, dispatchCartActive] = useReducer((state) => {
    return !state;
  }, false);

  const [adminMode, dispatchAdminMode] = useReducer((state) => {
    return !state;
  }, false);

  const onSaveMealHandler = (newMeal) => {
    setMeals([...meals].concat(newMeal));
  };

  const onListMealsHandler = (updatedMeals) => {
    setMeals(updatedMeals);
  }

  return (
    <CartProvider>
      {cartActive && <Cart onCloseCart={dispatchCartActive} />}
      <Header onOpenCart={dispatchCartActive} onAdminMode={dispatchAdminMode} />
      <div className="app-content">
        {adminMode && (
          <div className="app-admin_content">
            <MealEnterForm
              onAdminMode={dispatchAdminMode}
              onSaveMeal={onSaveMealHandler}
              meals={meals}
            />
          </div>
        )}
        <Meals meals={meals} onListMeals={onListMealsHandler} />
      </div>
    </CartProvider>
  );
}

export default App;

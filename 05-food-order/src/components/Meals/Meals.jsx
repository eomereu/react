import React from "react";
import AvailableMeals from "./AvailableMeals";
import MealsSummary from "./MealsSummary";

const Meals = (props) => {
  return (
    <>
      <MealsSummary />
      <AvailableMeals meals={props.meals} onListMeals={props.onListMeals} />
    </>
  );
};

export default Meals;

import React from "react";
import { DUMMY_MEALS } from "../../constants";
import Card from "../UI/Card";

import "./AvailableMeals.css";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const mealsList = DUMMY_MEALS.map((meal) => (
    <MealItem
      key={meal.id}
      title={meal.name}
      description={meal.description}
      al_tags={meal.al_tags}
      price={meal.price}
    />
  ));

  return (
    <section className="available_meals">
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;

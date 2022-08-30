import React, { useEffect, useState } from "react";
import { DUMMY_MEALS } from "../../constants";
import useHttp from "../../hooks/use-http";
import Card from "../UI/Card";

import "./AvailableMeals.css";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = (props) => {
  const [meals, setMeals] = useState([]);
  const { loading, error, sendRequest: fetchMeals } = useHttp();
  const dbUrl = "https://learn-react-7c3cf-default-rtdb.europe-west1.firebasedatabase.app/meals.json";

  useEffect(() => {
    const processMeals = (data) => {
      let updatedMeals = [];

      for (const key in data) {
        updatedMeals.push({
          key: key,
          id: data[key].id,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
          tags: data[key].tags,
        });
      }

      setMeals(updatedMeals);
    };

    fetchMeals({ url: dbUrl }, processMeals);
  }, [fetchMeals]);

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.key}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
      tags={meal.tags}
    />
  ));

  return (
    <section className="available_meals">
      <Card>
        {loading && !error ? <p>Loading...</p> : <ul>{mealsList}</ul>}
        {error && <p>{error}</p>}
      </Card>
    </section>
  );
};

export default AvailableMeals;

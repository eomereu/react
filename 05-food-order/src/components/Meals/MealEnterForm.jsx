import React, { useState, useEffect } from "react";
import useInput from "../../hooks/use-input";
import Button from "../UI/Buttons/Button";
import Card from "../UI/Card";
import useHttp from "../../hooks/use-http";

import "./MealEnterForm.css";

const isId = (value) => /\w+/.test(value);
const isName = (value) => /\w+/.test(value);
const isPrice = (value) => +value > 0;
const isTags = (value) => /(^$)|(^[A-Z]$)|(^([A-Z],)+[A-Z]$)/.test(value);

const MealEnterForm = (props) => {
  const [idIsNotUnique, setIdIsNotUnique] = useState(null);
  const {
    value: idValue,
    valueIsValid: idIsValid,
    hasError: idHasError,
    valueChangeHandler: idChangeHandler,
    valueBlurHandler: idBlurHandler,
    reset: idReset,
  } = useInput(isId);
  const {
    value: nameValue,
    valueIsValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    valueBlurHandler: nameBlurHandler,
    reset: nameReset,
  } = useInput(isName);
  const {
    value: descValue,
    valueIsValid: descIsValid,
    hasError: descHasError,
    valueChangeHandler: descChangeHandler,
    valueBlurHandler: descBlurHandler,
    reset: descReset,
  } = useInput(null);
  const {
    value: priceValue,
    valueIsValid: priceIsValid,
    hasError: priceHasError,
    valueChangeHandler: priceChangeHandler,
    valueBlurHandler: priceBlurHandler,
    reset: priceReset,
  } = useInput(isPrice);
  const {
    value: tagsValue,
    valueIsValid: tagsIsValid,
    hasError: tagsHasError,
    valueChangeHandler: tagsChangeHandler,
    valueBlurHandler: tagsBlurHandler,
    reset: tagsReset,
  } = useInput(isTags);

  const formIsValid = idIsValid && nameIsValid && priceIsValid && tagsIsValid;

  useEffect(() => {
    setIdIsNotUnique(null);
    const identifier = setTimeout(() => {
      let alreadyExists;
      props.meals.map((meal) => {
        if (idValue === meal.id) {
          alreadyExists = true;
          return;
        } else {
          alreadyExists = null;
        }
      });
      setIdIsNotUnique(alreadyExists);
    }, 325);
    return () => {
      clearTimeout(identifier);
    };
  }, [idValue, props.meals]);

  const { loading, error, sendRequest: saveMealRequest } = useHttp();

  const saveMealHandler = (mealInfo) => {
    saveMealRequest(
      {
        url: "https://learn-react-7c3cf-default-rtdb.europe-west1.firebasedatabase.app/meals.json",
        method: "POST",
        body: {
          id: mealInfo.idValue,
          name: mealInfo.nameValue,
          description: mealInfo.descValue,
          price: mealInfo.priceValue,
          tags: mealInfo.tagsValue,
        },
        headers: {
          "Content-Type": "application/json",
        },
      },
      () => {}
    );
  };

  const mealInfo = {
    idValue: idValue,
    nameValue: nameValue,
    descValue: descValue,
    priceValue: priceValue,
    tagsValue: tagsValue,
  };

  const meal = {
    key: mealInfo.id,
    id: mealInfo.idValue,
    name: mealInfo.nameValue,
    description: mealInfo.descriptionValue,
    price: mealInfo.priceValue,
    tags: mealInfo.tagsValue,
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      console.log("Form is Invalid! Not submitting...");
      return;
    }

    saveMealHandler(mealInfo);
    props.onSaveMeal(meal);

    idReset();
    nameReset();
    descReset();
    priceReset();
    tagsReset();
  };

  const idClasses =
    idHasError || idIsNotUnique
      ? "meal_enter_form-section invalid"
      : "meal_enter_form-section";
  const nameClasses = nameHasError
    ? "meal_enter_form-section invalid"
    : "meal_enter_form-section";
  const descClasses = descHasError
    ? "meal_enter_form-section invalid"
    : "meal_enter_form-section";
  const tagsClasses = tagsHasError
    ? "meal_enter_form-section invalid"
    : "meal_enter_form-section";
  const priceClasses = priceHasError
    ? "meal_enter_form-section invalid"
    : "meal_enter_form-section";

  return (
    <form onSubmit={formSubmitHandler}>
      <Card>
        <div className="meal_enter_form-controls">
          <div className={idClasses}>
            <label htmlFor="id" id="meal_enter_form-top_label">
              ID*
            </label>
            <input
              type="text"
              id="id"
              value={idValue}
              onChange={idChangeHandler}
              onBlur={idBlurHandler}
            />
          </div>
          {idHasError && (
            <p className="meal_enter_form-error_text">
              ID must not be empty or a non-alpha char
            </p>
          )}
          {idIsNotUnique && (
            <p className="meal_enter_form-error_text">
              This ID already exists!
            </p>
          )}
          <div className={nameClasses}>
            <label htmlFor="name">Name*</label>
            <input
              type="text"
              id="name"
              value={nameValue}
              onChange={nameChangeHandler}
              onBlur={nameBlurHandler}
            />
          </div>
          {nameHasError && (
            <p className="meal_enter_form-error_text">
              Name must not be empty or a non-alpha char
            </p>
          )}
          <div className={descClasses}>
            <label htmlFor="desc">Description</label>
            <textarea
              type="text"
              id="desc"
              value={descValue}
              onChange={descChangeHandler}
              onBlur={descBlurHandler}
            />
          </div>
          <div className={priceClasses}>
            <label htmlFor="price">Price*</label>
            <input
              type="number"
              id="price"
              min="0"
              step="0.01"
              value={priceValue}
              onChange={priceChangeHandler}
              onBlur={priceBlurHandler}
            />
          </div>
          {priceHasError && (
            <p className="meal_enter_form-error_text">
              Price cannot be negative or equal to zero
            </p>
          )}
          <div className={tagsClasses}>
            <label htmlFor="tags">Allergene Tags</label>
            <input
              type="text"
              id="tags"
              value={tagsValue}
              onChange={tagsChangeHandler}
              onBlur={tagsBlurHandler}
            />
          </div>
          {tagsHasError && (
            <p className="meal_enter_form-error_text">
              Tags must be in format: A,G,T,S
            </p>
          )}
        </div>
        <div className="meal_enter_form-actions">
          <Button onClick={props.onAdminMode}>Cancel</Button>
          <Button>Add Meal</Button>
        </div>
      </Card>
    </form>
  );
};

export default MealEnterForm;

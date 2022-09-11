import classes from "./Counter.module.css";

import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

const Counter = () => {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter);

  const [amount, setAmount] = useState(0);

  const incrementHandler = () => {
    dispatch({ type: "INCREMENT" });
  };

  const decrementHandler = () => {
    dispatch({ type: "DECREMENT" });
  };

  const toggleCounterHandler = () => {};

  const amountChangeHandler = (event) => {
    setAmount(event.target.value);
  };

  const amountHandler = (event) => {
    dispatch({ type: "CHANGE", amount: amount });
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      <div className={classes.value}>{counter}</div>
      <div>
        <div className={classes.amount}>
          <label htmlFor="amount"></label>
          <input
            id="amount"
            type="number"
            onChange={amountChangeHandler}
            value={amount}
          />
          <button onClick={amountHandler}>Change</button>
        </div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={decrementHandler}>Decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;

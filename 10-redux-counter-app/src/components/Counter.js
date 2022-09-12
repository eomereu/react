import classes from "./Counter.module.css";

import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import { counterActions } from "../store/index";

const Counter = () => {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter);
  const show = useSelector((state) => state.showCounter);

  const [amount, setAmount] = useState(0);

  const incrementHandler = () => {
    dispatch(counterActions.increment());
  };

  const decrementHandler = () => {
    dispatch(counterActions.decrement());
  };

  const toggleCounterHandler = () => {
    dispatch(counterActions.toggle());
  };

  const amountChangeHandler = (event) => {
    setAmount(event.target.value);
  };

  const amountHandler = () => {
    dispatch(counterActions.change({ amount: amount }));
    setAmount(0);
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      <div className={classes.value}>{show && <div>{counter}</div>}</div>
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

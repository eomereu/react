import { useState } from "react";

const useInputt = (validate) => {
  const [value, setValue] = useState("");
  const [valueTouched, setValueTouched] = useState(false);

  const valueIsValid = validate(value);
  const hasError = !valueIsValid && valueTouched;

  const valueChangeHandler = (event) => {
    setValue(event.target.value);
  };

  const valueBlurHandler = () => {
    setValueTouched(true);
  };

  const reset = () => {
    setValue("");
    setValueTouched(false);
  }

  return {
    value,
    valueIsValid,
    hasError,
    valueChangeHandler,
    valueBlurHandler,
    reset,
  };
};

export default useInputt;

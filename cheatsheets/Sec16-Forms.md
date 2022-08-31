# Forms
A well-arranged custom Input Hook:  
use-input.js
```javascript
import { useState } from "react";

const useInput = (validate) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validate(enteredValue);
  const hasError = !valueIsValid && isTouched;

  const valueChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const valueBlurHandler = () => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue("");
    setIsTouched(false);
  };

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError,
    reset,
    valueChangeHandler,
    valueBlurHandler,
  };
};

export default useInput;
```
The component where we use our hook:  
BasicForm.js
```javascript
import useInput from "../hooks/use-input";

const isName = (value) => /\w+/.test(value.trim());
const isLastName = (value) => /\w+/.test(value.trim());
const isEmail = (value) => /^\w+@\w+(\.\w+)+$/.test(value.trim());
const isPassword = (value) => value.trim().length >= 6;

const BasicForm = (props) => {
  const {
    value: name,
    valueIsValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    valueBlurHandler: nameBlurHandler,
    reset: nameReset,
  } = useInput(isName);

  const {
    value: lastName,
    valueIsValid: lastNameIsValid,
    hasError: lastNameHasError,
    valueChangeHandler: lastNameChangeHandler,
    valueBlurHandler: lastNameBlurHandler,
    reset: lastNameReset,
  } = useInput(isLastName);

  const {
    value: email,
    valueIsValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    valueBlurHandler: emailBlurHandler,
    reset: emailReset,
  } = useInput(isEmail);

  const {
    value: password,
    valueIsValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    valueBlurHandler: passwordBlurHandler,
    reset: passwordReset,
  } = useInput(isPassword);

  const nameClasses = nameHasError ? "form-control invalid" : "form-control";
  const lastNameClasses = lastNameHasError
    ? "form-control invalid"
    : "form-control";
  const emailClasses = emailHasError ? "form-control invalid" : "form-control";
  const passwordClasses = passwordHasError
    ? "form-control invalid"
    : "form-control";

  const formIsValid =
    nameIsValid && lastNameIsValid && emailIsValid && passwordIsValid;

  const formSubmitHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    console.log(name);
    console.log(lastName);
    console.log(email);

    nameReset();
    lastNameReset();
    emailReset();
    passwordReset();
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <div className="control-group">
        <div className={nameClasses}>
          <label htmlFor="name">First Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
          />
          {nameHasError && (
            <p className="error-text">
              Name must not be empty or equal to non alpha characters
            </p>
          )}
        </div>
        <div className={lastNameClasses}>
          <label htmlFor="last-ame">Last Name</label>
          <input
            type="text"
            id="last-name"
            value={lastName}
            onChange={lastNameChangeHandler}
            onBlur={lastNameBlurHandler}
          />
          {lastNameHasError && (
            <p className="error-text">
              Last name must not be empty or equal to non alpha characters
            </p>
          )}
        </div>
      </div>
      <div className={emailClasses}>
        <label htmlFor="email">E-Mail Address</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
        />
        {emailHasError && (
          <p className="error-text">
            Email must have correct form <em>ex: johndoe@domain.com</em>
          </p>
        )}
      </div>
      <div className={passwordClasses}>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
        />
        {passwordHasError && (
          <p className="error-text">Password must have a min length of 6</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;

```
index.css
```css
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap');

* {
  box-sizing: border-box;
}

html {
  font-family: 'Noto Sans JP', sans-serif;
}

body {
  margin: 0;
  background-color: #3f3f3f;
}

.app {
  width: 90%;
  max-width: 43rem;
  padding: 1rem;
  border-radius: 12px;
  background-color: white;
  margin: 3rem auto;
}

.form-control {
  margin-bottom: 1rem;
}

.form-control input,
.form-control label {
  display: block;
}

.form-control label {
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.form-control input,
.form-control select {
  font: inherit;
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  width: 20rem;
  max-width: 100%;
}

.form-control input:focus {
  outline: none;
  border-color: #240370;
  background-color: #e0d4fd;
}

.control-group {
  display: flex;
  column-gap: 1rem;
  flex-wrap: wrap;
}

.control-group .form-control {
  min-width: 15rem;
  flex: 1;
}

button {
  font: inherit;
  background-color: #240370;
  color: white;
  border: 1px solid #240370;
  padding: 0.5rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
}

button:hover,
button:active {
  background-color: #33059e;
  border-color: #33059e;
}

button:disabled,
button:disabled:hover,
button:disabled:active {
  background-color: #ccc;
  color: #292929;
  border-color: #ccc;
  cursor: not-allowed;
}

.form-actions {
  text-align: right;
}

.form-actions button {
  margin-left: 1rem;
}

.invalid input {
  border: 1px solid #b40e0e;
  background-color: #fddddd;
}

.invalid input:focus {
  border-color: #ff8800;
  background-color: #fbe8d2;
}

.error-text {
  color: #b40e0e;
  margin-top: 0;
  font-size: 0.75rem;
}
`` 
## Version with `useReducer`
use-input.js
```javascript
import { useReducer } from 'react';

const initialInputState = {
  value: '',
  isTouched: false,
};

const inputStateReducer = (state, action) => {
  if (action.type === 'INPUT') {
    return { value: action.value, isTouched: state.isTouched };
  }
  if (action.type === 'BLUR') {
    return { isTouched: true, value: state.value };
  }
  if (action.type === 'RESET') {
    return { isTouched: false, value: '' };
  }
  return inputStateReducer;
};

const useInput = (validateValue) => {
  const [inputState, dispatch] = useReducer(
    inputStateReducer,
    initialInputState
  );

  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const valueChangeHandler = (event) => {
    dispatch({ type: 'INPUT', value: event.target.value });
  };

  const inputBlurHandler = (event) => {
    dispatch({ type: 'BLUR' });
  };

  const reset = () => {
    dispatch({ type: 'RESET' });
  };

  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
```
## More
You can also check [**Formik**](https://formik.org/) which is a third party react library.  
Also you can check *https://academind.com/tutorials/reactjs-a-custom-useform-hook* on how to create a custom Form Hook!
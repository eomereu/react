import React, { useContext, useEffect, useReducer, useState } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../store/auth-context";
import Input from "../UI/Input/Input";

const emailReducer = (state, action) => {
  switch (action.type) {
    case "USER_INPUT":
      return {
        value: action.value,
        isValid: /\w+@\w+(\.\w)+/.test(action.value),
      };
    case "INPUT_BLUR":
      return {
        value: state.value,
        isValid: /\w+@\w+(\.\w)+/.test(state.value),
      };
    default:
      return { value: "", isValid: false };
  }
};

const passwordReducer = (state, action) => {
  switch (action.type) {
    case "USER_INPUT":
      return { value: action.value, isValid: action.value.trim().length > 6 };
    case "INPUT_BLUR":
      return { value: state.value, isValid: state.value.trim().length > 6 };
    default:
      return { value: "", isValid: false };
  }
};

const Login = () => {
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });
  const [formIsValid, setFormIsValid] = useState(false);

  const authCtx = useContext(AuthContext);

  // assigning aliases to the isValid property of email and password state
  const { isValid: emailIsValid } = emailState; 
  const { isValid: passwordIsValid } = passwordState; 

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 250);
    return () => {
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", value: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_INPUT", value: event.target.value });
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    authCtx.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          id="email"
          label="E-Mail"
          type="email"
          isValid={emailIsValid}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          isValid={passwordIsValid}
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;

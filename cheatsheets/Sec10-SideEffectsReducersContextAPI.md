# Handling Side Effects, Using Reducers and Using Context API
## Side Effect (Effects) & `useEffect()` Hook
Basically all the things other than UI Rendering & Reacting to User Input may be considered as **Side Effects**. They are not related to React. For example the following things are some of these *effects*:
- Storing data in browser storage
- Sending HTTP requests
- Setting & managing timers
These are of course part of our implementation, but they shouldn't go into our **component function**. Because at every change of a *state*, React re-evaluates our component function, and goes through all the content. So we don't want to handle these *side effects* here since it may cause unnecessary function executions, extra resource usages, bugs or even infinite loops. To handle these *effects*, React has a `useEffect()` hook for us.  

useEffect hook is called with two parameters
```javascript
useEffect( () => {...}, [ dependencies ] )
```
1. A function that should be executed **after** every render cycle *(component re-evaluation)* **if** the specified dependencies *(the second argument)* is changed.  
***So our side effect code goes into this function!***
2. An array of dependencies  
***So our dependencies to check for executing our side effect code, go into this array.***
> *See https://ibb.co/9q64WZ1*

## Using the `useEffect()` Hook
A basic and effective scenario to use useEffect() could be the case, when we log in and refresh the page we want user to stay logged in. However keeping logged in info only in a state won't help us because everything will be re-evaluated and it will be lost on refresh. So we want to make use of `useEffect()` here.
```javascript
// source file: 04-login-panel/src/components/App.js
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedInInfo = localStorage.getItem("LOGGED_IN");

    if (loggedInInfo === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (email, password) => {
    setIsLoggedIn(true);
    localStorage.setItem("LOGGED_IN", "1");
  };
  
  const logoutHandler = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("LOGGED_IN");
  };
```
Explanations of some functions above:
- `localStorage.getItem(key)`: Takes a string and retrieves that variable from local variables (cookies)
- `localStorage.steItem(key, value)`: Takes two strings and sets *key* with *value* as a variable in local variables
- `localStorage.removeItem(key)`: Takes a string and removes that variable from local variables
> ***PS:** These local variables can be observed via **F12 -> Application -> Storage -> Local Storage -> http://localhost:3000***

By using useEffect() above, and with no dependencies given, we make sure that, it's executed just once, on startup and on refresh, since we went from no dependencies at all to no dependencies. By this way we prevent our state to get lost. Also on another actions, and hence re-evaluation of components, it's not executed since no dependencies changed, and we prevent an infinite loop.

## useEffect & Dependencies
When we use dependencies, simply we just type in there, the variables we used/want to inspect in/for our function to be executed. Using it with dependencies is simply like onChange(dependencies)... An example usage:
```javascript
  useEffect(() => {
    setFormIsValid(
      enteredEmail.includes("@") && enteredPassword.trim().length > 6
    );
  }, [enteredEmail, enteredPassword]);
```
Instead of checking if the form is valid or not in two functions *(email input keystroke inspector and password input keystroke inpector)* we were just simply able to check it in just one place and getting rid of extra code.
> *Beware that `setFormIsValid()` is a state and the reason we did not add it into dependencies is React ensures that useState() setters (the second variables) are fixed and not changed during render cycle.*

In a nutshell we have to add ***(kinda)* all** things we use within useEffect() function, **except for**:
- State updating functions
- "Built-in" APIs or functions
- Variables or functions that are defined *outside* of our components

## useEffect Cleanup Function
Indeed we don't want to check the validity right away on every key stroke. Because in real-world scenarios we will be sending HTTP requests to our backend server to validate those emails and passwords. So it'd be so ridiculous to send these requests at each key stroke. At this point **useEffect Cleanup Function** comes into play.
```javascript
  useEffect(() => {
    const identifier = setTimeout(
      setFormIsValid(
        enteredEmail.includes("@") && enteredPassword.trim().length > 6
      ),
      500
    );
    return () => {
      clearTimeout(identifier);
    };
  }, [enteredEmail, enteredPassword]);
```
- `setTimeout(() => {}, miliseconds)`: Waits for *miliseconds* to execute the given function *(arrow or defined)*
- `clearTimeout(varToSetTimeout)`: Resets the timer count on the variable *(to which a setTimeout() function is assigned)*

So here we manage to check the validity not every key stroke but after a 500 ms pause, which makes sense to send the HTTP request just when we think user might end up writing the email or password.  

Here the function within our return, is **not** executed on the first load/refresh of the page. But after that initial load/refresh, it's being executed **just before** the execution of our useEffect function.  

At startup/refresh:
1. Our overall useEffect() is trigerred
1. useEffect() function *(Above function)* is executed

On each keystroke:
1. Our overall useEffect() is trigerred
1. Return function *(Cleanup function)* is executed
1. useEffect() function *(Above function)* is executed

## `useReducer()` Hook
If you are to update a state which depends on another state then **useReducer** could be a perfect choice. For other use purposes and advantages, please refer to *https://dev.to/spukas/3-reasons-to-usereducer-over-usestate-43ad*  
Please also refer to the following screenshots for a better understanding:
- *https://ibb.co/TMWwdzM*
- *https://ibb.co/8zqw7wn*

Structure:
```javascript
const [state, dispatch] = React.useReducer(reducerFn, initialState, initFn);
```

It is a perfect choice for a **state toggle** indeed. *i.e. *Dark/Light Theme*
```javascript
const [value, toggleValue] = React.useReducer(previous => !previous, true)

<button onClick={toggleValue}>Toggle</button>
```

For a perfect counter:
```javascript
function reducer(state, action) {
  switch (action.type) {
    case 'ADD': return { count: state.count + 1 };
    case 'SUB': return { count: state.count - 1 };
    default: return state;
  }
}

function Counter() {
  const [state, dispatch] = React.useReducer(reducer, { count: 0 });
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'ADD'})}>Add</button>
      <button onClick={() => dispatch({type: 'SUB'})}>Substract</button>
    </>
  );
}
```

Example Usage:
```javascript
const emailReducer = (state, action) => {
  switch(action.type) {
    case 'USER_INPUT':
      return { value: action.value, isValid: /\w+@\w+(\.\w)+/.test(action.value) };
    case 'INPUT_BLUR':
      return { value: state.value, isValid: /\w+@\w+(\.\w)+/.test(state.value) };
    default:
      return { value:'', isValid: false };
  }
}
...
const Login = (props) => {
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: '',
    isValid: null,
  })
  ...
  const emailChangeHandler = (event) => {
    dispatchEmail({type: 'USER_INPUT', value: event.target.value})
  };
  ...
  const validateEmailHandler = () => {
    dispatchEmail({type: 'INPUT_BLUR'})
  };
  ...
  return (
    ...
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        ...
```

## React Context API
Component wide "behind-the-scenes" State Storage... It enables us to avoid long and tiring props chainings.
> *`.Consumer` part is skipped within this Cheatsheet*
They are stored generally in `/src/store/` directory.  
*i.e. Authentication Context*
```javascript
import React from 'react';

const AuthContext = React.createContext({
  isLoggedIn: false
});

export default AuthContext;
```
In order to be able to use it, we should wrap our content in it by calling `.Provider` on it.
```javascript
return (
  <AuthContext.Provider value={{
    isLoggedIn: isLoggedIn
  }}>
    ...
  </AuthContext.Provider>
);
```
> ***`value` property name should be as it is. It mustn't get modified.***

## Using Context API via `useContext()` Hook
Simply give in the context we are importing and assign the returning content to a variable:
```javascript
import AuthContext from '../../store/auth-context';

const Navigation = (props) => {
  const ctx = useContext(AuthContext);

  return (
    <nav className={classes.nav}>
      <ul>
        {ctx.isLoggedIn && (
          <li>
            <a href="/">Users</a>
          </li>
        )}
        ...
```
We can also pass down functions via Context:
```javascript
return (
  <AuthContext.Provider value={{
    isLoggedIn: isLoggedIn,
    onLogout: logoutHandler
  }}>
    ...
  </AuthContext.Provider>
);
```
For a better IDE completion, it is a good practice to add the functions we are passing via Context into the Context Object itself:
```javascript
...
const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {}
});
...
```

## Building & Using a Custom Context Provider Component
Getting in more advanced topics, it's a better practice to have **authentication** logic in a seperate **context component**:
```javascript
import React, { useState, useEffect } from 'react';

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogin: (email, password) => {},
  onLogout: () => {}
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedInInfo = localStorage.getItem("LOGGED_IN");

    if (loggedInInfo === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (email, password) => {
    setIsLoggedIn(true);
    localStorage.setItem("LOGGED_IN", "1");
  };
  
  const logoutHandler = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("LOGGED_IN");
  };

  return (
    <AuthContext.Provider value={{
      isLoggedIn: isLoggedIn,
      onLogin: loginHandler,
      onLogout: logoutHandler
    }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext;
```
By doing so, our *App.js* would be cleaner:
```javascript
...
function App() {
  const ctx = useContext(AuthContext)

  return (
    <>
      <MainHeader />
      <main>
        {!ctx.isLoggedIn && <Login />}
        {ctx.isLoggedIn && <Home />}
      </main>
    </>
  );
}
...
```
Finally our *index.js* would be shaped as following:
```javascript
...
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>
);
```

## `React.forwarRef()` and `useImperativeHandle` Hook
Normally as known, `ref` is only available on default HTML elements. However if we want to use it on a custom component then we need to use these two pieces-which are mentioned in the header.  
Please refer to the following course section to review it *https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/25599276#notes*  
Implementation is not referred here.
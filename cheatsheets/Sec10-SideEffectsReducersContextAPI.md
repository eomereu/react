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
1. A function that should be executed **after** every component evaluation **if** the specified dependencies *(the second argument)* is changed.  
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
Instead of checking if the form is valid or not in two functions *(username input keystroke inspector and password input keystroke inpector)* we were just simply able to check it in just one place and getting rid of extra code.
> *Beware that `setFormIsValid()` is a state and the reason we did not add it into dependencies is React ensures that useState() setters (the second variables) are fixed and not changed during component loop.*

In a nutshell we have to add **all** things we use within useEffect() function, **except for**:
- State updating functions
- "Built-in" APIs or functions
- Variables or functions that are defined *outside* of our components
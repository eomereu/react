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
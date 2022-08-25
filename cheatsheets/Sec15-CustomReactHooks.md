# Custom React Hooks
We need custom react hooks in scenarios that we want a reusable function which includes some React hooks in it. They **are obliged to** start with `use` keyword in order for React to be able to behave them as custom hooks. We can of course accept parameters to them and we can return our state back so that it can be used within the components that our custom hook is used.  
A counter hook:
```javascript
import React, { useState, useEffect } from 'react'

const useCounter = (type) => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (type === 'FORWARDS') {
        setCounter((prevCounter) => prevCounter + 1);
      } else if (type === 'BACKWARDS') {
        setCounter((prevCounter) => prevCounter - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [type]);

  return counter;
}

export default useCounter;
```
ForwardCounter component:
```javascript
import Card from "./Card";

import useCounter from "../hooks/use-counter";

const ForwardCounter = () => {
  const counter = useCounter('FORWARDS');

  return <Card>{counter}</Card>;
};

export default ForwardCounter;
```
BackwardCounter component:
```javascript
import useCounter from '../hooks/use-counter';

import Card from './Card';

const BackwardCounter = () => {
  const counter = useCounter('BACKWARDS');

  return <Card>{counter}</Card>;
};

export default BackwardCounter;
```
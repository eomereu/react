# React Optimization
## `React.memo()`
`React.memo()` is a react function which takes a component as an argument. Normally when a parent component is re-evaluated by React *(i.e. in case of a state change etc.)* then automatically all its children are re-evaluated. However this may be redundant for most of the time and we may want to prevent this. In these cases, first of all we need to wrap our component within `React.memo()` while exporting  
ex:
```javascript
...
export default React.memo(Button);
```
> *However this alone may not be enough, please see the next section **`useCallback` Hook***
> *Please refer to the following course sections in order to listen re-evaluation and `React.memo()` https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/25599584#overview & https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/25599594#overview*

## `useCallback` Hook
On the other hand, in the cases that we pass along a function or an object *(any data type other than primitive ones like boolean, string etc.)* to a child component, naturally when the parent is re-evaluated due to a state change, that parent component is re-evaluated and that function or object which is passed to the child is also re-created. This means that it's not seen as the same before by Javascript, which will cause the child component to be re-evaluated. In order to stop this re-creation of **functions**, we can use `useEffect` hook in the component *(parent component in this case)* and give our function to it.
> *Please note that `useCallback` is **only** usable with **functions**.*
```javascript
import React, { useState, useCallback } from 'react';
...

function App() {
  ...
  const toggleParagraphHandler = useCallback(() => {
    setShowParagraph((prevShowParagraph) => !prevShowParagraph);
  }, []);
 
  return (
    ...
      <Button onClick={toggleParagraphHandler}>Toggle Paragraph!</Button>
    ...
  );
}
...
```
> *Please beware that `useCallback` also requires a dependency array like `useEffect`*
> *Please refer to the following course section for a detailed explanation of `useEffect` https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/25599604#overview and refer to the following course section for details on dependencies of `useEffect` and **closures** https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/25599610#overview*

## State Scheduling & Batching
Please refer to the following course section for a detailed information about **state scheduling and batching** *https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/25599626#overview*

## `useMemo` Hook
Consider the same things under the **`useCallback` Hook** title above. However when we have the other data types *(of course excluding primitve ones i.e. bool, string etc.)* than functions, like **arrays** or **objects** we use `useMemo`. It gives a funciton as first argument in which we simply return the value that we want React to *memoize* it. The second argument is of course the dependency array again.  
DemoList component *(child)*
```javascript
...
const DemoList = (props) => {
  const { items } = props;

  const sortedList = useMemo(() => {
    console.log('Items sorted');
    return items.sort((a, b) => a - b);
  }, [items]); 
...
export default React.memo(DemoList);
```
App component *(parent)*
```javascript
...
  const listItems = useMemo(() => [5, 3, 1, 10, 9], []);

  return (
    <div className="app">
      <DemoList title={listTitle} items={listItems} />
      <Button onClick={changeTitleHandler}>Change List Title</Button>
    </div>
  );
}
...
```
> *The reason we included the parent component above, is due to the fact that, there is an additional array created there which is then passed to the child component. So in order to stop DemoList component to be re-evaluated redundantly, we must ensure to memoize both of the arrays.*
> *Please beware that using `useMemo` would not be very beneficial all the time. However in cases like sorting etc. it may be a good choice.*
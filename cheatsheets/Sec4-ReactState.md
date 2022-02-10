# Section 4 - React State & Working with Elements
## Listening to Events
React event handling (listeners) are available on elements based on default DOM behaviour. If an element supports an event then we can add a listener with React by adding `on` and then the event name right next to it.  
For example: `onClick`, `onSelect`, `onMouseOver`...  
Simply instead of
```javascript
document.getElementById('root').addEventListener()
```
We use special properties:
```javascript
<button onClick={}>BtnTxt</button>
```
Of course inside these special properties, some JS code should be executed -which is typically pre-defined with some functions or less commonly in place anonymous functions- so it is surrounded by curly braces.
> *Please keep in mind that when we are to execute a function -which typically we created earlier- we should just point to it, not execute it there! Which means we should use it **without** parantheses at the end. Because React will execute the function for us when the event occurs.*
```javascript
const changeTitle = () => {...}
...
<button onClick={changeTitle}>BtnTxt</button>
```
> *Be aware that some programmes name these kind of functions with the name of event listener. i.e. instead of **changeTitle** above, they use something like **clickHandler**.*

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

## "State"
In the beginning React evaluates all components recursively up until a point which there is no more inner components and returns the JSX codes as interpreted accordingly. However it performs this just at the beginning once, but we need to make React re-evaluate some parts of components based on events such as clicking etc. Here comes the **State** structure.  

Regular variables such as *let* doesn't trigger this re-evaluation. React simply doesn't care about them. To make it happen first of all we need to import some special content from React:
```javascript
import { useState } from 'react';
```
Then we have to call it inside our component function. Actually `useState` is a React **hook**. There are also other hooks in React. We can recognize them with their `use` beginning, just like the event listeners were with `on` beginning. Furthermore, they are to be called inside our component functions, **not outside** or **not even in nested functions**! So they must be **directly** called inside the components.  

While calling it, we need to pass our will-be-changed attribute to it, so that it may trigger the re-evaluation when that particular attribute is changed.  

`useState` returns us **always** two things in an array:
1. 1st element is the current value of that attribute
2. 2nd element is the function to be executed on that attribute

So by using destructuring we will be assigning these two returns:
```javascript
const [title, setTitle] = useState(props.title);
...
```
> *The naming convention is like we see above. The first one is actually our new variable name for the attribute comes from `props`. So the second one is generally preferred as with `set` added at the beginning and the attribute is right next to it with a capital letter i.e. `setTitle`*

Finally we can use our `set` function *-destructured from `useState` and named by us-* to set a new value to that attribute:
```javascript
const [title, setTitle] = useState(props.title);
...
const clickHandler = () => {
    setTitle('New Title');
}
...
<button onClick={clickHandler}>Change Title</button>
```

## Listening to User Input
We can listen to user input on input elements in many ways. However the most efficient one is `onChange`. We can use it on any type of input. In text inputs, it's trigerred with every key stroke. Inside we need to point to the function which we want to be executed when the event occurs, just like with `onClick`:
```javascript
<input type='text' onChange={titleChangeHandler} />
```
In order to be able to get user input we will benefit from `event` object which is a default javascript behavior we get in the browser while listening to events. We have lots of data on this object, but the important thing for us is `event.target.value` which holds the current value of the input at the point of time this event occurs. So in our handler function:
```javascript
const [enteredTitle, setEnteredTitle] = useState('');
const [enteredAmount, setEnteredAmount] = useState('');
const titleChangeHandler = (event) => {
  setEnteredTitle(event.target.value)
}
const amountChangeHandler = (event) => {
    setEnteredAmount(event.target.value)
  }
```
> *When we are getting user input, it always comes as **string** that's why we initialize **state** with an empty string up above. Also beware that we can have multiple states per component and they won't be effecting each other.*

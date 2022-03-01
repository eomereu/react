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
> *Be aware that some programmers name these kind of functions with the name of event listener. i.e. instead of **changeTitle** above, they use something like **clickHandler**.*

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

## Single State Approach
However we could also use just one state instead of multiple state, which may be thought as getting rid of duplicate states. In this case, we should set the state as an object. Furthermore, beware that when we are updating a value in that object, we should reassign the other ones also, otherwise those values will be lost, since React does not merge states. To do this, we can simply use the *spread operator*.
```javascript
const [userInput, setUserInput] = useState({
  enteredTitle: '',
  enteredAmount: '',
  enteredDate: ''
})
const titleChangeHandler = (event) => {
  // please see the next section for the explanation
  // for the following three lines
  setUserInput((prevState) => {
    return { ...prevState,  enteredTitle: event.target.value };
  })
}
```
> *Please note that, the more common way is to use **multiple states**!*

## Updating State That Depends on the Previous State
In following cases we need to use the implementation down below to safely depend on the previous state. Here we should pass in an arrow function to our **setting function** and `prevState` *-as an argument to this inner arrow funciton-* ensures us to safely refer to the previous state.
1. When we use **single state approach**
1. When we use operations like **incrementing/decrementing**
```javascript
const titleChangeHandler = (event) => {
  setUserInput((prevState) => {
    return { ...prevState,  enteredTitle: event.target.value };
  })
}
```

## Handling Form Submission
We could add an `onClick` listener to our button. However this is not a best way to listen to a button. Instead, if a button *(especially with a **submit** type)* is pressed inside of a form, the overall **form** element will emit an event which we can listen. So we cann add `onSubmit` event listener directly onto the **form** element:
```javascript
...
return (
  <form onSubmit={submitHandler}>
  ...
  </form>
)
```
As a default when we use this -built-in- listener, it automatically refreshes the whole page as we use the button. But that's not what we want. Instead we want to handle this submission with javascript. Thankfully, we can disable this default behaviour by `event.preventDefault();`
```javascript
const submitHandler = (event) => {
  event.preventDefault();

  const expenseData = {
    title: enteredTitle,
    amount: enteredAmount,
    date: new Date(enteredDate)
  }
}
```
## Two-Way Binding
Two-way binding simply means that, for inputs we don't just listen to changes but we can also pass a new value to the input so that we can reset or change the input. To do so *i.e.*:
1. We add `value={enteredTitle}` to the **input element**
2. We add `setEnteredTitle('')` to the **submitHandler**.

## Child-to-Parent Component Communication 
During the communication we are not allowed to skip the components in between. We need to follow the order and pass the data through each of them in order. We will be adding **new props** to our components to be able to communicate:
```javascript
// NewExpense.js - Parent
const saveExpenseDataHandler = (enteredExpenseData) => {
    const expenseData = {
      ...enteredExpenseData,
      id: Math.random().toString()
    };
    props.onCreateExpense(expenseData); // this is also a parent comp. func.
  }
...
<ExpenseForm onSaveExpenseData={saveExpenseDataHandler} />
```
> *At the end of the day since this new prop should have a function as a value, a good naming convention is to start it with **on** i.e. **onSaveExpenseData**...*

Now we can access the new prop inside our *(child)* component. To access we need to use `props` as argument to the component function,
```javascript
// ExpenseForm.js - Child
const ExpenseForm = (props) => {
  ...
  props.onSaveExpenseData(expenseData);
}
```
So actually the thing we do is to pass a pointer for the function we defined into the child component. Then **we execute this function in the child component not in the component that we defined it**. We are eligible to do this since we have already passed a **pointer** to the **function we created** on the **new prop** we defined.
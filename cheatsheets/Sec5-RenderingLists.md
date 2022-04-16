# Section 5- Rendering Lists and Conditional Content

## Rendering Lists of Data

Naturally we want to handle and output our expenses dynamically. For this we will be using `.map()` function, which is a built-in JavaScript function on arrays. We will transform each element from being an object in an array into _ExpenseItem_ in our case and they will be rendered by React.

```javascript
{
  props.expenses.map((expense) => (
    <ExpenseItem
      title={expense.title}
      amount={expense.amount}
      date={expense.date}
      currency={props.currency}
    />
  ));
}
```

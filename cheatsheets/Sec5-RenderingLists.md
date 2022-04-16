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

## Using Stateful Lists
As we know React updates the elements that have states. So instead of a stateless/dummy array of objects we want to use it with **State**. However we should be aware that while updating our array, we must consider its previous state which means we will be using the `prev...` state within a function to be able to safely depend on the previous version of our array.
```javascript
const [expenses, setExpenses] = useState(DUMMY_EXPENSES)

const createExpenseHandler = (expenseData) => {
  setExpenses((prevExpenses) => {
    return [expenseData, ...prevExpenses];
  })
};
```
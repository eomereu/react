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

## Understanding "Keys"
Whenever we add an ExpenseItem onto our page, React does the following, **unless we tell React where to add element in a correct way** *(or it seems the elements as similar objects)*:
1. Adds a new `div` at the end of the divs
1. Walks through all elements and updates their content ***since we wanted it to add in front of the list, indeed***  

There are handicaps of this behavior:
- There may be problem with performance since it's going through **all** the elements in our array
- More importantly it may lead to bugs:
  - *i.e.* if some states were handled within our ExpenseItems then it was going to disappear through this walkthrough

So the way to tell React where to put new elements is to add `key` prop. It can be added to any component. By doing so will help React to identify individual items. Of course we need to give `key` prop a **unique** feature like *id*, which typically comes from databases as unique as expected.
```javascript
{props.expenses.map((expense) => (
  <ExpenseItem
    key={expense.id}
    title={expense.title}
    amount={expense.amount}
    date={expense.date}
    currency={props.currency}
  />
))}
```
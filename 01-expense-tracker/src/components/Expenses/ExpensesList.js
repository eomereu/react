import ExpenseItem from "./ExpenseItem";
import "./ExpensesList.css";

const ExpensesList = (props) => {
  if (props.expenses.length === 0) {
    return <h3 className="expenses-list__fallback">No expenses found.</h3>;
  } else if (props.expenses.length > 0) {
    return (
      <ul className='expenses-list'>
        {props.expenses.map((expense) => (
          <ExpenseItem
            key={expense.id}
            title={expense.title}
            amount={expense.amount}
            date={expense.date}
            currency={props.currency}
          />
        ))}
      </ul>
    );
  }
};

export default ExpensesList;

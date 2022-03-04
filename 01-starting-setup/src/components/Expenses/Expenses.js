import { useState } from 'react';
import Card from "../UI/Card";
import "./Expenses.css";
import ExpenseItem from "./ExpenseItem";
import ExpensesFilter from "./ExpensesFilter";

const Expenses = (props) => {
  const [filteredYear, setFilteredYear] = useState('2020');

  const onFilterHandler = (selectedYear) => {
    setFilteredYear(selectedYear);
  }

  return (
    <Card className="expenses">
      <ExpensesFilter selected={filteredYear} onFilter={onFilterHandler} />
      <ExpenseItem
        title={props.expenses[0].title}
        amount={props.expenses[0].amount}
        date={props.expenses[0].date}
        currency={props.currency}
      />
      <ExpenseItem
        title={props.expenses[1].title}
        amount={props.expenses[1].amount}
        date={props.expenses[1].date}
        currency={props.currency}
      />
      <ExpenseItem
        title={props.expenses[2].title}
        amount={props.expenses[2].amount}
        date={props.expenses[2].date}
        currency={props.currency}
      />
      <ExpenseItem
        title={props.expenses[3].title}
        amount={props.expenses[3].amount}
        date={props.expenses[3].date}
        currency={props.currency}
      />
    </Card>
  );
}

export default Expenses;
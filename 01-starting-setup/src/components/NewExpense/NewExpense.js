import './NewExpense.css';
import ExpenseForm from './ExpenseForm';

const NewExpense = () => {
  return (
    <div className='new-expense'>
      <h2>Add Expense Item</h2>
      <ExpenseForm />
    </div>
  )
};

export default NewExpense;
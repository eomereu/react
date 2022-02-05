import './ExpenseItem.css'

function ExpenseItem() {
  const expenseDate = new Date(27, 5, 2022);
  const expenseTitle = 'Car Insurance';
  const expenseAmount = 294.67;
  const expenseAmountCurrency = '€';

  return (
    <div className="expense-item">
      <div>{expenseDate.toISOString()}</div>
      <div className="expense-item__description">
        <h2>{expenseTitle}</h2>
        <div className="expense-item__price">{expenseAmountCurrency + expenseAmount}</div>
      </div>
    </div>
  );
}

export default ExpenseItem;

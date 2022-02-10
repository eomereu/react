import Card from '../UI/Card';
import './ExpenseItem.css'
import ExpenseDate from './ExpenseDate';

const ExpenseItem = (props) => {
  let title = props.title;

  const changeTitle = () => {
    title = "New Title";
    console.log(title);
  }

  return (
    <Card className="expense-item">
      <ExpenseDate date={props.date} />
      <div className="expense-item__description">
        <h2>{title}</h2>
        <div className="expense-item__price">{props.currency + props.amount}</div>
      </div>
      <button onClick={changeTitle}>Change Title</button>
    </Card>
  );
}

export default ExpenseItem;

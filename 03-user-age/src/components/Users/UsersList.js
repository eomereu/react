import Card from "../UI/Card";
import classes from "./UsersList.module.css";

const UsersList = (props) => {
  return (
    <Card className={classes.users}>
      <h2>Party Attendee List</h2>
      <ul>
        {props.users.map((user) => (
          <li key={user.id}>
            {user.username} ({user.age} years old)
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default UsersList;

import classes from "./UsersList.module.css";

const UsersList = (props) => {
  return (
    <div className={classes.users}>
      <ul>
        {props.users.map((user) => (
          <li key={user.id}>
            {user.username} {user.age}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;

import classes from "./Button.module.css";

const Button = (props) => {
  return <button className={classes.button} type={props.type}>Add User</button>;
};

export default Button;
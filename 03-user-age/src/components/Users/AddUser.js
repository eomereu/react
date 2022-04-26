import Card from "../UI/Card";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
import classes from "./AddUser.module.css";
import { useState } from "react";

const AddUser = (props) => {
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  const [show, setShow] = useState(false);
  const [errorTitle, setErrorTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const usernameInputHandler = (event) => {
    setUsername(event.target.value);
  };

  const ageInputHandler = (event) => {
    setAge(event.target.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (username.trim().length === 0 || age.trim().length === 0 || +age < 9) {
      setErrorTitle("Invalid Input!")
      setErrorMessage("Input preconditions are as following:\n - Username or Age fields cannot be empty.\n - Person cannot be younger than 9 years old.")
      setShow(true);
      return;
    }
    props.addUserHandler({
      id: Math.floor(Math.random() * 100),
      username: username,
      age: age,
    });
    setUsername("");
    setAge("");
  };

  const onOkayHandler = () => {
    setShow(false)
  }

  return (
    <>
    {show && <ErrorModal title={errorTitle} message={errorMessage} onOkay={onOkayHandler} />}
    <Card className={classes.input}>
      <form onSubmit={onSubmitHandler}>
        <label htmlFor="username">Username</label>
        <input id="username" type="text" onChange={usernameInputHandler} value={username} />
        <label htmlFor="age">Age (Years)</label>
        <input id="age" type="number" onChange={ageInputHandler} value={age} />
        <label htmlFor=""></label>
        <Button type="submit">Add User</Button>
      </form>
    </Card>
    </>
  );
};

export default AddUser;

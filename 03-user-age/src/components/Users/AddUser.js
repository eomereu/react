import Card from "../UI/Card";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
import classes from "./AddUser.module.css";
import { useState } from "react";

const AddUser = (props) => {
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  const [valid, setValid] = useState(false);

  const usernameInputHandler = (event) => {
    setUsername(event.target.value);
  };

  const ageInputHandler = (event) => {
    setAge(event.target.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (username.trim().length === 0 || age.trim().length === 0 || +age < 1) {
      return;
    }
    setValid(true);
    props.addUserHandler({
      id: Math.floor(Math.random() * 100),
      username: username,
      age: age,
    });
    setUsername("");
    setAge("");
  };

  return (
    <>
    <ErrorModal title="An Error Occured" message={"Oops! Something went wrong..."} />
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

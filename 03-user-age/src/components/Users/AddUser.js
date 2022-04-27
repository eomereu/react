import Card from "../UI/Card";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
import classes from "./AddUser.module.css";
import { useState, useRef } from "react";

const AddUser = (props) => {
  const nameInputRef = useRef();
  const ageInputRef = useRef();
  const [error, setError] = useState();

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const username = nameInputRef.current.value;
    const age = ageInputRef.current.value;
    if (username.trim().length === 0 || age.trim().length === 0 || +age < 18) {
      setError({
        title: "Invalid Input!",
        message:
          "Input preconditions are as following:\n - Username or Age fields cannot be empty.\n - Person cannot be younger than 18 years old.",
      });
      return;
    }
    props.addUserHandler({
      id: Math.floor(Math.random() * 100),
      username: username,
      age: age,
    });
    nameInputRef.current.value = "";
    ageInputRef.current.value = "";
  };

  const onOkayHandler = () => {
    setError(null);
  };

  return (
    <>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onOkay={onOkayHandler}
        />
      )}
      <Card className={classes.input}>
        <h2>Party Attendee Form</h2>
        <form onSubmit={onSubmitHandler}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            ref={nameInputRef}
            />
          <label htmlFor="age">Age (Years)</label>
          <input
            id="age"
            type="number"
            ref={ageInputRef}
          />
          <label htmlFor=""></label>
          <div className={classes["button-area"]}>
            <Button type="submit">Add User</Button>
          </div>
        </form>
      </Card>
    </>
  );
};

export default AddUser;

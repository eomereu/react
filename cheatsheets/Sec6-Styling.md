# Section 6 - Styling React Components
## Setting Dynamic Inline Styles
First of all, normal CSS files, that we have used so far, have a global scope. It means, whether we import or not, some classes or ids that are present among the other files may get effected by those. Other than tis we may want a conditional styling, our first choice is an inline styling with ternary expression. Please beware that it overrides all the stylings defined by our CSS files.
```javascript
const [enteredValue, setEnteredValue] = useState("");
const [isValid, setIsValid] = useState(true);

const goalInputChangeHandler = (event) => {
  if (enteredValue.trim().length > 0) {
    setIsValid(true);
  }
  setEnteredValue(event.target.value);
};

const formSubmitHandler = (event) => {
  event.preventDefault();
  if (enteredValue.trim().length === 0) {
    setIsValid(false);
    return;
  }
  props.onAddGoal(enteredValue);
};

return (
  <form onSubmit={formSubmitHandler}>
    <div className="form-control">
      <label style={{ color: isValid ? "black" : "red" }}>Course Goal</label>
      <input type="text" onChange={goalInputChangeHandler} />
    </div>
    <Button type="submit">Add Goal</Button>
  </form>
);
```
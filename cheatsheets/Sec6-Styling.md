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

## Setting CSS Classes Dynamically
Our second and the better choice for the scenario above is, changing the classes dynamically. For this we can make use of *template literals* in JavaScript which are defined between backticks ` `` `. They're capable of containing dynamic values inside within a `$()` expression.
```javascript
<div className={`form-control ${isValid ? "" : "invalid"}`}>
```
CSS file
```css
.form-control.invalid label {
  color: red;
}
```

## Styled-Components
Skipped since did not like it. For further information: https://styled-components.com/

## Using CSS Modules
As we know, our default CSS modules have a golabal scope and it may effect any component which shares the same class name in another module. To prevent this we can localize our CSS files by using *CSS Modules*. [CSS Modules](https://create-react-app.dev/docs/adding-a-css-modules-stylesheet/) is a feature which is only available in projects that are configured to support it. The apps we create by `npx create-react-app my-app` support it.  
To use *CSS Modules* we need to
1. Rename the files  
from ***MyComponent.css*** to ***MyComponent.module.css***
1. Import differently
    ```javascript
    import classes from './Button.module.css';
    ```
1. Pass our classes to our component
    ```html
    <button type={props.type} className={classes.button} onClick={props.onClick}>
    ```
> *It changes the classnames so that it can be unique!*

An example usage of dynamic styles with CSS Modules:
```bash
<div className={`${classes["form-control"]} ${!isValid && classes.invalid}`}></div>
```
> *Beware that if the class name contains a symbol like dash we can refer it within quotes within brackets!*

## Debugging React Apps
We can debug react apps on the browser by  
1. **F12**
1. **Sources**
1. *FileToDebug*
1. *Click lines to set breakpoints*
1. *Perform action on website*
1. ***DEBUG!***
> *See https://ibb.co/4gkGdGH*
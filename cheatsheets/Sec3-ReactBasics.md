# Section 3 - React Basics & Working With Components
## Creating a React App
After installing [NodeJS](https://nodejs.org/en/) LTS to our system, we can install [Create React App](https://create-react-app.dev/) application. It is a good tool for us to setup our react app.
```bash
npx create-react-app my-app
cd my-app
npm start
```

## General Notes
- Normally some code inside our *.js file* doesn't work. But our `npm start` transforms it before delivering it to the browser. It ensures that we can write a simple and readable code which is still running when delivered to the browser.

- The first file is to be executed is `index.js` **!**

- If the imported thing is a library or our own *.js file* then we should omit the extension.

- It is the best practice to keep every component in a seperate file. So since we will end up with hundreds of component we better create a folder *'compoenents'* under *'src'* folder.

- We can render/include components within other components. So we build a component tree. *(See [the image](https://ibb.co/XD8qsTd) for the schema...)*

- Example naming convention for component files are like following: *ExpenseItem.js*... Our custom components **must** start with capital letter so that React can detect them.

- A component in React is just a JavaScript function!

- In a component's return statement **only one root *(div section)*** is allowed at the outmost level. Inner divs can occur.

- Inside return statement, correct formatting might be painful. In order to bypass this *(on Visual Studio Code)*:
    - Install **'Prettier'** extension
    - Go to **File -> Preferences -> Settings** and type **'format'**
    - Under **'Editor: Default Formatter'** tab choose **'Prettier - Code Formatter'**  

    After this and writing the inner HTML code in a mixed manner, just simply use **auto format shortcut**. In order to explore the shortcut *(on Visual Studio Code)*:
    - Go to **File -> Preferences -> Keyboard Shortcuts**
    - Type **'format document'** and see/modify **'Format Document'** shortcut on the first line.

- Typically when creating a styling of a component (of course as a css file) we name it same with the component in the same directory. *(e.g. ExpenseItem.js ExpenseItem.css)*

- For *css file* to be considered in our *js file* by *React* we should explicitly state it by importing:
    ```javascript
    import './ExpenseItem.css'
    ```

- Inside *js file* actually the code is not HTML! It **looks like** HTML. So the tags for some HTML elements must be like following:
    - class -> `className=""`
    ```javascript
    <div className="expense-item">...</div>
    ```

- See [**Date Function**](https://github.com/eomereu/react/blob/main/cheatsheets/Sec3-ReactBasics.md#date-function-new-datedd-mm-yyyy) section down below for advanced usage of `new Date()`.

- It is a better practice to use the reduced *(the bolded ones)* expresssions:  
  - **`<ExpenseItem />` =** `<ExpenseItem></ExpenseItem>`
  - **`<ExpenseItem key='value' />` =** `<ExpenseItem key='value'></ExpenseItem>`
  - **`<ExpenseItem key={dynamic_value} />` =** `<ExpenseItem key={dynamic_value}></ExpenseItem>`

- It is generally a good practice to keep our components small and focused.

- A **Card *(Card.js and Card.css)*** generally refers to a container used within our UI.

- In older versions of React, we had to import React (`import React from 'react';`) into our every single file, but not any more. Moreover the content used to look like this:
  ```javascript
  return React.createElement(
    'div',
    {},
    React.createElement('h2', {}, 'Let\'s get started!'),
    React.createElement(Expenses, { expenses: expenses })
  );
  ```
  instead of
  ```javascript
  return (
    <div>
      <h2>Let's get started!</h2>
      <Expenses expenses={expenses} currency={currency} />
    </div>
  );
  ```
  So thanks to **JSX** our components are much easier to implement and read.
  > *PS: Also we can understand from the above code that why we need a single element around the inner elements (which is 'div' in our case). Because we may return only one thing, and that's what JSX doing; turning our HTML-like code into the code above and then to more browser friendly code behind the scenes.*

- We can store JSX code into the variables:
  ```javascript
  let expensesContent = <p>No expenses found.</p>;
  ```

- `Math.max()` takes number arguments, not even an array of numbers. So we can give an array of numbers to it with spread operator:
  ```javascript
  const people = [{ name:"John", age:32 }, {name:"Joe", age: 25 }]
  const ages = people.map((person) => person.age)
  const maxOfa = Math.max(...ages)
  ```

- `.trim()` gets rid of preceeding and succeeding blank chars

- Following implementation *(using of `return;` statement)* may be useful for the scenarios that we want to cut the function execution at some point
  ```javascript
  const formSubmitHandler = () => {
    if (enteredValue.trim().length === 0) {
      return;
    }
    props.onAddGoal(enteredValue);
  };
  ```

- These backticks ` `` ` are a standart JavaScript functionality. What they're defining is called as **template literal** and they're kind of a special string which may have dynamic values within `$()` inside:
  ```javascript
  <div className={`form-control ${isValid ? "" : "invalid"}`}>
  ```

- The `for` attribute for `label` components are implemented as `htmlFor` in JSX syntax.

- When to compare a number input field value with a number (for example in an if statement), adding a plus sign in front of the vlaue name is way more safer:
  ```javascript
  if (+age < 1){}
  ```

- Adding the following style for the paragraph in a CSS module, will break line on `\n`
  ```css
  white-space: pre-line;
  ```

- **React Fragment** is simply a component that returns *props.children* only. It's kind of a simple wrapper. It fulfills the requirement of returning exactly one JSX element. It does this by avoiding unnecessary compiled hundreds of divs one in another.  
  - The original way of it:
    ```javascript
    return <React.Fragment></React.Fragment>
    ```
  - The shortcut of it:
    ```javascript
    return <></>
    ```

- Refer to *https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions* for Regular Expressions.
  ```javascript
  // email validator RegEx:
  /\w+@\w+(\.\w)+/.test(action.value)
  ```

- Spreading and getting all props:
  ```javascript
  <input {...props.input} />
  ```
  This will ensure that all key-value pairs will be added here  
  ex: It will turn into the following
  ```javascript
  <input id="xyz" type="text" />
  ```

- A simple toggle with `useReducer`:
  ```javascript
  const [cartActive, dispatchCartActive] = useReducer((state) => {
    return !state;
  }, false);
  ```

- `.reduce((currentNumber, item) => {}, starting_value)` is a built in method which is called on an array and turns it into a single value, number in this case. It is used in scenarios like, there is an *items* list and in this list every item is kept based on its id but it also has an *amount* value additionally. We want to get those amount values and return a total number of items...
  ```javascript
  const cartItemsCount = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);
  ```
  > *Refer to following course section for a detailed explanation https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/25599488#overview*

## Inside `index.js`
Basically to import react:
```javascript
import ReactDOM from 'react-dom';
```
Normally the code below is not a valid syntax in a JS file, however React makes it possible.
```javascript
import './index.css';
```
To import component from our own .js file:
```javascript
import App from './App';
```
> PS: As stated above, we omit the extension since it's a .js file!

The render function, provided by ReactDOM takes two arguments. First one is the **js file** we want to be rendered. The second one is the destination which we want this rendering to occur in.
```javascript
ReactDOM.render(<App />, document.getElementById('root'));
```
> Please note that here `<App />` is definitely not a JavaScript syntax. It's a **JSX** syntax.

In our case above, it takes the component exported from our related *.js file* which in our case is *App.js* and renders it in an element which has the ID *'root'*. This element comes from the *index.html* in *public folder.*
```html
<div id="root"></div>
```

## Introducing JSX
JSX simply means JavaScriptXML. It helps us to write user friendly code. It lets us to write HTML code directtly inside js files and transforms this HTML code. In Chrome when we inspect our basic webpage, under **static/js** folder we can see the *main.chunk.js* file which is our *App.js* file in our case. However when we find our simple method, we can see its transformed and more complicated version.

## Outputting Dynamic Data
Thanks to React we can output dynamic data inside our HTML-like code within our components. All we need to do is surround them by curly braces:
```javascript
const expenseTitle = 'Car Insurance';
return (
    <h2>{expenseTitle}</h2>
)
```
We can even process JavaScript expressions:
```javascript
return (
    <p>{Math.random()}</p>
)
```

## Passing Data via `props`
Components can't just use data stored in other components, we need to pass them. *(See https://ibb.co/mRfyXvB)* We want the data to be dynamic and components to be independent of them. So we want to specify them in **App.js** and pass those arguments to our components *(e.g. ExpenseItem)*while embedding them into the HTML-like code. When we want to access the attributes that we specified within **App.js** from our component we need to set the parameter just simply as **props**. It will automatically create an object which holds all the attributes we have used.  
App.js
```javascript
...
function App() {
  const expenses = [ { id: 'e1', title: 'Toilet Paper', } ];
  return (
    <div> <ExpenseItem title={expenses[0].title}></ExpenseItem> </div>
  );
...
```
ExpenseItem.js
```javascript
...
function ExpenseItem(props) {
  return (
    <div> <h2>{props.title}</h2> </div>
  )
}
...
```
> *Ensure that the property names match! Also please note that the above lines are not ideally aligned but arranged to reduce line amount.*

## Date Function (`new Date(dd, mm, yyyy)`)
Creates a *date object* with the specified parameters.  
Basic usage:
```javascript
const myDate = new Date(27, 0,)
```
If we want to output a Date object created via JS, we need to turn it into **ISO String** to be able to print it out via `.toISOString()` method:
```javascript
const expenseDate = new Date(24, 0, 2020);
return (
    <h2>{expenseDate.toISOString()}</h2>
)
```
> *Please note that months start from 0 (jan -> 0, feb -> 1, ..., dec -> 11) and the order is (dd, mm, yyyy)*

In order to transform **date** into more human readable format, we can use following JavaScript functions:
  - [`.toLocaleString('language', { key: 'value'})`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString#using_tolocalestring) : Gives us month or day (as we specify) in a human readable format.
  - [`.getFullYear()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getFullYear#using_getfullyear) : Returns us the year in 4 digits as number not string
  - In example:
    ```javascript
    const myDate = new Date(25, 8, 2021)
    const day = myDate.toLocaleString('en-US', { day: '2-digit' })
    const month = myDate.toLocaleString('en-US', { month: 'long' })
    const year = myDate.getFullYear()

    console.log(day) // 25
    console.log(month) // September
    console.log(year) // 2021
    ```

## Composition *(`props.children`)*
Whenever we wrap a component inside another one, actually we use the concept of **composition**. Other than just including smaller components into bigger ones, we can also include some shells around other components. This will save us from duplicate codes *(both JS and CSS codes)*. However we need to keep in mind that we need some extra stuff to make it work. Keep in mind that a **Card *(Card.js and Card.css)*** generally refers to a container used within our UI.  
Card.js
```javascript
...
function Card(props) {
  const classes = 'card ' + props.className;
  return <div className={classes}>{props.children}</div>;
};
...
```
- `props.children` allows our *shell* to include all our ingredients *(all the things inside our opening and closing tags of our custom component)*. It is a defaultly passed parameter provided by React.  
- Defining the classes again like the above will allow us to handle the additional classes which our different components use along Card shell.  

ExpenseItem.js
```javascript
...
function ExpenseItem(props) {
  return (
    <Card className="expense-item">
      <ExpenseDate date={props.date} />
      <div className="expense-item__description">
        <h2>{props.title}</h2>
        <div className="expense-item__price">{props.currency + props.amount}</div>
      </div>
    </Card>
  );
}
...
```

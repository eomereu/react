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
If we want to output a Date object created via JS, we need to turn it into **ISO String** to be able to print it out via `.toISOString()` method:
```javascript
const expenseDate = new Date(24, 0, 2020);
return (
    <h2>{expenseDate.toISOString()}</h2>
)
```
> *Please note that months start from 0 (Jan -> 0, Feb -> 1, ..., Dec -> 11) and the order is (DD, MM, YYYY)*
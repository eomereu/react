# Section 3 - React Basics & Working With Components
## Creating a React App
After installing [NodeJS](https://nodejs.org/en/) LTS to our system, we can install [Create React App](https://create-react-app.dev/) application. It is a good tool for us to setup our react app.
```bash
npx create-react-app my-app
cd my-app
npm start
```
- Normally some code inside our *.js file* doesn't work. But our `npm start` transforms it before delivering it to the browser. It ensures that we can write a simple and readable code which is still running when delivered to the browser.

- The first file is to be executed is `index.js` **!**

- If the imported thing is a library or our own *.js file* then we should omit the extension.

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


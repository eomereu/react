# Working with Fragments, Portals and Refs
## Portals
Naturally we don't want our **modals, also backdrops**, *(or any other overlaying components)* to be rendered side by side with our website content both in terms of semantics and preventing its effect on the other elements. We can make them rendered as direct children of *body* instead of our *root* div. We can manage this by using **React Portals**.
> *See https://ibb.co/9m05890*

To do this we need 2 things basically:
1. We need a place we want to port the component to
1. We need to let that component know that it should take the portal to that place

### 1. Opening the Portal
Go to **index.html** file under *public* and add portals/divs just above our **root div** under *body*, of course with related ids *(which we will tell the components)*
```html
<body>
  <noscript>You need to enable JavaScript to run this app.</noscript>
  <div id="backdrop-root"></div>
  <div id="overlay-root"></div>
  <div id="root"></div>
</body>
```

### 2. Letting the Component Know
Firstly we need to import **react-dom**
```javascript
import ReactDOM from "react-dom";
```
Then we must use `ReactDOM.createPortal(<ComponentToBePortaled>, <AimedPortalElement>)`. So it takes two arguments as seen:
1. The component to be portaled
1. The element that our component will be portaled to
```javascript
// source file: 03-user-age/src/components/UI/ErrorModal.js
const ErrorModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop onOkay={props.onOkay} />, document.getElementById("backdrop-root")
      )}
    </>
  );
};
```
> *Beware that `ReactDOM.createPortal()` is used within curly braces!*

## Refs
**Refs** are mainly used on *input* elements in order to get the input value *(and maybe then resetting it-however this is like a naughty action since we'd better not manipulate DOM elements on our own but let React manipulate them. However in this case, it prevents us to catch every key stroke unnecessarily)*. Actually **refs** are like **states** but with less code. They are one of *react hooks*.  

To import
```javascript
// source file: 03-user-age/src/components/Users/AddUser.js
import { useRef } from 'react',
```
After that we can initialize it within our component function by
```javascript
const AddUser = (props) => {
  const nameInputRef = useRef();
  ...
```
Literally, each *Ref* has a `current` property which holds the DOM element itself that we assigned it to. Within that current property we have `value` property which holds the value of the DOM element *(i.e. the user input for `input` elements)*. So we can make use of it. Nevertheless, as stated above resetting it may be a little bit naughty *(but practical)*.
```javascript
  const onSubmitHandler = (event) => {
    const username = nameInputRef.current.value;
    ...
    nameInputRef.current.value = '';
```
Finally adding it to the desired component is done by `ref` property on the component
```javascript
  return (
    <>
      <input id="username" type="text" ref={nameInputRef} />
    ...
```
> *Refs have less code and if we just want to read a value, quickly, they are very useful.*

> *Beware that **input** elements we modify by **ref** are **uncontrolled** elements since React doesn't modify/handle them indeed. However the ones we modify by **state** are **controlled** elements since we feed the value with every key stroke back into the component and React handles this. In other words, their **internal state** is controlled by React.*
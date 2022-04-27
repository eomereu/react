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

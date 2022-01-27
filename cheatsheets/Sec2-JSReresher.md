# Section 2 - JavaScript Refresher
## Arrow Functions
No issues with the use of "this" keyword any more.
```javascript
const myFunc = (name) => {
    console.log(name)
}
```
If we are to use **only one** argument to pass to function, then we can get rid of parantheses:
```javascript
const myFunc = name => {
    console.log(name)
}
```
If we are to implement a function with **only** a return statement, then we can get rid of the curly braces and even the **return** statement itself:
```javascript
const squareOf = x => x*x
```
***

## Exports & Imports
During imports and exports if we define an export as default then we don't need to explicitly write it down while importing except for renaming it. However during export if it's not an export with *default* keyword, then when importing we need to specifically define it within curly braces. Yet we can still rename it.
Files that we import things:  
person.js
```javascript
const person = {
    name: 'Max'
}
export default person
```
utility.js
```javascript
export const clean () => {...}
export const baseData = 10
```
Now when we are importing:  
app.js
```javascript
// default export
import person from './person.js'
import prs from './person.js'

// named export
import { clean } from './utility.js' // most common usage!
import { baseData as bData} from './utility.js' // importing while renaming
import * as bundled from './utility.js' // importing everything while packing them into bundled object
```
***

## Classes
When we inherit from a class and use *constructor* then we have to call the constructor method of its super class by the method **super()**! Otherwise we get an error.
```javascript
// creation of a class
class Male {
    constructor() {
        this.gender = 'Male'
    }
    printMyGender() {
        console.log(this.gender)
    }
}

// inheritance
class Person extends Male {
    constructor() {
        super() // calling the constructor of super class is COMPULSORY!
        this.name = 'Max'
    }
    printMyName() {
        console.log(this.name)
    }
}

// creation of an instance
const myPerson = new Person()
myPerson.printMyName()
myPerson.printMyGender()
```
***

## ES6 vs ES7 (Classes)
ES6
```javascript
// properties with constructor
constructor() {
    this.myProperty = 'value'
}
// methods
myMethod() {...}
```

ES7
```javascript
// properties
myProperty = 'value'
// methods
myMethod = () => {...}
```
***

## Spread & Rest Operator (...)
**Spread:** Used to split up array elements *or* object properties. Can be used to copy arrays and objecys safely.
```javascript
const newArray = [...oldArray, 5, 6]
const newObject = {...oldObject, newProp: 5} // if 'newProp' already exists it overwrites
```
**Rest:** Used to merge a list of function arguments into an array. Can be used to benefit from list functions.
```javascript
function sortArgs (...args) {
    return args.sort()
}
```

# Redux
Please refer to the following course section *https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/25600142#overview* for a demo of Redux.

> *PS: Skipping redux with class based components... https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/25600172#overview*

## [Redux Toolkit](https://redux-toolkit.js.org/)
It helps us to overcome difficulties of Redux. Can be installed by,
```bash
npm install @reduxjs/toolkit
```
An example slice:
```javascript
...
import { createSlice } from "@reduxjs/toolkit";

const initialState = { counter: 0, showCounter: true };

createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment(state) {
      state.counter++;
    },
    decrement(state) {
      state.counter--;
    },
    change(state, action) {
      state.counter = state.counter + Number(action.amount);
    },
    toggle(state) {
      state.showCounter = !state.showCounter;
    },
  },
});
...
```
# Custom React Hooks
We need custom react hooks in scenarios that we want a reusable function which includes some React hooks in it. They **are obliged to** start with `use` keyword in order for React to be able to behave them as custom hooks. We can of course accept parameters to them and we can return our state back so that it can be used within the components that our custom hook is used.  
A counter hook:
```javascript
import React, { useState, useEffect } from 'react'

const useCounter = (type) => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (type === 'FORWARDS') {
        setCounter((prevCounter) => prevCounter + 1);
      } else if (type === 'BACKWARDS') {
        setCounter((prevCounter) => prevCounter - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [type]);

  return counter;
}

export default useCounter;
```
ForwardCounter component:
```javascript
import Card from "./Card";

import useCounter from "../hooks/use-counter";

const ForwardCounter = () => {
  const counter = useCounter('FORWARDS');

  return <Card>{counter}</Card>;
};

export default ForwardCounter;
```
BackwardCounter component:
```javascript
import useCounter from '../hooks/use-counter';

import Card from './Card';

const BackwardCounter = () => {
  const counter = useCounter('BACKWARDS');

  return <Card>{counter}</Card>;
};

export default BackwardCounter;
```

## Custom Http Hook
A fully functional, well designed custom Http hook
```javascript
import React, { useState, useCallback } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();

      applyData(data);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  }, []);

  return {
    // shortcut is used in the below section
    isLoading, // isLoading: isLoading,
    error, // error: error,
    sendRequest, // sendRequest: sendRequest
  };
};

export default useHttp;
```
App.js *(where GET request is used with above hook)*
```javascript
import React, { useEffect, useState } from "react";

import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";
import useHttp from "./hooks/use-http";

function App() {
  const [tasks, setTasks] = useState([]);

  // in the below assignment, we simply take the returned values by our Http hook, and meanwhile we are creating an alias (renaming) sendRequest function
  const { isLoading, error, sendRequest: fetchTasks } = useHttp();

  useEffect(() => {
    const transformTasks = (tasksObj) => {
      const loadedTasks = [];
  
      for (const taskKey in tasksObj) {
        loadedTasks.push({ id: taskKey, text: tasksObj[taskKey].text });
      }
  
      setTasks(loadedTasks);
    };

    fetchTasks(
      { url: "https://react-http-6b4a6.firebaseio.com/tasks.json" },
      transformTasks
    );
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
```
NewTask.js *(where POST request is used with above hook)*
```javascript
import useHttp from "../../hooks/use-http";

import Section from "../UI/Section";
import TaskForm from "./TaskForm";

const NewTask = (props) => {
  const { isLoading, error, sendRequest: sendTaskRequest } = useHttp();

  const createTask = (tasksObj) => {
    const generatedId = tasksObj.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: tasksObj[generatedId].text };

    props.onAddTask(createdTask);
  };

  const enterTaskHandler = (taskText) => {
    sendTaskRequest(
      {
        url: "https://react-http-6b4a6.firebaseio.com/tasks.json",
        method: "POST",
        body: { text: taskText },
        headers: {
          "Content-Type": "application/json",
        },
      },
      createTask.bind(null, taskText)
    );
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;

```
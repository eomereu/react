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
import React from "react";

import "./Input.css";

const Input = React.forwardRef((props, ref) => {
  return (
    <div className="_input">
      <label htmlFor={props.feat.id}>{props.label}</label>
      <input ref={ref} {...props.feat} />
    </div>
  );
});

export default Input;

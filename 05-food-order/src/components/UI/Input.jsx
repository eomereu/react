import React from "react";

import "./Input.css";

const Input = (props) => {
  return (
    <div className="_input">
      <label htmlFor={props.feat.id}>{props.label}</label>
      <input {...props.feat} />
    </div>
  );
};

export default Input;

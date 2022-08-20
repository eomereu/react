import React from "react";
import "./Input.css";

const Input = (props) => {
  return (
    <div className={`${props.isValid === false ? 'app__input app__input-invalid' : 'app__input'}`}>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
    </div>
  );
};

export default Input;

import React from "react";

import "./Button.css";

const Button = (props) => {
  return <button className="_button" onClick={props.onClick}>{props.children}</button>;
};

export default Button;

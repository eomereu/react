import React from "react";

import "./Button.css";

const Button = (props) => {
  return <button className="_button" {...props.feat}>{props.children}</button>;
};

export default Button;

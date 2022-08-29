import React from "react";

import "./ButtonC.css";

const ButtonC = (props) => {
  return <button className="_button-c" onClick={props.onClick}>{props.children}</button>;
};

export default ButtonC;

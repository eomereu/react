import React from "react";

import "./ButtonB.css";

const ButtonB = (props) => {
  return <button className="_button-b" onClick={props.onClick}>{props.children}</button>;
};

export default ButtonB;

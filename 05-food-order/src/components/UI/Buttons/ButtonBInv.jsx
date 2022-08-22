import React from "react";

import "./ButtonBInv.css";

const ButtonBInv = (props) => {
  return <button className="_button-b_inv" onClick={props.onClick} >{props.children}</button>;
};

export default ButtonBInv;
import "./Card.css";
// import classes from "./Card.module.css";

const Card = (props) => {
  // console.log(`${classes.card} ${props.className}`)
  return <div className={"card " + props.className}>{props.children}</div>;
  // return <div className={`${classes.card} ${props.className}`}>{props.children}</div>;
};

export default Card;

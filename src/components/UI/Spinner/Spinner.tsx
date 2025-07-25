import classes from "./Spinner.module.css";

function Spinner() {
  return (
    <div className={classes.threeBody}>
      <div className={classes.threeBodyDot}></div>
      <div className={classes.threeBodyDot}></div>
      <div className={classes.threeBodyDot}></div>
    </div>
  );
}

export default Spinner;

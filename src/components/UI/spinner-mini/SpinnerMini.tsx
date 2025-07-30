import classes from "./SpinnerMini.module.css";

function SpinnerMini() {
  return (
    <div className={classes.dotSpinner}>
      <div className={classes.dotSpinnerDot}></div>
      <div className={classes.dotSpinnerDot}></div>
      <div className={classes.dotSpinnerDot}></div>
      <div className={classes.dotSpinnerDot}></div>
      <div className={classes.dotSpinnerDot}></div>
      <div className={classes.dotSpinnerDot}></div>
      <div className={classes.dotSpinnerDot}></div>
      <div className={classes.dotSpinnerDot}></div>
    </div>
  );
}

export default SpinnerMini;

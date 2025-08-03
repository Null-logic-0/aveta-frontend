import classes from "./Spinner.module.css";

function Spinner() {
  return (
    <div className={classes.spinner}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default Spinner;

import Navigation from "./navigation";

import classes from "./layout.module.css";

export default function Layout(props) {
  return (
    <>
      <Navigation />
      <div className={classes.border}></div>
      <main>{props.children}</main>
    </>
  );
}

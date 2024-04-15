import * as React from "react";
import * as classes from "../styles/root.module.scss";
import logo from "../static/logo.png";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

const Root = () => {
  return (
    <div className={classes.root}>
      <Link to="/">
        <div className={classes.logoContainer}>
          <img src={logo} alt="Davinci Design logo" className={classes.logo} />
          <h1>Davinci</h1>
        </div>
      </Link>
      <div className={classes.inner}>
        <Outlet />
      </div>
    </div>
  );
};

export { Root };

import * as React from "react";
import logo from "../static/logo.png";
import { Outlet } from "react-router-dom";

import * as classes from "../styles/root.scss";
document.body.className = classes.body;

const Root = () => {
  return (
    <div className="root">
      <div className="logo-container">
        <img src={logo} alt="Davinci Design logo" className="logo" />
        <h1>Davinci</h1>
      </div>
      <div className="inner">
        <Outlet />
      </div>
    </div>
  );
};

export { Root };

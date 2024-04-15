import * as React from "react";
import logo from "../static/logo.png";
import * as classes from "../styles/global.scss";
import { Outlet } from "react-router-dom";

document.body.className = classes.body;

const Root = () => {
  return (
    <>
      <img src={logo} alt="Davinci Design logo" />
      <h1>Davinci</h1>
      <Outlet />
    </>
  );
};

export { Root };

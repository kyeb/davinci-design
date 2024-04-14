import * as React from "react";
import logo from "../img/logo.png";
import * as classes from "../styles/global.scss";

document.body.className = classes.body;

const Root = () => {
    return <>
        <h1>The AI Mechanical Engineer</h1>
        <img src={logo} alt="Davinci Design logo" />
    </>;
}

export { Root }

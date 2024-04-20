import * as React from "react";
import * as classes from "../styles/homepage.module.scss";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div className={classes.container}>
      <button
        className="ui primary button main-button"
        onClick={() => navigate("/editor")}
      >
        Editor
      </button>
    </div>
  );
};

export { Homepage };

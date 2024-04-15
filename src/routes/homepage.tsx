import * as React from "react";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="ui primary button" onClick={() => navigate("/editor")}>
        Editor
      </div>
    </div>
  );
};

export { Homepage };

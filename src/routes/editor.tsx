import * as React from "react";
import { STLViewer } from "../components/viewer";
import stl from "../static/coffee-machine.stl";

const Editor = () => {
  return (
    <>
      <h1>Editor</h1>
      <div style={{ height: "100vh", width: "100vw" }}>
        <STLViewer url={stl} />
      </div>
    </>
  );
};

export { Editor };

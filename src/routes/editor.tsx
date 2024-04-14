import * as React from "react";
import { STLViewer } from "../components/viewer";

const Editor = () => {
  return (
    <>
      <h1>Editor</h1>
      <div style={{ height: "100vh", width: "100vw" }}>
        <STLViewer url="https://storage.googleapis.com/ucloud-v3/ccab50f18fb14c91ccca300a.stl" />
      </div>
    </>
  );
};

export { Editor };

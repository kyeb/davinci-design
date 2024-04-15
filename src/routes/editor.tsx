import * as React from "react";
import * as classes from "../styles/editor.module.scss";
import { STLViewer } from "../components/viewer";
import { Chat } from "../components/chat";
import stl from "../static/coffee-machine.stl";

const Editor = () => {
  return (
    <div className={classes.editor}>
      <div className={classes.chatTitle}></div>
      <div>
        <Chat />
      </div>
      <div className={classes.viewer}>
        <STLViewer url={stl} />
      </div>
    </div>
  );
};

export { Editor };

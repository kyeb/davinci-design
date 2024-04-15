import * as React from "react";
import { STLViewer } from "../components/viewer";
import { Chat } from "../components/chat";
import stl from "../static/coffee-machine.stl";

import * as classes from "../styles/editor.scss";
document.body.className = classes.body;

const Editor = () => {
  return (
    <div className="editor">
      <div className="chat-title"></div>
      <div className="chat">
        <Chat />
      </div>
      <div className="viewer">
        <STLViewer url={stl} />
      </div>
    </div>
  );
};

export { Editor };

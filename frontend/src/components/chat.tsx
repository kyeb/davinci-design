import * as React from "react";
import * as classes from "../styles/chat.module.scss";

const { useState } = React;

const Chat = () => {
  const [chat, setChat] = useState("");
  return (
    <div className={classes.container}>
      <h2>Chat</h2>
      <div>
        <p>imagine some chat logs here</p>
        <p>...</p>
        <p>blah blah blah</p>
      </div>
      <div className={classes.chatInput}>
        <div className={"ui icon input " + classes.chatInputTextbox}>
          <input
            type="text"
            placeholder="Ask Davinci something..."
            value={chat}
            onChange={(e) => setChat(e.target.value)}
          />
          <i className="paper plane outline icon large" />
        </div>
      </div>
    </div>
  );
};

export { Chat };

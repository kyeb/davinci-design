import * as React from "react";

const { useState } = React;

import * as classes from "../styles/chat.scss";
document.body.className = classes.body;

const Chat = () => {
  const [chat, setChat] = useState("");
  return (
    <div className="container">
      <h2>Chat</h2>
      <div>
        <p>imagine some chat logs here</p>
        <p>...</p>
        <p>blah blah blah</p>
      </div>
      <div className="chat-input">
        <div className="ui icon input chat-input-textbox">
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

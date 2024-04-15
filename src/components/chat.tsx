import * as React from "react";

import * as classes from "../styles/chat.scss";
document.body.className = classes.body;

const Chat = () => {
  return (
    <div className="container">
      <h2>Chat</h2>
      <div>
        <p>imagine some chat logs here</p>
        <p>...</p>
        <p>blah blah blah</p>
      </div>
      <div>
        <input
          type="text"
          placeholder="Ask Davinci something..."
          className="chat-input"
        />
      </div>
    </div>
  );
};

export { Chat };

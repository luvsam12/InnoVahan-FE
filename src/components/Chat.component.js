import React from "react"
import AskQuestion from "./AskQuestion.component";
import './../styles/chat.scss';

function Chat() {
  return (
    <div className="chat-container">
        <AskQuestion></AskQuestion>
        <div className="chat-box">
        </div>

    </div>
  );
}

export default Chat;

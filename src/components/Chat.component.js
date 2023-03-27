import React, {useState, useEffect, useRef} from "react"
import AskQuestion from "./AskQuestion.component";
import './../styles/chat.scss';
import { Spin } from 'antd';

function Chat() {
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <div className="chat-container">
        <AskQuestion setAnswer={setAnswer} loading={loading} setLoading={setLoading}></AskQuestion>
        <div className="chat-box">
          <Spin spinning={loading}/>
          <div className="chat-answer" dangerouslySetInnerHTML={{ __html: answer }}>
          </div>
        </div>

    </div>
  );
}

export default Chat;

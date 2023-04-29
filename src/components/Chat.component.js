import React, {useState, useEffect, useRef} from "react"
import AskQuestion from "./AskQuestion.component";
import './../styles/chat.scss';
import { Spin, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';


function Chat() {
  const [chat, setChat] = useState([]); // [ {type: 'question', text: 'What is your name?'}, {type: 'answer', text: 'My name is Bot'} ]
  const [loading, setLoading] = useState(false);

  return (
    <div className="chat-container">
        <AskQuestion loading={loading} setLoading={setLoading} chat={chat} setChat={setChat}></AskQuestion>
        <div className="chat-box">
          <Spin spinning={loading}/>
          {
            chat.length > 0 ? chat.map((item, index) => {
              return (
                <div className="chat-item" key={index}>
                  {
                    item.type === 'question' ?
                    <div className="chat-question">
                      <Avatar icon={<UserOutlined />} />
                      <div className="question-text-box" dangerouslySetInnerHTML={{ __html: item.text }}></div>
                    </div>
                    :
                    <div className="chat-answer">
                      <div className="answer-text-box" dangerouslySetInnerHTML={{ __html: item.text }}></div> 
                      <Avatar icon={<UserOutlined />} />
                  </div>
                       
                  }
                  

                  
                </div>
              )}) 
            : 
              <lottie-player src="https://assets9.lottiefiles.com/packages/lf20_vvx2gjpt.json"  background="transparent"  speed="1"  style={{width: '300px', height: '300px', margin: 'auto'}}  loop autoplay></lottie-player>
          }
        </div>

    </div>
  );
}

export default Chat;

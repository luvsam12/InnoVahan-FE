import React, {useState, useEffect} from "react"
import { AudioOutlined, RightOutlined } from '@ant-design/icons';
import './../styles/Faq.scss';
import { useNavigate } from "react-router-dom";
import { Empty, Spin } from 'antd';
import { fetchFaq } from '../services/chat.service';


function Faq() {
    const [loading, setLoading] = useState(true);
    const [faqList, setFaqList] = useState([]);
    let navigate = useNavigate();
      
    const goToChat = (question) => {
        navigate('/chat', {state: {question: question}});
    }

    useEffect(() => {
        fetchFaq().then((res) => {
            setLoading(false);
            setFaqList(res.data);
        }).catch((err) => {
            console.log(err);
            setLoading(false);
        })
    }, [])

      
  return (
    <div className="faq-container">
        <div className="ask-new-question-placeholder-container" onClick={() => goToChat()}>
            <div className='input-text'>
                Ask your question / अपना प्रश्न पूछें / ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಕೇಳಿ
            </div>
        </div>
        
        <div className="faq-box">
            {
                faqList || faqList.length === 0 ? 
                    !loading ? 
                        faqList.map((faq, index) => {
                            return (
                                <div className="faq-item" key={index} onClick={() => {goToChat(faq.question)}}>
                                    <div className="faq-question">
                                        {faq.question}
                                    </div>
                                    <div className="right-icon">
                                        <RightOutlined />
                                    </div>
                                </div>
                            )
                        }) 
                    : <div className="no-faq">
                        <Spin spinning={loading}/>
                    </div> 
                : <div className="no-faq">
                    <Empty />
                </div>
            }
        </div>

    </div>
  );
}

export default Faq;

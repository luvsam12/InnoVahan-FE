import React, {useState, useEffect, useRef} from 'react';
import './../styles/askQuestion.scss';
import { askQuestion } from '../services/chat.service';
import { useLocation } from "react-router-dom";
import { SendOutlined } from '@ant-design/icons';



const AskQuestion = ({ setLoading, chat, setChat }) => {

    const [text, setText] = useState('');
    const ref = useRef(null);
    const {state} = useLocation();
    const { question } = state;

    useEffect(() => {
        if(question){
            const oldText = question;
            setLoading(true)
            askQuestion({question: question}).then(response => {
                while(response.data.answer.includes("\n")){
                    response.data.answer = response.data.answer.replace("\n", "<br />")
                }
                const nextChat = [
                    ...chat, 
                    {type: 'question', text: question}, 
                    {type: 'answer', text: response.data.answer}
                ]
                setChat(nextChat)
                setText('')
                setLoading(false)
            }).catch(err => {
                console.log(err);
                setLoading(false)
                setText(oldText)
            })
        }
    }, [])

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            onClickSubmit()
        }
    };

    const onClickSubmit = () => {
        const oldText = text;
        setLoading(true)
        askQuestion({question: text, source: 'input'}).then(response => {
            while(response.data.answer.includes("\n")){
                response.data.answer = response.data.answer.replace("\n", "<br />")
            }
            const nextChat = [
                ...chat, 
                {type: 'question', text: text}, 
                {type: 'answer', text: response.data.answer}
            ]
            setChat(nextChat)
            setText('')
            setLoading(false)
        }).catch(err => {
            console.log(err);
            setLoading(false)
            setText(oldText)
        })
    }

    return (
        <div className='input-container'>
            <div className='input-box'>
                <input type="textarea"  placeholder='Ask your question / अपना प्रश्न पूछें / ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಕೇಳಿ' className='input' value={text} onKeyDown={handleKeyDown} onChange={(event) => {setText(event.target.value)}}></input>
                <SendOutlined style={{ width: '10%', height: '100%' }} onClick={onClickSubmit}/>
            </div>
        </div>
    )

};

export default AskQuestion;
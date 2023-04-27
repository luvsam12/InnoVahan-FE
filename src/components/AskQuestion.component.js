import React, {useState, useEffect, useRef} from 'react';
import './../styles/askQuestion.scss';
import { askQuestion } from '../services/chat.service';
import { useLocation } from "react-router-dom";
const AskQuestion = ({setAnswer, loading, setLoading}) => {

    const [text, setText] = useState('');
    const ref = useRef(null);
    const {state} = useLocation();
    const { question } = state;

    useEffect(() => {
        if(question){
            setText(question);
            setLoading(true)
            askQuestion({question: question}).then(response => {
                while(response.data.answer.includes("\n")){
                    response.data.answer = response.data.answer.replace("\n", "<br />")
                }
                setAnswer(response.data.answer);
                setLoading(false)
            }).catch(err => {
                console.log(err);
                setLoading(false)
            })
        }
    }, [])

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            setText(text)
            setLoading(true)
            setAnswer('')
            askQuestion({question: text, source: 'input'}).then(response => {
                while(response.data.answer.includes("\n")){
                    response.data.answer = response.data.answer.replace("\n", "<br />")
                }
                setAnswer(response.data.answer);
                setLoading(false)
            }).catch(err => {
                console.log(err);
                setLoading(false)
            })
        }
    };

    return (
        <div className='input-container'>
            <div className='input-box'>
                <input type="textarea"  placeholder='Ask your question' className='input' value={text} onKeyDown={handleKeyDown} onChange={(event) => {setText(event.target.value)}}></input>
            </div>
        </div>
    )

};

export default AskQuestion;
import React, {useState, useEffect, useRef} from 'react';
import { AudioOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import './../styles/askQuestion.scss';
import { askQuestion } from '../services/chat.service';
import { useLocation } from "react-router-dom";
const AskQuestion = ({setAnswer, loading, setLoading}) => {

    let { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
    const [micState, setMicState] = useState(false);
    const [text, setText] = useState('');
    const ref = useRef(null);
    const {state} = useLocation();
    const { question } = state;

    useEffect(() => {
        if(question){
            setText(question);
            setMicState(false);
            setLoading(true)
            askQuestion({question: question}).then(response => {
                while(response.data.answer.includes("\n")){
                    response.data.answer = response.data.answer.replace("\n", "<br />")
                }
                setAnswer(response.data.answer);
                setLoading(false)
            }).catch(err => {
                console.log(err);
            })
        }
    }, [])


    if(!browserSupportsSpeechRecognition){
        return <span>Browser doesn't support speech recognition.</span>
    }

    const handleClick = () => {
        ref.current.focus();
    };

    const micClicked = () => {
        if(micState){
            SpeechRecognition.stopListening();
            setMicState(false);
        }else{
            SpeechRecognition.startListening();
            setMicState(true);
            handleClick();
        }
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
        setMicState(false);
        setLoading(true)
        setAnswer('')
        askQuestion({question: transcript, source: 'input'}).then(response => {
            while(response.data.answer.includes("\n")){
                response.data.answer = response.data.answer.replace("\n", "<br />")
            }
            setAnswer(response.data.answer);
            setLoading(false)
        }).catch(err => {
            console.log(err);
        })
        }
        else if (micState){
            setText(transcript)
            setMicState(false);
        }
    };

    return (
        <div className='input-container'>
            <div className='input-box'>
                <input ref={ref} type="textarea"  placeholder='Ask your question' className='input' value={micState ? transcript : text} onKeyDown={handleKeyDown} onChange={(event) => {setText(event.target.value)}}></input>
            </div>
            <div className='mic-container' onClick={() => micClicked()}>
                <AudioOutlined style={{color: micState ? '#72a9ff' : 'black'}}></AudioOutlined>
            </div>
        </div>
    )

};

export default AskQuestion;
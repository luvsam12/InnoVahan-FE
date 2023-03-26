import React, {useState, useEffect, useRef} from 'react';
import { AudioOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import './../styles/askQuestion.scss';

const AskQuestion = () => {

    const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
    const [micState, setMicState] = useState(false);
    const [text, setText] = useState('');
    const ref = useRef(null);

    if(!browserSupportsSpeechRecognition){
        return <span>Browser doesn't support speech recognition.</span>
    }

    const handleClick = () => {
        ref.current.focus();
    };

    const micClicked = () => {
        if(micState){
            SpeechRecognition.stopListening();
            setText(transcript);
            setMicState(false);
        }else{
            SpeechRecognition.startListening();
            setMicState(true);
            handleClick();
        }
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
        setText(transcript);
          setMicState(false);
        }
    };

    return (
        <div className='input-container'>
            <div className='input-box'>
                <input ref={ref} type="textarea"  placeholder='Ask your question' className='input' value={micState ? transcript : text} onKeyDown={handleKeyDown}></input>
            </div>
            <div className='mic-container' onClick={() => micClicked()}>
                <AudioOutlined style={{color: micState ? '#72a9ff' : 'black'}}></AudioOutlined>
            </div>
        </div>
    )

};

export default AskQuestion;
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
    // const faqList = [
    //     {
    //       question: "What is a delivery job?",
    //       answer: "A delivery job is a type of employment where the primary responsibility is to transport goods or packages from one location to another, usually within a specific geographic region."
    //     },
    //     {
    //       question: "What are the requirements for a delivery job?",
    //       answer: "The requirements for a delivery job may vary depending on the employer, but generally, you must have a valid driver's license, a clean driving record, and reliable transportation. Some employers may also require you to have a high school diploma or equivalent."
    //     },
    //     {
    //       question: "What types of vehicles can be used for delivery jobs?",
    //       answer: "The types of vehicles that can be used for delivery jobs vary depending on the employer and the type of delivery being made. Common vehicles include cars, vans, trucks, and motorcycles."
    //     },
    //     {
    //       question: "What are the working hours for a delivery job?",
    //       answer: "The working hours for a delivery job can vary depending on the employer and the type of delivery being made. Some delivery jobs may require you to work early mornings, late nights, or weekends."
    //     },
    //     {
    //       question: "What are the responsibilities of a delivery driver?",
    //       answer: "The responsibilities of a delivery driver typically include loading and unloading packages, planning delivery routes, delivering packages on time, and maintaining delivery records."
    //     },
    //     {
    //       question: "How much can I expect to earn as a delivery driver?",
    //       answer: "The earnings for a delivery driver can vary depending on the employer and the type of delivery being made. Generally, delivery drivers can earn an hourly wage or a fixed salary, as well as tips in some cases."
    //     },
    //     {
    //       question: "What skills are required for a delivery job?",
    //       answer: "The skills required for a delivery job may vary depending on the employer, but generally, delivery drivers must have good communication skills, time management skills, and the ability to work independently."
    //     },
    //     {
    //       question: "Are there any physical requirements for a delivery job?",
    //       answer: "Delivery jobs may require you to be physically fit, as the job may involve lifting and carrying packages that can be heavy or bulky."
    //     },
    //     {
    //       question: "How do I apply for a delivery job?",
    //       answer: "You can apply for a delivery job by checking online job boards, reaching out to delivery companies directly, or attending job fairs. Many employers also accept applications through their company websites."
    //     },
    //     {
    //       question: "What benefits can I expect as a delivery driver?",
    //       answer: "The benefits of a delivery job can vary depending on the employer, but may include health insurance, retirement benefits, paid time off, and discounts on company products or services."
    //     }
    //   ];
      
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
                Ask your question
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

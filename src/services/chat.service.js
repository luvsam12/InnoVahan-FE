import axios from 'axios';

export const askQuestion = async (question) => {
    let url = `http://13.232.89.81:5000/ask`;
    return axios.post(url, question);
};

export const fetchFaq = async (question) => {
    let url = `http://13.232.89.81:5000/faqs`;
    return axios.get(url);
};
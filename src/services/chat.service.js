import axios from 'axios';

export const askQuestion = async (question) => {
    let url = `http://localhost:4000/ask`;
    return axios.post(url, question);
};

export const fetchFaq = async (question) => {
    let url = `http://localhost:4000/faqs`;
    return axios.get(url);
};
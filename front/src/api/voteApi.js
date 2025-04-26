import { sendJsonData } from './apiUtils';

export const registerAnswer = async (formData) => {
    return sendJsonData('/api/vote/answer', formData, 'post');
};

export const registerQuestion = async (formData) => {
    return sendJsonData('/api/vote/question', formData, 'post');
};

export const updateQuestion = async (formData) => {
    return sendJsonData('/api/vote/question', formData, 'put');
};

export const deleteQuestion = async (formData) => {
    return sendJsonData('/api/vote/question', formData, 'delete');
};

export const getQuestionList = async () => {
    return sendJsonData('/api/vote/question', '', 'get');
};
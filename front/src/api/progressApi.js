import { sendJsonData } from './apiUtils';



export const registerProgress = async (formData) => {
    return sendJsonData('/api/progress/register', formData, 'post');
};

export const getIncomplateParentList = async () => {
    return sendJsonData('/api/progress/incomplete/parent', '', 'get');
};

export const getIncomplateChildList = async () => {
    return sendJsonData('/api/progress/incomplete/child', '', 'get');
};

export const getComplateParentList = async () => {
    return sendJsonData('/api/progress/complete/parent', '', 'get');
};

export const getComplateChildList = async () => {
    return sendJsonData('/api/progress/complete/child', '', 'get');
};
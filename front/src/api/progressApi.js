import { sendJsonData } from './apiUtils';



export const registerProgress = async (formData) => {
    return sendJsonData('/api/progress/register', formData, 'post');
};

export const getIncomplateParentList = async () => {
    return sendJsonData('/api/progress/parent/incomplete', '', 'get');
};

export const getComplateParentList = async () => {
    return sendJsonData('/api/progress/parent/complete', '', 'get');
};

export const getChildList = async () => {
    return sendJsonData('/api/progress/child', '', 'get');
};

export const updateProgress = async (formData) => {
    return sendJsonData('/api/progress/update', formData, 'put');
};
import axios, { initializeCsrfProtection } from './axiosConfig';

const baseURL = 'http://localhost:8080'; // debug

export const sendJsonData = async (url, data, method) => {
    try {
        await initializeCsrfProtection();
        const response = await axios({
            method,
            // url
            url: baseURL + url, // debug
            data: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response;
    } catch (error) {
        console.error('Error sending form data:', error.response.data.message);
        throw error;
    }
};

/*
 *基本的にログインのみで使用
 */

export const sendFormData = async (url, data, method = 'post') => {
    const formDataToSend = new FormData();
    Object.keys(data).forEach(key => {
        formDataToSend.append(key, data[key]);
    });

    try {
        await initializeCsrfProtection();
        const params = new URLSearchParams();
        Object.keys(data).forEach(key => {
            params.append(key, data[key]);
        });
        const response = await axios({
            method,
            // url,
            url: baseURL + url, // debug
            data: params,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        return response;
    } catch (error) {
        console.error('Error sending form data:', error.response.data.message);
        throw error;
    }
};
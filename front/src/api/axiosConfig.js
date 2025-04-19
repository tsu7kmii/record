import axios from 'axios';

let csrfToken = null;
axios.defaults.withCredentials = true;

export const initializeCsrfProtection = async () => {
    if (!csrfToken) {
        try {
            // const response = await axios.get('/api/csrf');
            const response = await axios.get('http://localhost:8080/api/csrf'); //debug
            csrfToken = response.data;
            axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;

        } catch (error) {
            throw error;
        }
    }
};

export default axios;

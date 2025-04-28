import axios from 'axios';

let csrfToken = null;
axios.defaults.withCredentials = true;

export const initializeCsrfProtection = async () => {
    if (!csrfToken) {
        try {
            const response = await axios.get(process.env.REACT_APP_API_BASE_ENDPOINT + '/api/csrf');
            csrfToken = response.data;
            axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;

        } catch (error) {
            throw error;
        }
    }
};

export default axios;

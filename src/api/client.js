import axios from "axios";

const PROXY = window.location.hostname === 'localhost' ? '' : '/api';
const URL = `${PROXY}`;

const client = axios.create({
    //baseURL: 'http://localhost:3000',
    baseURL: window.location.hostname === 'localhost'
                ? import.meta.env.VITE_BACKEND_AXIOS_URL + PROXY
                : URL,
    timeout: 10000,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    headers: {
        'Content-Type': 'application/json',
        'React-Division': 'ReactDivision',
    },
});



client.interceptors.request.use(
    (config) => {
        return config;
    },
    (err) => {
        return Promise.reject(err);
    },
);

client.interceptors.response.use(
    (config) => {
        return config;
    },
    (err) => {
        return Promise.reject(err);
    },
);

export default client;
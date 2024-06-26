import axios from "axios";

const client = axios.create({
    //baseURL: 'http://localhost:3000',
    baseURL: import.meta.env.VITE_BACKEND_AXIOS_URL,
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
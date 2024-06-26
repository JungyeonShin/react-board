import axios from 'axios';

const clientAxios = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 10000,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    headers: {
        'Content-Type': 'application/json',
        'React-Division': 'ReactDivision',
    },
});

clientAxios.interceptors.request.use(
    (config) => {
        return config;
    },
    (err) => {
        return Promise.reject(err);
    },
);

clientAxios.interceptors.response.use(
    (config) => {
        return config;
    },
    (err) => {
        return Promise.reject(err);
    },
);

export default clientAxios;

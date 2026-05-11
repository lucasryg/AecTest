import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:44309/api'
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');

    if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.log(
            'ERRO AXIOS:',
            error.message,
            error.code,
            error.config?.url
        );

        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.reload();
        }

        return Promise.reject(error);
    }
);

export default api;
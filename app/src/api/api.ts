import { message } from 'antd';
import axios from 'axios';
import { getTokenLocalStorage } from '../context/AuthProvider/util';

const api = axios.create({
    baseURL: 'http://localhost:8080'
});

api.interceptors.request.use(async config => {

    const token = await getTokenLocalStorage();

    if (token) {
        config.headers.Token = `${token}`;
    }

    return config;
});

api.interceptors.response.use((response) => {

    return response;
}, (error)  => {

        if (error.response === undefined) {
            console.error("Erros da requisição", error.response);
            message.error("O sistema está temporariamente fora do ar!");
            return Promise.reject(error);
        }

        if (typeof error.response.data === 'string') {
            message.error(error.response.data);
        } 
        
        if (error.response.data.message) {
            message.error(error.response.data.message);
        }

        return Promise.reject(error);
    }
)

export default api;
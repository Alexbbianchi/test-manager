import { message } from 'antd';
import axios from 'axios';
import { getTokenLocalStorage } from '../context/AuthProvider/util';

// cria uma conexão com o axios
const api = axios.create({
    baseURL: 'http://localhost:8080'
});

// intercepta a requisição
api.interceptors.request.use(async config => {

    // pega o token salvo no localstorage
    const token = await getTokenLocalStorage();

    //se tiver token
    if (token) {
        // adiciona no corpo da requisição
        config.headers.Token = `${token}`;
    }
    // e retorna a configuração
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
import api from "../../../api/api";

export const endPoint: string = 'api/login';

class Api {

    async login(username: string, password: string): Promise<string> {

        return (await api.post(`${endPoint}/${username}/${password}`)).data;
    }
}

export const LoginApi = new Api();
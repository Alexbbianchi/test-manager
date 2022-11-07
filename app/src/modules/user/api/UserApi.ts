import api from '../../../api/api';
import EnumServices from '../../../services/Utils/Enums/EnumServices';
import { User, DetailUserResult, ListUsersResult, UserStatus, UserPermission } from '../models/User';

export const endPoint: string = 'api/users';

class Api {

    async getUser(moduleId: string): Promise<DetailUserResult> {
        let result = (await api.get(`${endPoint}/${moduleId}`)).data;

        return {
            ...result,
            status: EnumServices.convertStringFromEnum(UserStatus, result.status),
            permission: EnumServices.convertStringFromEnum(UserPermission, result.permission)
        }
    }

    async listAll(): Promise<ListUsersResult[]> {
        let result = (await api.get(`${endPoint}`)).data;
        
        result.forEach((user: ListUsersResult) => {
            user.status = EnumServices.convertStringFromEnum(UserStatus, user.status);
            user.permission = EnumServices.convertStringFromEnum(UserPermission, user.permission);
        });

        return result;
    }

    async create(command: User): Promise<User> {
        return (await api.post(`${endPoint}`, command)).data;
    }

    async update(command: User): Promise<User> {
        return (await api.put(`${endPoint}/${command.id}`, command)).data;
    }
    
}

export const UserApi = new Api();
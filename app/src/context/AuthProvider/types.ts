import { UserPermission } from "../../modules/user/models/User";

export interface IUser {
    id?: string;
    name?: string;
    email?: string;
    username?: string;
    permission?: UserPermission;
    dataToken?: Date;
}

export interface IContext extends IUser {
    login: (token: string) => Promise<void>; 
    logout: () => void;                      
}

export interface IAuthProvider {
    children: JSX.Element;
}
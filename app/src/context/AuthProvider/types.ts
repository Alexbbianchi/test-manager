import { UserPermission } from "../../modules/user/models/User";

export interface IUser {
    id?: string; // valores vindos no token
    name?: string; // valores vindos no token
    email?: string; // valores vindos no token
    username?: string; // valores vindos no token
    permission?: UserPermission; // valores vindos no token
    dataToken?: Date; // valores vindos no token
}

export interface IContext extends IUser { // herança em typescript
    login: (token: string) => Promise<void>;  // tipagem dos métodos passador pelo contexto
    logout: () => void;                       // tipagem dos métodos passador pelo contexto
}

export interface IAuthProvider {
    children: JSX.Element; // padrão de tipagem de um elemento JSX
}
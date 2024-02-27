import React, { createContext, useEffect, useState } from "react";
import { IAuthProvider, IContext, IUser } from "./types";
import { getTokenLocalStorage, setTokenLocalStorage } from "./util";
import jwt from "jsonwebtoken";
import { message } from "antd";
import BrowserHistory from "../../routes/BrowserHistory";
import EnumServices from "../../services/Utils/Enums/EnumServices";
import { UserPermission } from "../../modules/user/models/User";

export const AuthContext = createContext<IContext>({} as IContext);

export const AuthProvider = ({children} : IAuthProvider) => {

    const [user, setUser] = useState<IUser | null>();

    useEffect(() => {
        const token = getTokenLocalStorage();

        if (token) {

            const userme: IUser = descriptToken(token);

            let currentData = new Date();

            let dataToken = new Date(userme.dataToken + " 23:59:59"); 

            if (currentData.getTime() > dataToken.getTime()) {
                logout();
                return;
            }

            setUser(userme);
            return;
        }

        BrowserHistory.push("/login");
    }, []);

    function descriptToken (token: string) : IUser {
        const decoded = jwt.decode(token, { complete: true});
        let userme: IUser = JSON.parse(JSON.stringify(decoded?.header));
        userme.permission = EnumServices.convertStringFromEnum(UserPermission, userme.permission);
        return userme;
    }

    async function login (token: string) {
        setTokenLocalStorage(token);
        const userme: IUser = descriptToken(token);
        setUser(userme);
        BrowserHistory.push("/");
        message.success(`Seja bem vindo ${userme.name}`);
    }
    
    async function logout () {
        setTokenLocalStorage(null);
        setUser(null);
        BrowserHistory.push("/login");
        message.success(`Usuário deslogado com sucesso!`);
    }

    return (
        <AuthContext.Provider value={{ ...user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
import React, { createContext, useEffect, useState } from "react";
import { IAuthProvider, IContext, IUser } from "./types";
import { getTokenLocalStorage, setTokenLocalStorage } from "./util";
import jwt from "jsonwebtoken";
import { message } from "antd";
import BrowserHistory from "../../routes/BrowserHistory";
import EnumServices from "../../services/Utils/Enums/EnumServices";
import { UserPermission } from "../../modules/user/models/User";

// criando um contexto do react, tipando onde pode ter ou não valores
export const AuthContext = createContext<IContext>({} as IContext);

export const AuthProvider = ({children} : IAuthProvider) => {

    const [user, setUser] = useState<IUser | null>();

    // observação importante
    // Sempre que a tela o sistema for carrega, sejá de uma nova aba, ou por um F5, irá executar estas linhas
    useEffect(() => {
        // pega o token salvo no localStorage
        const token = getTokenLocalStorage();
        // verifica se existe um token
        if (token) {
            // descriptografa o token, pegando o usuário
            const userme: IUser = descriptToken(token);

            //#region Validate token
            let currentData = new Date(); // cria uma data atual
            // cria uma data, data vem como string e date, 
            //concatenamos as horas para determinar o término limite, ou sejá, ao final do dia
            let dataToken = new Date(userme.dataToken + " 23:59:59"); 
            // se a data criada for maior que a data do token, chama método de logout
            if (currentData.getTime() > dataToken.getTime()) {
                logout();
                return;
            }
            //#endregion
            // se tudo estiver corretamente, adicioma o usuário logado no contexto
            setUser(userme);
            return;
        }
        // se não tiver token, direciona para a tela de login
        BrowserHistory.push("/login");
    }, []);

    // método usado para descriptografar o token
    function descriptToken (token: string) : IUser {
        // é usado uma biblioteca para descriptografar o token, chamada jwt. 
        // é passado uma string (token) e um objeto contendo as configurações desejádas
        const decoded = jwt.decode(token, { complete: true});
        // Converte de objeto para Json, e converte de json para objeto, pois assim é possivel tipar conforme nossa interface
        let userme: IUser = JSON.parse(JSON.stringify(decoded?.header));
        // Como os enum vem como string do back, é convertido conforme seu valor e seu tipo
        userme.permission = EnumServices.convertStringFromEnum(UserPermission, userme.permission);
        // retorna o usuário
        return userme;
    }

    // método de login
    async function login (token: string) {
        // salva o token no localStorage
        setTokenLocalStorage(token);
        // descriptogafa as informações do token e
        const userme: IUser = descriptToken(token);
        // atualiza o estado do usuário
        setUser(userme);
        // direciona a tela para a rota principal
        BrowserHistory.push("/");
        // mensagem de bem vindo
        message.success(`Seja bem vindo ${userme.name}`);
    }
    
    // método de logout
    async function logout () {
        // limpa o token no localStorage
        setTokenLocalStorage(null);
        // atualiza o estado do usuário com valor vazio
        setUser(null);
        // direciona para a tela de login
        BrowserHistory.push("/login");
        // mensagem de logout
        message.success(`Usuário deslogado com sucesso!`);
    }

    // AuthContext.Provider é próprio do react
    // Contexto (context) disponibiliza uma forma de passar dados entre a árvore de componentes sem precisar passar props manualmente em cada nível.
    // passamos por contexto o usuário logado, método de login e método de logout 
    // passando os components filhos por dentro, ou sejá, cobrindo todos os components filhos com o nosso contexto
    return (
        <AuthContext.Provider value={{ ...user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
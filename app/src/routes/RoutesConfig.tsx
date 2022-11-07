import React from 'react';
import { BrowserRouter, Route, Router, Switch } from 'react-router-dom';
import ptBR from 'antd/lib/locale-provider/pt_BR'; 
import LocaleProvider from 'antd/lib/locale-provider';
import BrowserHistory from './BrowserHistory';
import Login from '../modules/login/pages/auth-login/Login';
import PrivateLayout from '../layouts/private-layout/PrivateLayout';
import RoutesModules from './RoutesModules';
import { useAuth } from '../context/AuthProvider/useAuth';
import { Button, Result } from 'antd';

const RoutesConfig: React.FC = () => {
    // instancio o usuário altenticado
    const auth = useAuth();

    // método que valida se o usário possui permissão para acessar os componentes privados ou não
    const ValidatePermission = () => {
        // se tiver nome no auth exibe telas do sistema
        if (!!auth.username) {
            return (
                <PrivateLayout>
                    <RoutesModules />
                </PrivateLayout>
            );
        }
        // se não retorna tela de acesso invalido
        return (
            <></>
            // <Result
            //     status="403"
            //     title="403"
            //     subTitle="Desculpe, você não está autorizado a acessar esta página."
            //     extra={
            //         <Button type="primary" onClick={() => BrowserHistory.push("/login")}>
            //             Ir para tela de login
            //         </Button>
            //     }
            // />
        )
    }

    return (
        <>
            <BrowserRouter /* próprio do react-router-dom */>
                <Switch>
                    <Router history={BrowserHistory} /* é passado o BroserHistory como history, assim podemos usar as rotas em qualquer lugar do sistema */>
                        <LocaleProvider locale={ptBR} /* irá traduzir os campos do antd desingn com a lingua portuguesa */> 
                            <Route path="/login" component={Login} />
                            <ValidatePermission /* Chama método que valida as permissões de acesso */ />
                        </LocaleProvider> 
                    </Router>
                </Switch>
            </BrowserRouter>
        </>
    );
}

export default RoutesConfig;

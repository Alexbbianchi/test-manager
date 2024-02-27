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
    const auth = useAuth();

    const ValidatePermission = () => {
        if (!!auth.username) {
            return (
                <PrivateLayout>
                    <RoutesModules />
                </PrivateLayout>
            );
        }
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
            <BrowserRouter>
                <Switch>
                    <Router history={BrowserHistory}>
                        <LocaleProvider locale={ptBR}> 
                            <Route path="/login" component={Login} />
                            <ValidatePermission />
                        </LocaleProvider> 
                    </Router>
                </Switch>
            </BrowserRouter>
        </>
    );
}

export default RoutesConfig;

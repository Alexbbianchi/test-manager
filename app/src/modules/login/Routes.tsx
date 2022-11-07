import React from 'react';
import { Route } from 'react-router-dom';
import AuthLogin from './pages/auth-login/Login';

const Routes: React.FC = () => {

    return (
        <>
            <Route exact path="/login" component={AuthLogin} />
        </>
    )
}

export default Routes
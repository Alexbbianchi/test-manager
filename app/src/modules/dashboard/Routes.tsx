import React from 'react'
import { Route } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';

const Routes: React.FC = () => {

    return (
        <>
            <Route path="/" exact component={Dashboard} />
        </>
    )
}

export default Routes
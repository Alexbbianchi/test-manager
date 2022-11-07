import React from 'react'
import { Route } from 'react-router-dom';
import FormModule from './pages/form-module/FormModule';
import ListModules from './pages/list-modules/ListModules';

const Routes: React.FC = () => {

    return (
        <>
            <Route path="/modules" exact component={ListModules} />
            <Route path="/modules/new" component={FormModule} />
            <Route path="/modules/edit/:moduleId" component={FormModule} />
        </>
    )
}

export default Routes
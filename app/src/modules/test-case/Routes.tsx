import React from 'react'
import { Route } from 'react-router-dom';
import FormTestCase from './pages/form-test-case/FormTestCase';
import ListTestCases from './pages/list-test-cases/ListTestCases';

const Routes: React.FC = () => {

    return (
        <>
            <Route path="/test-cases" exact component={ListTestCases} />
            <Route path="/test-cases/new" component={FormTestCase} />
            <Route path="/test-cases/edit/:testCaseId" component={FormTestCase} />
        </>
    )
}

export default Routes;
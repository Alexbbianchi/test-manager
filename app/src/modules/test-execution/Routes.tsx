import React from 'react'
import { Route } from 'react-router-dom';
import FormTestExecution from './pages/form-test-execution/FormTestExecution';
import FormExecutionRecord from './pages/form-execution-record/FormExecutionRecord';
import ListTestExecutions from './pages/list-test-executions/ListTestExecutions';

const Routes: React.FC = () => {

    return (
        <>
            <Route path="/test-executions" exact component={ListTestExecutions} />
            <Route path="/test-executions/new" component={FormTestExecution} />
            <Route path="/test-executions/edit/:testExecutionId" component={FormTestExecution} />
            <Route path="/test-executions/execution/:testExecutionId" component={FormExecutionRecord} />
        </>
    )
}

export default Routes;
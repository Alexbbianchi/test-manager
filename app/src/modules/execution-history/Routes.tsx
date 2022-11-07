import React from 'react'
import { Route } from 'react-router-dom';
import ListExecutionsHistory from './pages/list-executions-history/ListExecutionsHistory';
import ViewExecutionHistory from './pages/view-execution-history/ViewExecutionHistory';


const Routes: React.FC = () => {

    return (
        <>
            <Route path="/execution-history" component={ListExecutionsHistory} />
            <Route path="/execution-history/view/:executionId" component={ViewExecutionHistory} />
            {/* <Route path="/test-cases/edit/:testCaseId" component={FormTestCase} /> */}
        </>
    )
}

export default Routes;
import React from 'react'
import { Route } from 'react-router-dom';
import FormTestPlan from './pages/form-test-plan/FormTestPlan';
import ListTestPlans from './pages/list-test-plans/ListTestPlans';

const Routes: React.FC = () => {

    return (
        <>
            <Route path="/test-plans" exact component={ListTestPlans} />
            <Route path="/test-plans/new" component={FormTestPlan} />
            <Route path="/test-plans/edit/:testPlanId" component={FormTestPlan} />
        </>
    )
}

export default Routes;
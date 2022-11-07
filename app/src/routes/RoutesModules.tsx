import React from 'react';
import { Route } from 'react-router-dom';
import Dashboard from "../modules/dashboard/Routes";
import Product from "../modules/product/Routes";
import Module from "../modules/module/Routes";
import TestPlan from "../modules/test-plan/Routes";
import TestCase from "../modules/test-case/Routes";
import TestExecution from "../modules/test-execution/Routes";
import ExecutionHistory from "../modules/execution-history/Routes";
import User from "../modules/user/Routes";
import { useAuth } from '../context/AuthProvider/useAuth';
import { UserPermission } from '../modules/user/models/User';

const RoutesModules: React.FC = () => {
    // instancia as permissões do usuário logado
    const auth = useAuth();

    return (
        <>
            {/* rotas
                se o usuário for do tipo visitante, não terá acesso as rotas que estão dentro das chavers '{}'
            */}
            <Route path="/" exact component={Dashboard} />
            <Route path="/execution-history" component={ExecutionHistory} />
            
            {auth.permission !== UserPermission.VISITOR && 
                <>
                    <Route path="/products" component={Product} />
                    <Route path="/modules" component={Module} />
                    <Route path="/test-plans" component={TestPlan} />
                    <Route path="/test-cases" component={TestCase} />
                    <Route path="/test-executions" component={TestExecution} />
                    <Route path="/users" component={User} />
                </>
            }
        </>
    );
}

export default RoutesModules;

import React from 'react'
import { Route } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider/useAuth';
import { UserPermission } from './models/User';
import FormUser from './pages/form-user/FormUser';
import ListUsers from './pages/list-users/ListUsers';

const Routes: React.FC = () => {

    const auth = useAuth();

    return (
        <>
            <Route path="/users" exact component={ListUsers} />

            {auth.permission === UserPermission.ADMIN &&
                <Route path="/users/new" component={FormUser} />
            }
            
            <Route path="/users/edit/:userId" component={FormUser} />
        </>
    )
}

export default Routes
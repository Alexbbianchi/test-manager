import React from 'react';
import { AuthProvider } from './context/AuthProvider/AuthProvider';
import "./App.css";
import RoutesConfig from './routes/RoutesConfig';

const App: React.FC = ()  => {

    return (
        <AuthProvider>
            <RoutesConfig />
        </AuthProvider>
    )
}

export default App;

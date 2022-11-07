import React from 'react';
import { Badge } from 'antd';
import { ExecutionResultProps } from './ExecutionResult.types';
import { ExecutionResult } from '../../models/ExecutionRecord';

const ExecutionResultInfo: React.FC<ExecutionResultProps> = ({ result, style }) => {

    switch (result) {
        case ExecutionResult.ERROR: 
            return (<Badge style={style} color="orange" text="Erro" />)
        case ExecutionResult.FAILED: 
            return (<Badge style={style} color="red" text="Falha" />)
        case ExecutionResult.OK: 
            return (<Badge style={style} color="green" text="Aprovado" />)
        case ExecutionResult.BLOCKED: 
        return (<Badge style={style} color="yellow" text="Bloqueado" />)
        default:
            return (<Badge style={style} color="blue" text="Ocioso" />)
    }
}

export default ExecutionResultInfo;
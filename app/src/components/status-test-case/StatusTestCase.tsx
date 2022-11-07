import React from 'react';
import { Badge } from 'antd';
import { StatusTestCaseProps } from './StatusTestCase.types';
import { StatusType } from '../../modules/test-case/models/TestCase';

const StatusTestCase: React.FC<StatusTestCaseProps> = ({ status, style }) => {

    // componente que retorna um icone para o status conforme o tipo
    switch (status) {
        case StatusType.CONFIRMED: 
            return (<Badge style={style} status="success" text="Confirmado" />)
        case StatusType.DISABLED: 
            return (<Badge style={style} status="default" text="Desativado" />)
        case StatusType.NEED_TO_UPDATE: 
            return (<Badge style={style} status="processing" text="Precisa atualizar" />)
        default:
            return (<Badge style={style} status="warning" text="Proposta" />)
    }
}

export default StatusTestCase;
import React from 'react';
import { Badge } from 'antd';
import { PriorityTestCaseProps } from './PriorityTestCase.types';
import { PriorityType } from '../../modules/test-case/models/TestCase';

const PriorityTestCase: React.FC<PriorityTestCaseProps> = ({ priority, style }) => {
    // componente que retorna um icone para o status conforme o tipo
    switch (priority) {
        case PriorityType.URGENT: 
            return <Badge style={style} color="red" text="Urgente" />;
        case PriorityType.HIGH: 
            return <Badge style={style} color="orange" text="Alta" />;
        case PriorityType.AVERAGE: 
            return <Badge style={style} color="yellow" text="Média" />;
        default:
            return <Badge style={style} color="lime" text="Baixa" />;
    }
}

export default PriorityTestCase;
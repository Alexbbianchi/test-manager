import React from 'react';
import { Button, Card, Row } from 'antd';
import { ExecutionLayoutProps } from './ExecutionLayout.types';
import { ExecutionStatus } from '../../models/ExecutionRecord';

const ExecutionLayout: React.FC<ExecutionLayoutProps> = ({ title, backPage, onSave, children }) => {

    return (
        <Card 
            title={title} 
            bordered={true} 
            id="execution-layout"
            extra={
                <Row justify="end" >
                    <Button  className="mr20" type="default" onClick={backPage} >
                        Cancelar
                    </Button>

                    <Button type="primary" className="mr20" htmlType="submit"
                        onClick={() => onSave(ExecutionStatus.IN_PROGRESS)} >
                        Salvar
                    </Button>

                    <Button type="primary" className="btn-black" htmlType="submit"
                        onClick={() => onSave(ExecutionStatus.FINISHED)} >
                        Finalizar
                    </Button>
                </Row>
            }
        >
            {children}
        </Card>
    )
}

export default ExecutionLayout;
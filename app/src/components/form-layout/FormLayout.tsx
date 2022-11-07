import React from 'react'
import { Button, Card, Row } from 'antd'
import { FormLayoutProps } from './FormLayout.types'

const FormLayout: React.FC<FormLayoutProps> = ({ title, backPage, children }) => {

    return (
        <Card  // layout padrão usado nos formulários
            title={title} 
            bordered={true} 
            extra={
                <Row justify="end" >
                    {/* Botão de cancelar */}
                    <Button style={{marginRight:'20px'}} 
                        type="default" 
                        onClick={backPage}>
                        Cancelar
                    </Button>
                    {/* Botão de submit */}
                    <Button type="primary" htmlType="submit">
                        Salvar
                    </Button>
                </Row>
            }
        >
            {children}
        </Card>
    )
}

export default FormLayout;
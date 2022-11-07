import React from 'react'
import { FormProps } from './Form.types'
import { FormProvider } from 'react-hook-form'
import { Spin } from 'antd'
import { Form as FormAntd} from 'antd'

import "./form-styles.css"

const Form: React.FC<FormProps<any>> = ({ provider, children, loading, handleSubmit}) => {

    return (
        <FormAntd layout="vertical" 
            /* Se tiver função handle executa se não tiver executa uma função vazia */
            onFinish={handleSubmit ? provider.handleSubmit(handleSubmit) : () => {}} > 
            {/* FormAntd é o formulário, irá disparar quando clicar no botão submit */}
            
            {/* FormProvider é o provedor, quem irá controlar o formulario e seus valores
                FormProvider vem do react-hook-form 
             */}
            <FormProvider {...provider}  >
                {children} {/* Passa os filhos */}
            </FormProvider>

             {/* Se looding for true irá exibir mensagem de carregamento */}
            {loading && <div className={"form-overlayer-loaging"} >
                <Spin tip="Carregando..." size="large" style={{ position: "absolute" }} />
            </div>}
        </FormAntd >
    )
}

export default Form;
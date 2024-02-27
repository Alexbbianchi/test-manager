import React from 'react'
import { FormProps } from './Form.types'
import { FormProvider } from 'react-hook-form'
import { Spin } from 'antd'
import { Form as FormAntd} from 'antd'

import "./form-styles.css"

const Form: React.FC<FormProps<any>> = ({ provider, children, loading, handleSubmit}) => {

    return (
        <FormAntd layout="vertical" 
            onFinish={handleSubmit ? provider.handleSubmit(handleSubmit) : () => {}} > 
            
            <FormProvider {...provider}  >
                {children}
            </FormProvider>

            {loading && <div className={"form-overlayer-loaging"} >
                <Spin tip="Carregando..." size="large" style={{ position: "absolute" }} />
            </div>}
        </FormAntd >
    )
}

export default Form;
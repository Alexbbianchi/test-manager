import React from 'react'
import { Radio } from 'antd'
import { RadioGroupProps } from './RadioGroup.types'

import { Controller } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import FormItem from '../form-item/FormItem'

import "./radio-group.css"

const RadioGroup: React.FC<RadioGroupProps> = (props) => {

    return (
        <>
           <Controller // como não é possivel controlar os redio-group pelo FormFields, foi criado um componente para controlar esse tipo de campo
                name={props.name}
                key={props.name}
                render={({ onChange, value }) =>
                    <>
                        <FormItem label={props.label} required={props.required} >
                            <Radio.Group buttonStyle="solid" disabled={props.disabled}
                                {...props}
                                style={props.style ? props.style : { width: "100%" }}
                                onChange={(e) => onChange(e.target.value)} // maneira conforme documentação
                                value={value}
                            />
                            
                            <ErrorMessage name={props.name} render={({ message }) => <p style={{ color: "red" }}> {message} </p> } key={props.name} />
                        </FormItem>
                    </>
                } 
            />
        </>
    )
}

export default RadioGroup;
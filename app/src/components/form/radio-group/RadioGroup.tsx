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
           <Controller
                name={props.name}
                key={props.name}
                render={({ onChange, value }) =>
                    <>
                        <FormItem label={props.label} required={props.required} >
                            <Radio.Group buttonStyle="solid" disabled={props.disabled}
                                {...props}
                                style={props.style ? props.style : { width: "100%" }}
                                onChange={(e) => onChange(e.target.value)}
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
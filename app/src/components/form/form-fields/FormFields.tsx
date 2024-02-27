import React from 'react'
import { Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { FormFieldsProps } from './FormFields.types';
import * as Antd from "antd"
import FormItem from '../form-item/FormItem';
import locale from 'antd/es/date-picker/locale/pt_BR';
import { Switch as SwitchAntd } from 'antd';
export const FormFields = <P extends object>(Field: React.ComponentType<P>, propsConf?: any): React.FC<P & FormFieldsProps> => (props: any) => {

    return (
        <Controller
            name={props.name}
            defaultValue={props.value ?? null}
            key={props.name}
            render={({ onChange, onBlur, value }) =>
                <>
                    {props.hidden !== true &&
                    
                        <FormItem label={props.label || ""} required={props.required}> 
                            
                            <Field autoComplete="off"
                                {...propsConf}
                                {...props}
                                required={false}
                                style={props.style ? props.style : { width: "100%" }}
                                onChange={onChange}
                                onBlur={onBlur}
                                value={props.render ? props.render(value) : value} />

                            <ErrorMessage
                                name={props.name} 
                                render={
                                    ({ message }) => <p style={{ color: "red" }}> {message} </p> } 
                                key={props.name}
                            />
                        </FormItem>
                    }
                </>
            } 
        />
    );
}

const FormSwitch: React.FC<any> = (props) => {
    return (
        <SwitchAntd {...props} checked={props.value}/>
    )
}

export const Input = FormFields(Antd.Input, {});
export const Select = FormFields(Antd.Select, {})
export const TextArea = FormFields(Antd.Input.TextArea, {});
export const InputNumber = FormFields(Antd.InputNumber, { decimalSeparator: "," });
export const DatePicker = FormFields(Antd.DatePicker, { format: "DD/MM/yyyy", locale: locale });
export const RangePicker = FormFields(Antd.DatePicker.RangePicker, { fast: true, format: "DD/MM/yyyy", locale: locale });

export const Switch = FormFields(FormSwitch, {});
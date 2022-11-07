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
        <Controller // controlador do react-hook-form => seguir documentação
            name={props.name}
            defaultValue={props.value ?? null}
            key={props.name}
            render={({ onChange, onBlur, value }) => // o contrador tem encapsulado métodos de onChange e onBlur, dentre outros, basta passar no método do controlado
                <>
                    {props.hidden !== true && // se não for para esconder, exiba
                        // FormItem é a formatação dos textos e renderização (padding, etc)
                        <FormItem label={props.label || ""} required={props.required}> 
                            
                            {/* 
                                Field é o tipo do campo
                                Pode ser Input, TextArea, InputNumber, Select, etc.
                                Se não exirtir mesma cofigurações, deve-se criar um controler próprio.
                            */}
                            <Field autoComplete="off"
                                {...propsConf} // passa configurações do react component
                                {...props} // passa configurações especificas do campo
                                required={false}
                                style={props.style ? props.style : { width: "100%" }}
                                onChange={onChange}
                                onBlur={onBlur}
                                value={props.render ? props.render(value) : value} />

                            <ErrorMessage // mensagem de erro, confiração é feita no schema do Yup
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

// Component para tratar o campo de Switch
const FormSwitch: React.FC<any> = (props) => {
    return (
        <SwitchAntd {...props} checked={props.value}/>
    )
}

/**
 * Chama o método FormFiends, passando quem é o component a ser controlado e alguma configuração especifica
 * E exporta o component conforme suas especificações
 */
export const Input = FormFields(Antd.Input, {});
export const Select = FormFields(Antd.Select, {})
export const TextArea = FormFields(Antd.Input.TextArea, {});
export const InputNumber = FormFields(Antd.InputNumber, { decimalSeparator: "," });
export const DatePicker = FormFields(Antd.DatePicker, { format: "DD/MM/yyyy", locale: locale });
export const RangePicker = FormFields(Antd.DatePicker.RangePicker, { fast: true, format: "DD/MM/yyyy", locale: locale });

export const Switch = FormFields(FormSwitch, {});
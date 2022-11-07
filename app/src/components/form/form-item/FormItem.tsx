import React from 'react'
import { Form } from 'antd'
import { FormItemProps } from './FormItem.types'

const { Item } = Form;

const FormItem: React.FC<FormItemProps> = (props) => {
    return (
        <Item // Item é a mensagem que fica acima do campo, com icone de requerido
            style={{ paddingRight: 8, paddingLeft: 8 }}
            label={props.label}
            required={props.required}
        >
            {props.children}
        </Item>
    );
}

export default FormItem;

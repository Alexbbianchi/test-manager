import React, { useEffect, useState } from 'react'
import { Controller } from 'react-hook-form'
import JoditEditor from 'jodit-react'
import { ErrorMessage } from '@hookform/error-message'

import FormItem from '../form-item/FormItem'
import { completeButtons, ItensButtons, simpleButtons, TextEditorProps } from './TextEditor.types'
import "./text-editor.style.css"

const TextEditor: React.FC<TextEditorProps> = ({name, label, required, ref, personConfig, itensButtons, clearBorder}) => {

    const [config, setConfig] = useState<any>();
   
    // Pega campos que serão exibidos no editor conforme tipo
    const buttons = () => {
        if (itensButtons === ItensButtons.COMPLETE) return completeButtons;
        if (itensButtons === ItensButtons.SIMPLE) return simpleButtons;
        if (itensButtons === ItensButtons.EMPTY) return [];
        return completeButtons;
    }
    
    useEffect(() => {

        // carrega os campos exibidos no editor conforme tipo
        const btnConfig = buttons();

        // configuração default para o editor
        const defaultConfig =  {
            readonly: false,
            language: 'pt_br',
            i18n: {
                pt_br: {
                    'preview': 'Visualizar',
                    'superscript': 'Sobrescrito',
                    'subscript': 'Subscrito'
                }
            },
            buttons:    [...btnConfig],
            buttonsMD:  [...btnConfig],
            buttonsSM:  [...btnConfig],
            buttonsXS:  [...btnConfig],
        };
        
        // atualiza as configurações
        setConfig({ ...defaultConfig, ...personConfig});
    }, []);
    
    // configura o className usado
    const getClassName = () => {
        let newClassName = "";

        if (itensButtons === ItensButtons.EMPTY)
            newClassName += "removeFooter ";
        
        if (clearBorder === true)
            newClassName += "removeborder";

        return newClassName;
    }

    return (
        <>
           <Controller
                name={name}
                key={name}
                render={({ onChange, value }) =>
                    <>
                        {/* Mesmo FormItem usado nos demais controladores */}
                        <FormItem label={label || ""} required={required} >
                            <div className={getClassName()}>
                                <JoditEditor // component externo para editor de texto
                                    // trabalha com string, configurações são tags do html
                                    ref={ref}
                                    value={value}
                                    config={config}
                                    onBlur={onChange}
                                />
                            </div>
                            {/* Trata as mensagens de erro conforme o Yup */}
                            <ErrorMessage name={name} render={({ message }) => <p style={{ color: "red" }}> {message} </p> } key={name} />
                        </FormItem>
                    </>
                } 
            />
        </>
    )
}

export default TextEditor;
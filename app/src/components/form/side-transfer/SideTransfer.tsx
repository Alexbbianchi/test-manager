import React, { useState } from 'react'
import { Transfer } from 'antd'
import { SideTransferProps } from './SideTransfer.types'

import { Controller } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import FormItem from '../form-item/FormItem'

const SideTransfer: React.FC<SideTransferProps> = (props) => {

    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
    
    return (
        <>
           <Controller
                name={props.name}
                key={props.name}
                render={({ onChange, value }) =>
                    <>
                        <FormItem label={props.label || ""} required={props.required} >
                            <Transfer // configurações especificas para um sidetransfer do antd design
                                // seguir conforme documentação
                                rowKey={props.rowKey}
                                disabled={props.disabled}
                                titles={['Lista de itens', 'Itens selecionados']}
                                showSearch={props.showSearch}
                                pagination={props.pagination}
                                operations={['Adicionar', 'Remover']}
                                listStyle={props.style ?? {width: 500, height: 500}}
                                dataSource={props.dataSource}
                                targetKeys={value}
                                selectedKeys={selectedKeys}
                                onChange={onChange}
                                locale={{searchPlaceholder: "Pesquise aqui"}}
                                onSelectChange={(sourceSelectedKeys, targetSelectedKeys) => setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys])}
                                render={props.renderItem}
                            />
                            <ErrorMessage name={props.name} render={({ message }) => <p style={{ color: "red" }}> {message} </p> } key={props.name} />
                        </FormItem>
                    </>
                } 
            />
        </>
    )
}

export default SideTransfer;
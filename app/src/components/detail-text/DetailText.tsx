import React from 'react'
import { Typography } from 'antd';
import { Controller } from 'react-hook-form';
import FormatDateServices from '../../services/Utils/FormatDate/FormatDateServices';
import { DetailTextProps } from './DetailText.types';

const DetailText: React.FC<DetailTextProps> = ({ name, label, date, datetime }) => {

    // variavel que irá renderizar o resultado
    // irá pegar o valor dentro do form e exibir conforme seu tipo (string, date ou datetime)
    const resultValue = (value: any) => {
        if (!value) // se não tiver nada
            return "--"
        if (date) // se for uma date
            return FormatDateServices.formatDateTime(value);
        if (datetime) // se for um datetime
            return FormatDateServices.formatDate(value);
        return value; // por default retorna o valor
    }

    return (
        <>
            {/* Cria um controlador do react-hook-form */}
            <Controller style={{marginBottom: '-10px'}}
                name={name} // parametro passado nome
                key={name} // cria uma chave pelo nome passado
                render={({ value }) => // o render é para renderizar o valor conforme desejar
                    <>  
                        {/* Typography. text vem do Ant design */}
                        <Typography.Text style={{marginRight: '10px'}} strong /* strong é negrito */>{label}</Typography.Text> 
                        {resultValue(value)} {/*resultValue*/}
                        <br />
                    </>
                }
            />
        </>
    )
}

export default DetailText;
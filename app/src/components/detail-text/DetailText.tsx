import React from 'react'
import { Typography } from 'antd';
import { Controller } from 'react-hook-form';
import FormatDateServices from '../../services/Utils/FormatDate/FormatDateServices';
import { DetailTextProps } from './DetailText.types';

const DetailText: React.FC<DetailTextProps> = ({ name, label, date, datetime }) => {

    const resultValue = (value: any) => {
        if (!value)
            return "--"
        if (date)
            return FormatDateServices.formatDateTime(value);
        if (datetime)
            return FormatDateServices.formatDate(value);
        return value;
    }

    return (
        <>
            <Controller style={{marginBottom: '-10px'}}
                name={name}
                key={name}
                render={({ value }) =>
                    <>  
                        <Typography.Text style={{marginRight: '10px'}} strong>{label}</Typography.Text> 
                        {resultValue(value)}
                        <br />
                    </>
                }
            />
        </>
    )
}

export default DetailText;
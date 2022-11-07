import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom';
import { ModuleApi } from '../../api/ModuleApi';
import { ColumnsType } from 'antd/lib/table';
import { message } from 'antd';
import { ListModulesResult } from '../../models/Module';
import ListLayout from '../../../../components/list-layout/ListLayout';
import {
    EditOutlined
} from '@ant-design/icons';

import "./list-modules.css"

const ListModules: React.FC = () => {

    const [loading, setLoading] = useState(false);
    //Listar dados da modulo
    const [data, setData] = useState<ListModulesResult[]>([]);
    //Resultado do filtro da modulo
    const [filter, setFilter] = useState<ListModulesResult[]>([]);

    //coluna da listagem
    const colunas = useMemo(() => [
        {
            title: 'Nome',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name > b.name,
        },
        {
            title: 'Descrição',
            dataIndex: 'description',
            key: 'description',
            render: value => value ? value : ""
        },
        {
            title: 'Ações',
            key: 'cancelate',
            align: 'center',
            width: '10%',
            render: (value, record) => (
                <Link to={`/modules/edit/${record.id}`} >
                    <EditOutlined twoToneColor="#eb2f96" />
                </Link>
            )
        }
    ] as ColumnsType<ListModulesResult>, []);

    useEffect(() => {
        onListModule();
    }, []);
    
    useEffect(() => {
        setFilter(data);
    }, [data]);

    async function onListModule() {
        setLoading(true)
        try {
            let list = await ModuleApi.listAll();
            setData(list);
        }
        catch (e) {
            console.warn("Erro", JSON.stringify(e));
        }
        finally {
            setLoading(false);
        }
    }

    const onSearch = (value: string) => {
        if(!value) return setFilter(data);
        setFilter(data.filter(e => e.name.toLowerCase().includes(value.toLowerCase())));
    }

    const DraggableBodyRow = (props: any) => {

        if (props?.record?.update) {
            return <tr {...props} style={{ background: "#FAD24A" }} />;
        }

        return <tr {...props} />;
    };

    return (
        <>
            <ListLayout 
                draggableBodyRow={DraggableBodyRow} 
                linkTo={"/modules/new"}
                dataSource={filter}
                loading={loading}
                colunas={colunas}
                onSearch={onSearch}
            />
        </>
    )
}

export default ListModules;

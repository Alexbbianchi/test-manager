import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom';
import { ProductApi } from '../../api/ProductApi';
import { ColumnsType } from 'antd/lib/table';
import { message } from 'antd';

import {
    EditOutlined
} from '@ant-design/icons';

import "./list-products.css"
import { ListProductsResult } from '../../models/Product';
import ListLayout from '../../../../components/list-layout/ListLayout';

const ListProducts: React.FC = () => {

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<ListProductsResult[]>([]);
    const [filter, setFilter] = useState<ListProductsResult[]>([]);

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
        },
        {
            title: 'Ações',
            key: 'cancelate',
            align: 'center',
            width: '10%',
            render: (value, record) => (
                <Link to={`/products/edit/${record.id}`} >
                    <EditOutlined twoToneColor="#eb2f96" />
                </Link>
            )
        }
    ] as ColumnsType<ListProductsResult>, []);

    useEffect(() => {
        onListProduct();
    }, []);
    
    useEffect(() => {
        setFilter(data);
    }, [data]);

    async function onListProduct() {
        setLoading(true)
        try {
            let result = await ProductApi.listAll();
            setData(result ?? []);
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
                linkTo={"/products/new"}
                dataSource={filter}
                loading={loading}
                colunas={colunas}
                onSearch={onSearch}
            />
        </>
    )
}

export default ListProducts;

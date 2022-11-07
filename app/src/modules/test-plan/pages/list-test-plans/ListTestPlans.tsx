import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom';
import { TestPlanApi } from '../../api/TestPlanApi';
import { ColumnsType } from 'antd/lib/table';
import { message } from 'antd';
import { ListTestPlansResult } from '../../models/TestPlan';
import ListLayout from '../../../../components/list-layout/ListLayout';
import { EditOutlined } from '@ant-design/icons';
import "./list-test-plans.css"

const ListTestPlans: React.FC = () => {

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<ListTestPlansResult[]>([]);
    const [filter, setFilter] = useState<ListTestPlansResult[]>([]);

    const colunas = useMemo(() => [
        {
            title: 'Nome',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name > b.name,
        },
        {
            title: 'Produto',
            dataIndex: 'product',
            key: 'product',
            render: product => product.name
        },
        {
            title: 'Versão',
            dataIndex: 'version',
            key: 'version',
            render: version => version.value
        },
        {
            title: 'Ações',
            key: 'cancelate',
            align: 'center',
            width: '10%',
            render: (value, record) => (
                <Link to={`/test-plans/edit/${record.id}`} >
                    <EditOutlined twoToneColor="#eb2f96" />
                </Link>
            )
        }
    ] as ColumnsType<ListTestPlansResult>, []);

    useEffect(() => {
        onListTestPlan();
    }, []);
    
    useEffect(() => {
        setFilter(data);
    }, [data]);

    async function onListTestPlan() {
        setLoading(true)
        try {
            let result = await TestPlanApi.listAll();
            setData(result);
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
                linkTo={"/test-plans/new"}
                dataSource={filter}
                loading={loading}
                colunas={colunas}
                onSearch={onSearch}
            />
        </>
    )
}

export default ListTestPlans;

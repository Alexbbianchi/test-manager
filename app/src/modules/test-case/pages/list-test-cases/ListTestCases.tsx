import React, { useEffect, useMemo, useState } from 'react'
import { message } from 'antd';
import { Link } from 'react-router-dom';
import { ColumnsType } from 'antd/lib/table';
import { EditOutlined } from '@ant-design/icons';
import { TestCaseApi } from '../../api/TestCaseApi';
import ListLayout from '../../../../components/list-layout/ListLayout';
import { ListTestCasesResult, PriorityType, StatusType } from '../../models/TestCase';
import StatusTestCase from '../../../../components/status-test-case/StatusTestCase';
import PriorityTestCase from '../../../../components/priority-test-case/PriorityTestCase';
import "./list-test-case.css"

const ListTestCases: React.FC = () => {

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<ListTestCasesResult[]>([]);
    const [filter, setFilter] = useState<ListTestCasesResult[]>([]);

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
            render: product => product ? product.name : "-"
        },
        {
            title: 'Módulo',
            dataIndex: 'module',
            key: 'module',
            render: module => module ? module.name : "-"
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            filters: [
                {
                  text: 'Confirmado',
                  value: StatusType.CONFIRMED,
                },
                {
                  text: 'Desativado',
                  value: StatusType.DISABLED,
                },
                {
                  text: 'Precisa atualizar',
                  value: StatusType.NEED_TO_UPDATE,
                },
                {
                  text: 'Proposta',
                  value: StatusType.PROPOSAL,
                },
            ],
            onFilter: (value, record) => record.status === value,
            render: (status: StatusType) => <StatusTestCase status={status} />
        },
        {
            title: 'Prioridade',
            dataIndex: 'priority',
            key: 'priority',
            filters: [
                {
                  text: 'Urgente',
                  value: PriorityType.URGENT,
                },
                {
                  text: 'Alta',
                  value: PriorityType.HIGH,
                },
                {
                  text: 'Média',
                  value: PriorityType.AVERAGE,
                },
                {
                  text: 'Baixa',
                  value: PriorityType.LOW,
                },
            ],
            onFilter: (value, record) => record.priority === value,
            render: (priority: PriorityType) => <PriorityTestCase priority={priority} />
        },
        {
            title: 'Ações',
            key: 'cancelate',
            align: 'center',
            width: '10%',
            render: (value, record) => (
                <Link to={`/test-cases/edit/${record.id}`} >
                    <EditOutlined twoToneColor="#eb2f96" />
                </Link>
            )
        }
    ] as ColumnsType<ListTestCasesResult>, []);

    useEffect(() => {
        onListTestCase();
    }, []);
    
    useEffect(() => {
        setFilter(data);
    }, [data]);

    async function onListTestCase() {
        setLoading(true)
        try {
            let result = await TestCaseApi.listAll();
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
                linkTo={"/test-cases/new"}
                dataSource={filter}
                loading={loading}
                colunas={colunas}
                onSearch={onSearch}
            />
        </>
    )
}

export default ListTestCases;

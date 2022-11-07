import React, { useEffect, useMemo, useState } from 'react'
import { Dropdown, Menu, message } from 'antd';
import { Link } from 'react-router-dom';
import { ColumnsType } from 'antd/lib/table';
import { DownOutlined } from '@ant-design/icons';
import ListLayout from '../../../../components/list-layout/ListLayout';
import { ListTestExecutionsResult} from '../../models/TestExecution';
import "./list-test-executions.css";
import FormatDateServices from '../../../../services/Utils/FormatDate/FormatDateServices';
import { TestExecutionApi } from '../../api/TestExecutionApi';
import { useAuth } from '../../../../context/AuthProvider/useAuth';

const ListTestExecutions: React.FC = () => {

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<ListTestExecutionsResult[]>([]);
    const [filter, setFilter] = useState<ListTestExecutionsResult[]>([]);
    const auth = useAuth();

    const menu = (record: ListTestExecutionsResult) => (
        <Menu style={{width: '120px', textAlign: 'center'}} >
            <Menu.Item key="0">
                <Link to={`/test-executions/edit/${record.id}`} >
                    Editar
                </Link>
            </Menu.Item>
            {auth.id == record.userId && <Menu.Item key="1">
                <Link to={`/test-executions/execution/${record.id}`} >
                    Executar
                </Link>
            </Menu.Item>}
        </Menu>
    );

    const colunas = useMemo(() => [
        {
            title: 'Nome',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name > b.name,
        },
        {
            title: 'Produto',
            dataIndex: 'productName',
            key: 'productName',
        },
        {
            title: 'Técnico',
            dataIndex: 'technicianName',
            key: 'technicianName',
        },
        {
            title: 'Plano de teste',
            dataIndex: 'testPlanName',
            key: 'testPlanName',
        },
        {
            title: 'Prazo estimado',
            dataIndex: 'estimated',
            key: 'estimated',
            render: (value, record) => (
                `${FormatDateServices.formatDate(record.estimatedStartDate)} à ${FormatDateServices.formatDate(record.estimatedEndDate)}`
            )
        },
        {
            title: 'Ações',
            key: 'cancelate',
            align: 'center',
            width: '10%',
            render: (value, record) => (
                <Dropdown overlay={menu(record)} trigger={['click']} >
                    <span style={{color: '#40a9ff', cursor: 'pointer'}}> Ações <DownOutlined /></span>
                </Dropdown>
            )
        }
    ] as ColumnsType<ListTestExecutionsResult>, []);

    useEffect(() => {
        onListTestExecution();
    }, []);
    
    useEffect(() => {
        setFilter(data);
    }, [data]);

    async function onListTestExecution() {
        setLoading(true)
        try {
            let result = await TestExecutionApi.listAll();
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
                linkTo={"/test-executions/new"}
                dataSource={filter}
                loading={loading}
                colunas={colunas}
                onSearch={onSearch}
            />
        </>
    )
}

export default ListTestExecutions;

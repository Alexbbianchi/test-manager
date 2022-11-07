import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom';
import { UserApi } from '../../api/UserApi';
import { ColumnsType } from 'antd/lib/table';
import { Badge, message } from 'antd';
import { ListUsersResult, UserPermission, UserStatus } from '../../models/User';
import ListLayout from '../../../../components/list-layout/ListLayout';
import { useAuth } from '../../../../context/AuthProvider/useAuth';
import { EditOutlined } from '@ant-design/icons';

import "./list-users.css"

const ListUsers: React.FC = () => {

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<ListUsersResult[]>([]);
    const [filter, setFilter] = useState<ListUsersResult[]>([]);

    const auth = useAuth();

    const colunas = useMemo(() => [
        {
            title: 'Nome',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name > b.name,
        },
        {
            title: 'Nome de usuário',
            dataIndex: 'username',
            key: 'username',
            sorter: (a, b) => a.username > b.username,
        },
        {
            title: 'E-mail',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Permissão',
            dataIndex: 'permission',
            key: 'permission',
            render: value => {
                if (value === UserPermission.ADMIN) return 'Administrador';
                if (value === UserPermission.TECHNICIAN) return 'Técnico';
                return 'Visitante'; 
            }
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: value => <Badge color={value === UserStatus.ACTIVE ? "green" : "red"} />
        },
        {
            title: 'Ações',
            key: 'cancelate',
            align: 'center',
            width: '10%',
            render: (value, record) => (
                <Link to={`/users/edit/${record.id}`} hidden={auth.permission === UserPermission.TECHNICIAN && auth.id != record.id}>
                    <EditOutlined twoToneColor="#eb2f96" />
                </Link>
            )
        }
    ] as ColumnsType<ListUsersResult>, []);

    useEffect(() => {
        onListUser();
    }, []);
    
    useEffect(() => {
        setFilter(data);
    }, [data]);

    async function onListUser() {
        setLoading(true)
        try {
            let result = await UserApi.listAll();
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
                linkTo={"/users/new"}
                dataSource={filter}
                loading={loading}
                colunas={colunas}
                onSearch={onSearch}
                hiddenNewBtn={auth.permission === UserPermission.TECHNICIAN}
            />
        </>
    )
}

export default ListUsers;

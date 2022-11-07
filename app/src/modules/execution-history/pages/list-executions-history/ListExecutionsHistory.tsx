import React, { useEffect, useMemo, useState } from "react";
import { ColumnsType } from "antd/lib/table";
import { ExecutionResult, ListExecutionsHistoryResult } from "../../models/ExecutionHistory";
import { Link } from "react-router-dom";
import { message, Tag } from "antd";
import ListLayout from "../../../../components/list-layout/ListLayout";
import FormatDateServices from "../../../../services/Utils/FormatDate/FormatDateServices";
import { ExecutionHistoryApi } from "../../api/ExecutionHistoryApi";
import { ExecutionStatus } from "../../../test-execution/models/ExecutionRecord";

const ListExecutionsHistory: React.FC = () => {

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<ListExecutionsHistoryResult[]>([]);
    const [filter, setFilter] = useState<ListExecutionsHistoryResult[]>([]);

    const colunas = useMemo(() => [
        {
            title: 'Nome da execução',
            dataIndex: 'testExecutionName',
            key: 'testExecutionName',
            sorter: (a, b) => a.testExecutionName > b.testExecutionName,
        },
        {
            title: 'Produto',
            dataIndex: 'productName',
            key: 'productName',
        },
        {
            title: 'Data de início',
            dataIndex: 'startDate',
            key: 'startDate',
            render: value => (
                FormatDateServices.formatDateTime(value)
            )
        },
        {
            title: 'Data finalizada',
            dataIndex: 'endDate',
            key: 'endDate',
            sorter: (a, b) => a.endDate > b.endDate,
            render: value=> (
                FormatDateServices.formatDateTime(value)
            )
        },
        {
            title: 'Versão da execução',
            dataIndex: 'executionVersion',
            key: 'executionVersion',
        },
        {
            title: 'Resultado da execução',
            dataIndex: 'result',
            key: 'result',
            render: value => {
                if(value === ExecutionResult.OK)
                    return <Tag color="success">Aprovado</Tag>
                return <Tag color="error">Reprovado</Tag>
            }
        },
        {
            title: 'Ações',
            key: 'cancelate',
            align: 'center',
            width: '10%',
            render: (value, record) => (
                <Link to={`/execution-history/view/${record.id}`} >
                    Visualizar
                </Link>
            )
        }
    ] as ColumnsType<ListExecutionsHistoryResult>, []);

    useEffect(() => {
        onListTestExecution();
    }, []);
    
    useEffect(() => {
        setFilter(data);
    }, [data]);

    async function onListTestExecution() {
        setLoading(true)
        try {
            let result = await ExecutionHistoryApi.findAllExecutions("FINISHED");
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
        setFilter(data.filter(e => e.testExecutionName.toLowerCase().includes(value.toLowerCase())));
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
                hiddenNewBtn={true}
            />
        </>
    )
}

export default ListExecutionsHistory;
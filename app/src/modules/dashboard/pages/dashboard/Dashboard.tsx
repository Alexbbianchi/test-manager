import React, { useEffect, useMemo, useState } from "react";
import { Button, Card, Col, message, Progress, Row, Tabs } from "antd";
import Table, { ColumnsType } from "antd/lib/table";
import Title from "antd/lib/typography/Title";
import BrowserHistory from "../../../../routes/BrowserHistory";
import FormatDateServices from "../../../../services/Utils/FormatDate/FormatDateServices";
import { ExecutionHistoryApi } from "../../../execution-history/api/ExecutionHistoryApi";
import { ExecutionResult, ListExecutionsHistoryResult } from "../../../execution-history/models/ExecutionHistory";
import "./dashboard.css"
import { useAuth } from "../../../../context/AuthProvider/useAuth";

const Dashboard: React.FC = () => {

    const [loading, setLoading] = useState(false);
    const [dataInProgress, setDataInProgress] = useState<ListExecutionsHistoryResult[]>([]);
    const [dataFinished, setDataFinished] = useState<ListExecutionsHistoryResult[]>([]);

    const [ok, setOk] = useState<number>(0);
    const [failed, setFailed] = useState<number>(0);
    const auth = useAuth();
    
    const colunas = useMemo(() => [
        {
            title: 'Em execução',
            dataIndex: 'testExecutionName',
            key: 'testExecutionName',
            render: (value, record) => (
                <>
                    <p style={{fontWeight: 'bold'}}>{value}</p>
                    <span>Execução iniciada em: {FormatDateServices.formatDateTime(record.startDate)}</span>
                </>
            )
        },
        {
            title: 'Progresso',
            key: 'progress',
            align: 'center',
            render: (value, record) => (
                <Progress size="small" status="active" 
                    percent={
                        helperCalcPorcent(record.executionTestCases.filter(e => e.result != null).length, record.executionTestCases.length)
                    } 
                />
            )
        },
        {
            title: 'Ações',
            key: 'cancelate',
            align: 'center',
            width: '10%',
            render: (value, record) => (
                <Button type="primary" onClick={() => BrowserHistory.push(`/test-executions/execution/${record.testExecutionId}`)} >
                    Continuar
                </Button>
            )
        }
    ] as ColumnsType<ListExecutionsHistoryResult>, []);

    useEffect(() => {
        onListExecutionInProgress();
        onListExecutionFinished();
    }, []);
    
    useEffect(() => {
        if (!dataFinished) return message.info("Sem dados para serem exibidos");

        let finishedTotal = dataFinished.length;
        let finishedOk = helperCalcPorcent(dataFinished.filter(e => e.result === ExecutionResult.OK).length, finishedTotal);
        let finishedFailed = helperCalcPorcent(dataFinished.filter(e => e.result !== ExecutionResult.OK).length, finishedTotal);
        setOk(finishedOk);
        setFailed(finishedFailed);
        
    }, [dataFinished]);

    const helperCalcPorcent = (value: number, total: number) => {
        return +((value / total) * 100).toFixed(2);
    }

    async function onListExecutionInProgress() {
        setLoading(true)
        try {
            let result = await ExecutionHistoryApi.findAllExecutions("IN_PROGRESS");
            const filterResultByUserId = result.filter(e => e.userId == auth.id);
            setDataInProgress(filterResultByUserId);
        }
        catch (e) {
            console.warn("Erro", JSON.stringify(e));
        }
        finally {
            setLoading(false);
        }
    }
    
    async function onListExecutionFinished() {
        setLoading(true)
        try {
            let result = await ExecutionHistoryApi.findAllExecutions("FINISHED");
            setDataFinished(result);
        }
        catch (e) {
            console.warn("Erro", JSON.stringify(e));
        }
        finally {
            setLoading(false);
        }
    }

    const DraggableBodyRow = (props: any) => {

        if (props?.record?.update) {
            return <tr {...props} style={{ background: "#FAD24A" }} />;
        }

        return <tr {...props} />;
    };
    
    return (
        <>
            <Card 
                id="dashboard"
                title="Dashboard" 
                bordered={true} 
            >
                <Tabs defaultActiveKey="1">
                    <Tabs.TabPane tab="Geral" key="1">
                
                        <Row>
                            <Col span={12} >
                                <Table rowKey="id" 
                                    columns={colunas} 
                                    dataSource={dataInProgress} 
                                    size="middle"
                                    pagination={false}
                                    components={{
                                        body: {
                                            row: DraggableBodyRow,
                                        },
                                    }}
                                    loading={loading}
                                />
                            </Col>

                            <Col span={12} style={{borderLeft: '1px solid #dadada'}}>
                                <Row style={{justifyContent: 'space-around', display: 'flex'}}>

                                    <Col style={{textAlign: 'center'}} > 
                                        <Progress type="circle" percent={100} format={() => dataFinished.length} status="active" />
                                        <Title level={5}>Execuções Finalizadas</Title>
                                    </Col>

                                    <Col style={{textAlign: 'center'}} > 
                                        <Progress type="circle" percent={ok} status="success" format={() => `${ok}%`} />
                                        <Title level={5}>Execuções Aprovadas</Title>
                                    </Col>

                                    <Col style={{textAlign: 'center'}} > 
                                        <Progress type="circle" percent={failed} status="exception" format={() => `${failed}%`} />
                                        <Title level={5}>Execuções Reprovadas</Title>
                                    </Col>

                                </Row>
                            </Col>
                        </Row>

                    </Tabs.TabPane> 
                </Tabs>
            </Card>
        </>
    )
}
export default Dashboard;
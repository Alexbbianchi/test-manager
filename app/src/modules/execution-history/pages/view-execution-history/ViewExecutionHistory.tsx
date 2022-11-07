import React, { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Card, Col, Collapse, Modal, Progress, Radio, Row, Tag, Typography } from 'antd';
import DetailText from '../../../../components/detail-text/DetailText';
import TextEditor from '../../../../components/form/text-editor/TextEditor';
import { Input } from '../../../../components/form/form-fields/FormFields';
import RadioGroup from '../../../../components/form/radio-group/RadioGroup';
import { RightOutlined, DownOutlined } from '@ant-design/icons/lib/icons';
import { ItensButtons } from '../../../../components/form/text-editor/TextEditor.types';
import PriorityTestCase from '../../../../components/priority-test-case/PriorityTestCase';
import StatusTestCase from '../../../../components/status-test-case/StatusTestCase';
import { ExecutionHistoryApi } from '../../api/ExecutionHistoryApi';
import { DetailExecutionRecordResult, DetailExecutionTestCaseResult, ExecutionResult } from '../../models/ExecutionHistory';
import { ExecutionRecordTestCase } from '../../../test-execution/models/ExecutionRecord';
import ExecutionResultInfo from '../../../test-execution/components/execution-result-icon/ExecutionResult';
import CustomForm from '../../../../components/form/form/Form';
import './view-execution-history.css';

const { Text, Title } = Typography;

interface StatusProgress {
    ok: number,
    failed: number,
    error: number,
    blocked: number,
    approved: number,
    disapproved: number
}

const ViewExecutionHistory: React.FC = () => {

    const { executionId } = useParams<{ executionId: string }>()
    const form  = useForm<DetailExecutionRecordResult>();
    const { goBack } = useHistory();
    const [loading, setLoading] = useState(false);
    const [toggle, setToggle] = useState<boolean[]>([]);
    const [progress, setProgress] = useState<StatusProgress>({approved: 0, blocked: 0, disapproved: 0, error: 0, failed: 0, ok: 0});

    const { fields } = useFieldArray<DetailExecutionTestCaseResult>({
        control: form.control,
        name: "executionTestCases",
    });

    useEffect(() => {
        if (executionId) {
            setLoading(true);
            ExecutionHistoryApi.findExecutionById(executionId)
                .then(data => {
                    form.reset(data);
                })
                .catch(e => console.log(JSON.stringify(e)))
                .finally(() => setLoading(false)
            );
        }
    }, []);
    
    useEffect(() => {
        handleCountResult();
    }, [form.watch('id')]);
    
    const getValueFromQuestionnaire: ExecutionRecordTestCase | any = (index: number, item?: string) => {
        if (item) return form.watch(`executionTestCases[${index}].${item}`);
        return form.watch(`executionTestCases[${index}]`);
    }

    const ResultInfoStatus = () => {
        return (
            <>
                <Text style={{marginRight: '10px', fontSize: '18px'}} strong> Resultado: </Text> 
                {form.watch("result") === ExecutionResult.OK ? 
                    <Tag color="#52c41a">Aprovado</Tag> : <Tag color="#ff4d4f">Reprovado</Tag>}
                <br/><br/>
            </>
        )
    }

    const handleCountResult = () => {
        const _helperCalcPorcent = (value: number, total: number) => {
            return +((value / total) * 100).toFixed(2);
        }

        let total = form.watch('executionTestCases').length;
        let ok = form.watch('executionTestCases').filter(e => e.result === ExecutionResult.OK).length;
        let failed = form.watch('executionTestCases').filter(e => e.result === ExecutionResult.FAILED).length;
        let error = form.watch('executionTestCases').filter(e => e.result === ExecutionResult.ERROR).length;
        let blocked = form.watch('executionTestCases').filter(e => e.result === ExecutionResult.BLOCKED).length;

        let approved = _helperCalcPorcent(ok, total);
        let disapproved = _helperCalcPorcent((failed + error+ blocked), total);

        setProgress({
            ...progress,
            ok,
            failed,
            error,
            blocked,
            approved,
            disapproved
        });
    }

    return (
        <>
            <Modal className="view-execution-history-layout"
                title={`TE-${executionId}: ${form.watch('testExecutionName')}`}  
                visible 
                centered 
                cancelText="VOLTAR"
                onCancel={goBack} 
                width="90%" 
                footer={[
                        <Button key="back" onClick={goBack}>
                        VOLTAR
                        </Button>
                    ]}
                >
                <CustomForm provider={form} loading={loading} >

                    <Row className="execution-details-style" >
                        <Col className="execution-card-style">
                            <Card>
                                
                                <ResultInfoStatus />

                                <Input hidden label="id" name="id" />

                                <Input hidden label="Execução do teste Id" name="executionId" />
                                
                                <Input hidden label="Status da execução" name="status" />
                                
                                <DetailText label="Plano de teste:" name="testPlanName" />

                                <DetailText label="Produto:" name="productName" />
                                
                                <DetailText label="Produto versão:" name="productVersion" />

                                <DetailText label="Versão executada:" name="executionVersion" />

                                <DetailText datetime label="Estimativa de início:" name="estimatedStartDate" />

                                <DetailText date label="Data iníciada:" name="startDate" />

                                <DetailText datetime label="Estimativa de término:" name="estimatedEndDate" />

                                <DetailText date label="Data finalizada:" name="endDate" />

                                <Collapse accordion className="description-collapse" >
                                    <Collapse.Panel header="Descrição do plano de teste" style={{color: 'white', padding: '0px'}} key="1">

                                        <TextEditor clearBorder
                                            name="testPlanDescrition" 
                                            itensButtons={ItensButtons.EMPTY}
                                            personConfig={{readonly: true, theme: true}} 
                                        />

                                    </Collapse.Panel>
                                </Collapse>

                            </Card>
                        </Col>
                        
                        <Col className="execution-card-style">
                            <Card>

                                <Row>
                                    <Col span={6}>
                                        <Text style={{marginRight: '10px', fontSize: '16px'}} strong>Aprovado: </Text> {progress.ok}<br/>
                                        <Text style={{marginRight: '10px', fontSize: '16px'}} strong>Falha: </Text> {progress.failed}<br/>
                                        <Text style={{marginRight: '10px', fontSize: '16px'}} strong>Erro: </Text> {progress.error}<br/>
                                        <Text style={{marginRight: '10px', fontSize: '16px'}} strong>Bloqueado: </Text> {progress.blocked}<br/>
                                        <Text style={{marginRight: '10px', fontSize: '16px'}} strong>Total: </Text> {fields.length}<br/>
                                    </Col>
                                    <Col span={18}>

                                        <Row style={{justifyContent: 'space-around', display: 'flex'}}>

                                            <Col style={{textAlign: 'center'}}> 
                                                <Progress type="circle" percent={100} format={() => fields.length} status="active" />
                                                <Title level={5}>Total</Title>
                                            </Col>

                                            <Col style={{textAlign: 'center'}} > 
                                                <Progress type="circle" percent={progress.approved} status="success" format={() => `${progress.approved}%`} />
                                                <Title level={5}>Aprovadas</Title>
                                            </Col>

                                            <Col style={{textAlign: 'center'}}> 
                                                <Progress type="circle" percent={progress.disapproved} status="exception" format={() => `${progress.disapproved}%`} />
                                                <Title level={5}>Reprovadas</Title>
                                            </Col>

                                        </Row>

                                    </Col>
                                </Row>
                               
                            </Card>
                        </Col>

                    </Row>
                    
                    {fields.map((question, questionIndex) => (
                        <div key={questionIndex}>
                            <Button className="execution-collapse-toggle" 
                                type="primary"
                                onClick={() => {
                                    toggle[questionIndex] = !toggle[questionIndex];
                                    setToggle({...toggle}) 
                                }}>
                                <Row>

                                    <Col span={12}>
                                        {toggle[questionIndex] ? <DownOutlined className="margin-icons" /> : <RightOutlined className="margin-icons" />}
                                        TC-{question.testCaseId}: {question.testCaseName}
                                    </Col>

                                    <Col span={4}>
                                        <PriorityTestCase style={{color: 'white'}} priority={getValueFromQuestionnaire(questionIndex, 'testCasePriority')} />
                                    </Col>
                                    
                                    <Col span={4}>
                                        <StatusTestCase style={{color: 'white'}} status={getValueFromQuestionnaire(questionIndex, 'testCaseStatus')} />
                                    </Col>

                                    <Col span={4}>
                                        <ExecutionResultInfo style={{color: 'white'}} result={getValueFromQuestionnaire(questionIndex, 'result')} />
                                    </Col>

                                </Row>
                            </Button>
                        
                            <Card className="execution-card-style" hidden={!toggle[questionIndex]} key={questionIndex} >

                                <Input hidden value={question.id}
                                    label="Id" name={`executionTestCases[${questionIndex}].id`} />
                                <Input hidden value={question.testCaseId}
                                    label="Teste case id" name={`executionTestCases[${questionIndex}].testCaseId`} />
                                <Input hidden value={question.executionId}
                                    label="Execução id" name={`executionTestCases[${questionIndex}].executionId`} />

                                <Row>
                                    <Col span={12}>
                                        <TextEditor 
                                            label="Descrição do caso de teste"
                                            name={`executionTestCases[${questionIndex}].testCaseDescription`} 
                                            itensButtons={ItensButtons.EMPTY}
                                            personConfig={{readonly: true, theme: true}} />
                                    </Col>
                                    
                                    <Col span={12} >
                                        <TextEditor
                                            label="Documento" personConfig={{readonly: true, theme: true}}
                                            name={`executionTestCases[${questionIndex}].document`}
                                            itensButtons={ItensButtons.SIMPLE}
                                        />
                                    </Col>
                                </Row>
                                
                                <div className="execution-test-case-result-group">
                                    <RadioGroup name={`executionTestCases[${questionIndex}].result`} disabled={true}>
                                        <Radio.Button key={ExecutionResult.OK} value={ExecutionResult.OK}>
                                            Aprovado
                                        </Radio.Button>
                                        <Radio.Button key={ExecutionResult.FAILED} value={ExecutionResult.FAILED}>
                                            Falha
                                        </Radio.Button>
                                        <Radio.Button key={ExecutionResult.ERROR} value={ExecutionResult.ERROR}>
                                            Erro
                                        </Radio.Button>
                                        <Radio.Button key={ExecutionResult.BLOCKED} value={ExecutionResult.BLOCKED}>
                                            Bloqueado
                                        </Radio.Button>
                                    </RadioGroup>
                        
                                </div>
                            </Card>
                        </div>
                    ))}
                </CustomForm>
            </Modal>
        </>
    );
}

export default ViewExecutionHistory;
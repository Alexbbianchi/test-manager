import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Card, Col, message, Row, Select as SelectAntd, Tabs } from 'antd';
import { SettingOutlined, ReconciliationOutlined } from '@ant-design/icons/lib/icons';

import TestExecutionSchema from './TestExecutionSchema';
import { TestExecution } from '../../models/TestExecution';
import { TestExecutionApi } from '../../api/TestExecutionApi';
import CustomForm from '../../../../components/form/form/Form';
import { FormCreateTestExecutionParm } from './FormCreateTestExecution.types';
import { ListProductsResult } from '../../../product/models/Product';
import FormLayout from '../../../../components/form-layout/FormLayout';
import { DatePicker, Input, Select } from '../../../../components/form/form-fields/FormFields';
import { ListTestPlansResult } from '../../../test-plan/models/TestPlan';
import { ListTestCasesResult, StatusType } from '../../../test-case/models/TestCase';
import SideTransfer from '../../../../components/form/side-transfer/SideTransfer';
import { TestPlanApi } from '../../../test-plan/api/TestPlanApi';
import { TestCaseApi } from '../../../test-case/api/TestCaseApi';
import { ProductApi } from '../../../product/api/ProductApi';
import { ListUsersResult, UserPermission } from '../../../user/models/User';
import { UserApi } from '../../../user/api/UserApi';

import "./form-test-execution.css"
import { useAuth } from '../../../../context/AuthProvider/useAuth';

const { Option } = SelectAntd;

const FormTestExecution: React.FC = () => {

    const { testExecutionId } = useParams<FormCreateTestExecutionParm>();
    const form = useForm({ resolver: TestExecutionSchema, defaultValues: {testCases: []} });

    const [users, setUsers] = useState<ListUsersResult[]>([]);
    const [products, setProducts] = useState<ListProductsResult[]>([]);
    const [testCases, setTestCases] = useState<ListTestCasesResult[]>([]);
    const [testPlans, setTestPlans] = useState<ListTestPlansResult[]>([]);

    const [loading, setLoading] = useState(false);
    const watchProductId = form.watch("productId");
    const [oldProducts, setOldProducts] = useState<string>();

    const [generalBTN, setGeneralBTN] = useState<boolean>(true);
    const [testCaseBTN, setTestCaseBTN] = useState<boolean>(false);

    const auth = useAuth();
    const { goBack } = useHistory();

    useEffect(() => {
        if (testExecutionId) {
            setLoading(true);
            TestExecutionApi.getTestExecution(testExecutionId)
                .then(data => {
                    form.reset(data);
                })
                .finally(() => setLoading(false)
            );
        }

        ProductApi.listAll()
            .then(list => setProducts(list))
            .catch(() => setProducts([]));

        UserApi.listAll()
            .then(list =>  setUsers(list.filter(e => e.permission !== UserPermission.VISITOR)))
            .catch(() => setUsers([]));;

    }, []);
   
    useEffect(() => {
        if(!watchProductId) return;
        
        if (!!oldProducts && watchProductId != oldProducts) {
            form.setValue("testPlanId", "");
        }

        setOldProducts(watchProductId);

        TestCaseApi.listAll()
            .then(list => setTestCases(list.filter(e => e.status === StatusType.CONFIRMED)))
            .catch(() => setTestCases([]));

        TestPlanApi.findAllTestPlansByProductId(watchProductId)
            .then(list => setTestPlans(list))
            .catch(() => setTestPlans([]));
        
    }, [watchProductId]);

    const handlePage = (general: boolean, testCase: boolean) => {
        setGeneralBTN(general);
        setTestCaseBTN(testCase);
    }

    async function onSubmit(value: TestExecution) {
        setLoading(true);

        try {
            if (testExecutionId) {
                await TestExecutionApi.update({ ...value, id: testExecutionId });
                message.success(`Execução de teste atualizada com sucesso!`);
                goBack();
            } else {
                const result = await TestExecutionApi.create(value);
                goBack();
                message.success(`Execução de teste cadastrado com sucesso! Execução de teste: ${result.name}`);
            }
        }
        catch (e) {
            console.warn("Erro", JSON.stringify(e));
        }
        finally {
            setLoading(false);
        }
    }
      
    return (
        <>
            <CustomForm provider={form} loading={loading} handleSubmit={onSubmit} >
                <FormLayout title={testExecutionId ? "Edição de execução de teste" : "Cadastro de execução de teste"} backPage={goBack}>
                    
                    <Button type="link" style={!generalBTN ? {color: 'black', borderBottom: '1px'} : {}} 
                        onClick={() => handlePage(true, false)}>Geral</Button>

                    <Button type="link" style={!testCaseBTN ? {color: 'black', borderBottom: '1px'} : {}} disabled={!watchProductId}
                        onClick={() => handlePage(false, true)}>Caso de teste</Button>

                    <Card hidden={!generalBTN}>

                        <Row>
                            <Col span={24} >
                                <Input label="Nome" name="name" required />
                            </Col>
                        </Row>
                            
                        <Row>
                            <Col span={12} >
                                <Select label="Usuário" name="userId" required >
                                    {users.map(e => <Option key={e.id} value={e.id}>{e.name}</Option>)}
                                </Select>
                            </Col>

                            <Col span={12} >
                                <Select label="Produto" disabled={!!testExecutionId && auth.permission != UserPermission.ADMIN} name="productId" required >
                                    {products.map(e => <Option key={e.id} value={e.id}>{e.name}</Option>)}
                                </Select>
                            </Col>
                        </Row>
                    
                        <Row>
                            <Col span={24} >
                                <Select label="Plano de teste" disabled={!watchProductId || (!!testExecutionId && auth.permission != UserPermission.ADMIN)} name="testPlanId" required >
                                    {testPlans.map(e => <Option key={e.id} value={e.id}>{e.name}</Option>)}
                                </Select>
                            </Col>
                        </Row>
                            
                        <Row>

                            <Col span={12} >
                                <DatePicker 
                                    label="Início estimado em" 
                                    name="estimatedStartDate" 
                                    format="DD/MM/yyyy"                                    
                                    required 
                                />
                            </Col>
                            
                            <Col span={12} >
                                <DatePicker 
                                    label="Término estimado em" 
                                    name="estimatedEndDate" 
                                    format="DD/MM/yyyy"
                                    required 
                                />
                            </Col>
                        </Row>

                        <Row>
                            <Col span={24} >
                                <Input label="Notas" name="notes" />
                            </Col>
                        </Row>

                    </Card>

                    <Card hidden={!testCaseBTN} >

                        <SideTransfer disabled={!!testExecutionId && auth.permission != UserPermission.ADMIN}
                            label="Casos de teste"
                            name="testCases"
                            dataSource={testCases}   
                            renderItem={e => e.name}
                            rowKey={e => e.id}
                            showSearch
                            pagination
                            required
                        />
                    </Card> 

                </FormLayout>
            </CustomForm>
        </>
    );
}

export default FormTestExecution;
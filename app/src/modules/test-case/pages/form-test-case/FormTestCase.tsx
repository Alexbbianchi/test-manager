import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Card, Col, Divider, message, Row, Select as SelectAntd, Tabs } from 'antd';
import { SettingOutlined, FontSizeOutlined } from '@ant-design/icons/lib/icons';

import TestCaseSchema from './TestCaseSchema';
import { PriorityType, StatusType, TestCase } from '../../models/TestCase';
import { TestCaseApi } from '../../api/TestCaseApi';
import { ProductApi } from '../../../product/api/ProductApi';
import CustomForm from '../../../../components/form/form/Form';
import { FormCreateTestCaseParm } from './FormCreateTestCase.types';
import { ListProductsResult } from '../../../product/models/Product';
import FormLayout from '../../../../components/form-layout/FormLayout';
import { ListModulesResult } from '../../../module/models/Module';
import { Input, Select } from '../../../../components/form/form-fields/FormFields';
import "./form-test-case.css"
import TextEditor from '../../../../components/form/text-editor/TextEditor';

const { Option } = SelectAntd;

const FormTestCase: React.FC = () => {

    const defaultValues = {
        testCaseDocument: 
            `
                <p><strong style="font-size: 14px;">Cenário</strong>: ... qual comportamento será testado...</p>
                <p><strong style="font-size: 14px;">Dado</strong> ... condições ...</p>
                <p><strong style="font-size: 14px;">Quando</strong> ... ações ...</p>
                <p><strong style="font-size: 14px;">Então</strong> ... resultados esperados...</p>
            `
    }

    const { testCaseId } = useParams<FormCreateTestCaseParm>();
    const form  = useForm({ resolver: TestCaseSchema, defaultValues });
    const [loading, setLoading] = useState(false);

    const [products, setProducts] = useState<ListProductsResult[]>([])
    const [modules, setModules] = useState<ListModulesResult[]>([])
    const watchProductId = form.watch("productId");

    const [oldProducts, setOldProducts] = useState<string>();

    const [productBTN, setProductBTN] = useState<boolean>(false);
    const [generalBTN, setGeneralBTN] = useState<boolean>(true);
    const [documentBTN, setDocumentBTN] = useState<boolean>(false);
    
    const { goBack } = useHistory();

    useEffect(() => {
        if (testCaseId) {
            setLoading(true);
            TestCaseApi.getTestCase(testCaseId)
                .then(data => {
                    form.reset(data);
                    
                    if (data.productId) {
                        setProductBTN(true);
                    }
                })
                .finally(() => setLoading(false)
            );
        }

        ProductApi.listAll()
            .then(list => setProducts(list))
            .catch(() => setProducts([]));
    }, []);
   
    useEffect(() => {
        if(!watchProductId) return;
        
        if (!!oldProducts && watchProductId != oldProducts) {
            form.setValue("moduleId", "");
        }

        setOldProducts(watchProductId);

        ProductApi.findAllModulesByProductId(watchProductId)
            .then(list => setModules(list))
            .catch(() => setModules([]));
        
    }, [watchProductId]); // na troca do produto

    const handlePage = (general: boolean, document: boolean) => {
        setGeneralBTN(general);
        setDocumentBTN(document);
    }

    async function onSubmit(value: TestCase) {
        setLoading(true);

        try {
            if (testCaseId) {
                await TestCaseApi.update({ ...value, id: testCaseId });
                message.success(`Caso de teste atualizada com sucesso!`);
                goBack();
            } else {
                const result = await TestCaseApi.create(value);
                goBack();
                message.success(`Caso de teste cadastrado com sucesso! Caso de teste: ${result?.name}`);
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
                <FormLayout title={testCaseId ? "Edição de caso de teste" : "Cadastro de caso de teste"} backPage={goBack}>

                    <Button type="link" style={!generalBTN ? {color: 'black', borderBottom: '1px'} : {}} 
                        onClick={() => handlePage(true, false)}>Geral</Button>

                    <Button type="link" style={!documentBTN ? {color: 'black', borderBottom: '1px'} : {}} 
                        onClick={() => handlePage(false, true)}>Documentos</Button>

                    <Card hidden={!generalBTN}>

                        <Row>
                            <Col span={24} >
                                <Input label="Nome" name="name" required />
                            </Col>
                        </Row>

                        <Row>
                            <Col span={12} >
                                <Select label="Status" name="status" required >
                                    <Option key={StatusType.PROPOSAL} value={StatusType.PROPOSAL}>Proposta</Option>
                                    <Option key={StatusType.CONFIRMED} value={StatusType.CONFIRMED}>Confirmado</Option>
                                    <Option key={StatusType.DISABLED} value={StatusType.DISABLED}>Desabilitado</Option>
                                    <Option key={StatusType.NEED_TO_UPDATE} value={StatusType.NEED_TO_UPDATE}>Precisa atualizar</Option>
                                </Select>
                            </Col>

                            <Col span={12}>
                                <Select label="Prioridade" name="priority" required >
                                    <Option key={PriorityType.URGENT} value={PriorityType.URGENT}>Urgente</Option>
                                    <Option key={PriorityType.HIGH} value={PriorityType.HIGH}>Alta</Option>
                                    <Option key={PriorityType.AVERAGE} value={PriorityType.AVERAGE}>Média</Option>
                                    <Option key={PriorityType.LOW} value={PriorityType.LOW}>Baixa</Option>
                                </Select>
                            </Col>
                        </Row>

                        <Button 
                            type="default" 
                            style={{ marginLeft: '8px' }}
                            className="btn-black" 
                            onClick={() => setProductBTN(old => !old)}>
                                Vincular produto
                        </Button>

                        <Card hidden={!productBTN} className="test-case-product-card">
                            <Row>
                                <Col span={24} >
                                    <Select label="Produto" name="productId" >
                                        {products.map(e => 
                                            <Option key={e.id} value={e.id}>{e.name}</Option>
                                        )}
                                    </Select>
                                </Col>
                            </Row>

                            <Row>
                                <Col span={24} >
                                    <Select 
                                        label="Módulo" name="moduleId" 
                                        disabled={!watchProductId } 
                                        required={!!watchProductId} >
                                        {modules.map(e => 
                                            <Option key={e.id} value={e.id}>{e.name}</Option>
                                        )}
                                    </Select>
                                </Col>
                            </Row>
                        </Card>

                    </Card>

                    <Card hidden={!documentBTN}>

                        <Row>
                            <Col span={24} >
                                <TextEditor label="Documento" name="testCaseDocument" required />
                            </Col>
                        </Row>

                        <Row>
                            <Col span={24} >
                                <Input label="Notas" name="notes" />
                            </Col>
                        </Row>
                    </Card>

                </FormLayout>
            </CustomForm>
        </>
    );
}

export default FormTestCase;
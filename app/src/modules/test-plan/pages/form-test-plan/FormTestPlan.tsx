import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { Col, message, Row, Select as SelectAntd } from 'antd';

import TestPlanSchema from './TestPlanSchema';
import { TestPlan } from '../../models/TestPlan';
import { TestPlanApi } from '../../api/TestPlanApi';
import { ProductApi } from '../../../product/api/ProductApi';
import CustomForm from '../../../../components/form/form/Form';
import { FormCreateTestPlanParm } from './FormCreateTestPlan.types';
import { ListVersionsResult } from '../../../product/models/Version';
import { ListProductsResult } from '../../../product/models/Product';
import FormLayout from '../../../../components/form-layout/FormLayout';
import { Input, Select } from '../../../../components/form/form-fields/FormFields';
import "./form-test-plan.css"
import TextEditor from '../../../../components/form/text-editor/TextEditor';

const FormTestPlan: React.FC = () => {

    const defaultValues = {

        documentPlan: 
            `
                <p><strong>Objetivo:</strong></p>
                <ul>
                    <li>Qual objetivo do teste ...</li>
                </ul>
                <p><strong>Para o teste é necessário:</strong></p>
                <ul>
                    <li>O que é necessário para realização do teste ...</li>
                </ul>
            `   
    }

    const { testPlanId } = useParams<FormCreateTestPlanParm>();
    const form  = useForm({ resolver: TestPlanSchema, defaultValues});
    const [products, setProducts] = useState<ListProductsResult[]>([])
    const [versions, setVersions] = useState<ListVersionsResult[]>([])
    const [loading, setLoading] = useState(false);
    const [oldProducts, setOldProducts] = useState<string>();
    const watchProductId = form.watch("productId");
    const { goBack } = useHistory();

    useEffect(() => {
        if (testPlanId) {
            setLoading(true);
            TestPlanApi.getTestPlan(testPlanId)
                .then(data => {
                    form.reset(data);
                })
                .finally(() => setLoading(false)
            );
        }

        ProductApi.listAll()
            .then(list => setProducts(list))
            .catch(() => setProducts([]));
    }, []);
   
    useEffect(() => {

        if(!watchProductId || !products.length) return;
        getVersionsFromProduct();
        
    }, [watchProductId, products]);

    const getVersionsFromProduct = () => {
        let productIndex = products.findIndex(e => e.id == watchProductId);

        if (productIndex < 0) {
            message.error("Produto selecionado não encontrado na lista!");
            return;
        }

        let p_versions = products[productIndex].versions;

        if (!p_versions.length) {
            message.error("Produto não possui versões para selecionar!");
            return;
        }

        if (!!oldProducts && watchProductId != oldProducts) {
            form.setValue("versionId", "");
        }

        setOldProducts(watchProductId);

        setVersions(p_versions as ListVersionsResult[]); // seta os novos valores na lista
    }

    async function onSubmit(value: TestPlan) {
        setLoading(true);

        try {
            if (testPlanId) {
                await TestPlanApi.update({ ...value, id: testPlanId });
                message.success(`Plano de teste atulizado com sucesso!`);
                goBack();
            } else {
                const result = await TestPlanApi.create(value);
                goBack();
                message.success(`Plano de teste cadastrado com sucesso! Plano de teste: ${result.name}`);
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
                <FormLayout title={testPlanId ? "Edição de plano de teste" : "Cadastro de plano de teste"} backPage={goBack}>
                    <Row>
                        <Col span={24} >
                            <Input label="Nome" name="name" required />
                        </Col>
                    </Row>

                    <Row>
                        <Col span={12} >
                            <Select label="Produto" name="productId" required >
                                {products.map(e => 
                                    <SelectAntd.Option key={e.id} value={e.id}>{e.name}</SelectAntd.Option>
                                )}
                            </Select>
                        </Col>
                        <Col span={12} >
                            <Select label="Versão" name="versionId" disabled={!watchProductId } required >
                                {versions.map(e => 
                                    <SelectAntd.Option key={e.id} value={e.id}>{e.value}</SelectAntd.Option>
                                )}
                            </Select>
                        </Col>
                    </Row>
                    
                    <Row>
                        <Col span={24} >
                            <TextEditor label="Documento" name="documentPlan" required />
                        </Col>
                    </Row>

                </FormLayout>
            </CustomForm>
        </>
    );
}

export default FormTestPlan;
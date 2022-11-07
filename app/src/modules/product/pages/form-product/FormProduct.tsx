import React, { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Card, Col, message, Row } from 'antd';
import { 
    DeleteFilled, 
    PlusOutlined
} from '@ant-design/icons/lib/icons';

import ProductSchema from './ProductSchema';
import { Version } from '../../models/Version';
import { Product } from '../../models/Product';
import { ProductApi } from '../../api/ProductApi';
import Form from '../../../../components/form/form/Form';
import { ModuleApi } from '../../../module/api/ModuleApi';
import { FormCreateProductParm } from './FormCreateProduct.types';
import FormLayout from '../../../../components/form-layout/FormLayout';
import { ListModulesResult } from '../../../module/models/Module';
import { Input, InputNumber, TextArea } from '../../../../components/form/form-fields/FormFields';
import "./form-product.css"
import SideTransfer from '../../../../components/form/side-transfer/SideTransfer';
import { ErrorMessage } from '@hookform/error-message';

const FormProduct: React.FC = () => {

    const defaultValues: Product = {
        modules: [],
        name: "",
        versions: [],
        description: "",
    }

    const { productId } = useParams<FormCreateProductParm>();
    const form  = useForm({ resolver: ProductSchema, defaultValues });
    const [modules, setModules] = useState<ListModulesResult[]>([])
    const [loading, setLoading] = useState(false);

    const [generalBTN, setGeneralBTN] = useState<boolean>(true);
    const [moduleBTN, setModuleBTN] = useState<boolean>(false);
    const [versionBTN, setVersionBTN] = useState<boolean>(false);

    const { fields, append, remove } = useFieldArray<Version>({
        control: form.control,
        name: "versions",
        keyName: "key" as "id"
    });
      
    const { goBack } = useHistory();

    useEffect(() => {
        if (productId) {
            setLoading(true);
            ProductApi.getProduct(productId)
                .then(data => {
                    form.reset(data);
                })
                .finally(() => setLoading(false)
            );
        }

        ModuleApi.listAll().then(list => setModules(list ?? []));
    }, []);

    const handlePage = (general: boolean, module: boolean, version: boolean) => {
        setGeneralBTN(general);
        setModuleBTN(module);
        setVersionBTN(version);
    }

    async function onSubmit(value: Product) {
        if(!value.modules?.length) return message.error("Selecione ao menos um módulo");

        setLoading(true);

        try {
            if (productId) {
                await ProductApi.update({ ...value, id: productId });
                message.success(`Produto atualizada com sucesso!`);
                goBack();
            } else {
                const result = await ProductApi.create(value);
                goBack();
                message.success(`Produto cadastrado com sucesso! Produto: ${result?.name}`);
            }
        }
        catch (e) {
            console.warn("Erro", JSON.stringify(e));
        }
        finally {
            setLoading(false);
        }
    }
      
    const appendQuestion = () => {
        append({
            value: 0
        });
    };

    return (
        <>
            <Form provider={form} loading={loading} handleSubmit={onSubmit} >
                <FormLayout title={productId ? "Edição de produto" : "Cadastro de produto"} backPage={goBack} >

                    <Button type="link" style={!generalBTN ? {color: 'black', borderBottom: '1px'} : {}} 
                        onClick={() => handlePage(true, false, false)}>Geral</Button>

                    <Button type="link" style={!moduleBTN ? {color: 'black', borderBottom: '1px'} : {}} 
                        onClick={() => handlePage(false, true, false)}>Módulo</Button>

                    <Button type="link" style={!versionBTN ? {color: 'black', borderBottom: '1px'} : {}} 
                        onClick={() => handlePage(false, false, true)}>Versão</Button>

                    <Card hidden={!generalBTN}>
                        <Row>
                            <Col span={24} >
                                <Input label="Nome" name="name" required />
                            </Col>
                        </Row>
                        
                        <Row>
                            <Col span={24} >
                                <TextArea label="Descrição" name="description" />
                            </Col>
                        </Row>
                    </Card>
                    <Card hidden={!moduleBTN}>       
                        <SideTransfer 
                            label="Módulos"
                            name="modules"
                            dataSource={modules}   
                            renderItem={e => e.name}
                            rowKey={e => e.id}
                            showSearch
                            required
                        />
                    </Card>

                    <Card hidden={!versionBTN}>

                        <Row>
                            <Col span={12} style={{padding: '8px'}}>
                                <Button className="btn-black" onClick={appendQuestion} > 
                                    <PlusOutlined /> Adicionar versão
                                </Button>
                            </Col>
                        </Row>

                        {fields.map((question, questionIndex) => (
                            <div key={question.key} >
                                <Row>
                                    <Col span={22} >
                                        {question.id && <Input hidden
                                            label="Id" 
                                            name={`versions[${questionIndex}].id`} 
                                            value={question.id ?? ''} 
                                            required 
                                        />}

                                        <InputNumber key={questionIndex}
                                            label="Valor"
                                            name={`versions[${questionIndex}].value`} 
                                            value={question.value} 
                                            required 
                                        />
                                    </Col>

                                    <Col span={2} style={{marginTop: '36px'}}>
                                        {!question.id && <DeleteFilled 
                                            style={{ fontSize: '20px' }} 
                                            onClick={() => remove(questionIndex)} 
                                        />}
                                    </Col>
                                </Row>
                            </div>
                        ))}

                        <ErrorMessage name="versions" render={({ message }) => <p style={{ color: "red" }}> {message} </p> } key="versions" />
                    </Card>
                </FormLayout>
            </Form>
        </>
    );
}

export default FormProduct;
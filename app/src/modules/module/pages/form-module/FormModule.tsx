import React, { useEffect, useState } from 'react';
import { Col, message, Row} from 'antd';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { FormCreateModuleParm } from './FormCreateModule.types';

import ModuleSchema from './ModuleSchema';
import { Module } from '../../models/Module';
import { ModuleApi } from '../../api/ModuleApi';
import CustomForm from '../../../../components/form/form/Form';
import FormLayout from '../../../../components/form-layout/FormLayout';
import { Input, TextArea } from '../../../../components/form/form-fields/FormFields';
import "./form-module.css"

const FormModule: React.FC = () => {

    //irá pegar o Id passado por parâmetro na rota
    const { moduleId } = useParams<FormCreateModuleParm>();
    //formulário modelo conforme o tipo e com as tratativas do yup
    const form  = useForm({ resolver: ModuleSchema });
    const [loading, setLoading] = useState(false);

    //usado para rotas
    const { goBack } = useHistory();

    /**
     * useEffect irá executar quando iniciar a página
     * se tiver moduleId significa que é um update,
     * portanto irá carregar as informações do banco
     */
    useEffect(() => {
        if (moduleId) {
            setLoading(true);
            ModuleApi.getModule(moduleId)
                .then(data => {
                    form.reset(data);
                })
                .finally(() => setLoading(false)
            );
        }
    }, []);

    //Envio de formulário
    //Verifica se é um update ou create
    async function onSubmit(value: Module) {
       
        setLoading(true);
        try {
            if (moduleId) {
                //se tiver Id irá atualizar a módulo
                await ModuleApi.update({ ...value, id: moduleId });
                message.success(`Módulo atualizada com sucesso!`);
                goBack();
            } else {
                //se não tiver Id irá criar uma nova módulo
                const result = await ModuleApi.create(value);
                message.success(`Módulo cadastrado com sucesso! Módulo: ${result?.name}`);
                goBack();
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
                <FormLayout title={moduleId ? "Edição de módulo" : "Cadastro de módulo"} backPage={goBack}>
                    
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

                </FormLayout>
            </CustomForm>
        </>
    );
}

export default FormModule;
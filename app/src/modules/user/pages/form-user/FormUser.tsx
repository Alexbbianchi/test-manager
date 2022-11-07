import React, { useEffect, useState } from 'react';
import { Col, message, Row, Select as SelectAntd, Radio } from 'antd';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { FormCreateUserParm } from './FormCreateUser.types';

import UserSchema from './UserSchema';
import { User, UserPermission, UserStatus } from '../../models/User';
import { UserApi } from '../../api/UserApi';
import CustomForm from '../../../../components/form/form/Form';
import FormLayout from '../../../../components/form-layout/FormLayout';
import { Input, Select } from '../../../../components/form/form-fields/FormFields';
import RadioGroup from '../../../../components/form/radio-group/RadioGroup';
import { useAuth } from '../../../../context/AuthProvider/useAuth';
import BrowserHistory from '../../../../routes/BrowserHistory';
import "./form-user.css"

const { Option } = SelectAntd;

const FormUser: React.FC = () => {

    const defaultValues = {
        status: UserStatus.ACTIVE
    }

    const { userId } = useParams<FormCreateUserParm>();
    const form  = useForm({ resolver: UserSchema, defaultValues });
    const [loading, setLoading] = useState(false);
    const auth = useAuth();

    const { goBack } = useHistory();

    useEffect(() => {
        if (userId) {
            validatePermission();
            setLoading(true);
            UserApi.getUser(userId)
                .then(data => {
                    form.reset(data);
                })
                .finally(() => setLoading(false)
            );
        }
    }, []);

    const validatePermission = () => {
        if (auth.permission === UserPermission.TECHNICIAN && auth.id != userId) {
            BrowserHistory.push('/users');
        }
    }

    const isUserMe = () => {
        if (!userId) return false;

        if (auth.id == userId) return false;

        return true;
    }

    async function onSubmit(value: User) {
        setLoading(true);
        
        try {
            if (userId) {
                await UserApi.update({ ...value, id: userId });
                message.success(`Usuário atulizado com sucesso!`);
                goBack();
            } else {
                const result = await UserApi.create(value);
                goBack();
                message.success(`Usuário cadastrado com sucesso! Usuário: ${result?.name}`);
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
                <FormLayout title={userId ? "Edição de usuário" : "Cadastro de usuário"} backPage={goBack}>
                    <Row>
                        <Col span={24} >
                            <Input label="Nome" name="name" required />
                        </Col>
                    </Row>
                    
                    <Row hidden={!userId}>
                        <Col span={4} >
                            <RadioGroup name="status" disabled={auth.permission !== UserPermission.ADMIN}>
                                <Radio.Button key={UserStatus.ACTIVE} value={UserStatus.ACTIVE}>
                                    Ativo
                                </Radio.Button>
                                <Radio.Button key={UserStatus.INACTIVE} value={UserStatus.INACTIVE}>
                                    Inativo
                                </Radio.Button>
                            </RadioGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={24} >
                            <Input label="E-mail" name="email" type="email" required />
                        </Col>
                    </Row>

                    <Row>
                        <Col span={12} >
                            <Input label="Login" name="username" disabled={!!userId} required />
                        </Col>

                        <Col span={12} >
                            <Input label="Senha" name="password" hidden={isUserMe()} type="password" required />
                        </Col>
                    </Row>

                    <Row>
                        <Col span={24} >
                            <Select label="Permissões" name="permission" required disabled={auth.permission !== UserPermission.ADMIN}>
                                <Option key={UserPermission.ADMIN} value={UserPermission.ADMIN}>
                                    Administrador
                                </Option>
                                <Option key={UserPermission.TECHNICIAN} value={UserPermission.TECHNICIAN}>
                                    Técnico
                                </Option>
                                <Option key={UserPermission.VISITOR} value={UserPermission.VISITOR}>
                                    Visitante
                                </Option>
                            </Select>
                        </Col>
                    </Row>

                </FormLayout>
            </CustomForm>
        </>
    );
}

export default FormUser;
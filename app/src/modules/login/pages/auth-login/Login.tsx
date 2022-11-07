import React, { useEffect, useState } from 'react';
import { Button, Col, message, Row, Tooltip } from 'antd';
import { useForm } from 'react-hook-form';
import LoginSchema from './LoginSchema';
import { Login } from '../../models/Login';
import { LoginApi } from '../../api/LoginApi';
import { Input } from '../../../../components/form/form-fields/FormFields';
import CustomForm from '../../../../components/form/form/Form';
import { useAuth } from '../../../../context/AuthProvider/useAuth';
import BrowserHistory from '../../../../routes/BrowserHistory';
import "./login.css";

const AuthLogin: React.FC = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const form = useForm({ resolver: LoginSchema, defaultValues: { username: '', password: '' } });
    const auth = useAuth();
    
    useEffect(() => {
        if(auth.username) {
            BrowserHistory.push('/');
        }
    }, []);

    const onSubmit = async (data: Login) => {
        setLoading(true);

        try {
            let result = await LoginApi.login(data.username, data.password)
            auth.login(result);
        }
        catch (e) {
            console.warn("Erro", JSON.stringify(e));
        }
        finally {
            setLoading(false)
        }
    }

    const onKeyPress = (e: any) => {
        if (e.key === 'Enter') {
            e.preventDefault();

            form.handleSubmit(onSubmit)(e)
        }
    }

    return (
        <>
            <div className="login-container">

                <div className="login-container-box">
                    <span className="login-title">Acessar o Sistema</span>
                    
                    <CustomForm loading={loading} provider={form} handleSubmit={onSubmit}  >
                        <Row>
                            <Col span={24}>
                                <Input label="Usuário" name="username" tabIndex={1} autoFocus onKeyPress={onKeyPress} />
                            </Col>
                        </Row>

                        <Row>
                            <Col span={24}>
                                <Input label="Senha" name="password" type="password" tabIndex={2} onKeyPress={onKeyPress} />
                            </Col>
                        </Row>

                        <div className="login-footer">
                            <Button type="primary" block size="large" htmlType="submit" >
                                Acessar o sistema
                            </Button>

                            <Tooltip className="login-footer-help" title="Entre em contato com o administrador do sistema." arrowPointAtCenter>
                                <Button type="link" block>
                                    Problemas com o acesso?
                                </Button>
                            </Tooltip>
                        </div>
                    </CustomForm>
                </div>
            </div>
        </>
    )
}

export default AuthLogin;

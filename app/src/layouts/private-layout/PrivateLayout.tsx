import React, { useState } from 'react'
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider/useAuth';
import {
    ProjectOutlined,
    ShoppingOutlined,
    TagsOutlined,
    ContainerOutlined,
    ReconciliationOutlined,
    ExperimentOutlined,
    UserOutlined,
    ReadOutlined
} from '@ant-design/icons';

import "./private-layout.css"
import { UserPermission } from '../../modules/user/models/User';
import PrivateHeader from '../private-header/PrivateHeader';

// desestruturação
const { Header, Sider, Content } = Layout;

const PrivateLayout: React.FC = (props) => {

    // crio um controlador de estado para a variavel collapsed
    const [collapsed, setCollapsed] = useState(false);
    // instancio o contexto
    const auth = useAuth();
    // método passado por propriedade, método é criado aqui, mas é dispadado na tela do header
    const toggle = () => {
        setCollapsed(old => !old); // nega o valor antigo
    };

    return (
        
        <Layout>
            <Header className="private-background-header">
                <PrivateHeader collapsed={collapsed} toggle={toggle} />
            </Header>

            <Layout className="private-layout" >
                <Sider
                    collapsible
                    trigger={null}
                    collapsed={collapsed}
                >
                    <Menu className="private-background-menu" 
                        // esta linha faz com que sempre que seja atualizado a tela, venha marcado como selecionado no menu lateral, conforme a rota atual
                        defaultSelectedKeys={[window.location.href.replace('http://','').split('/')[1]]} mode="inline" >
                        <Menu.Item key="" icon={<ProjectOutlined />} >
                            <Link to="/">
                                Dashboard
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="modules" icon={<TagsOutlined />} disabled={auth.permission === UserPermission.VISITOR}>
                            <Link to="/modules">
                                Módulo
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="products" icon={<ShoppingOutlined />} disabled={auth.permission === UserPermission.VISITOR}>
                            <Link to="/products">
                                Produto
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="test-cases" icon={<ReconciliationOutlined />} disabled={auth.permission === UserPermission.VISITOR}>
                            <Link to="/test-cases">
                                Caso de teste
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="test-plans" icon={<ContainerOutlined />} disabled={auth.permission === UserPermission.VISITOR}>
                            <Link to="/test-plans">
                                Plano de teste
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="test-executions" icon={<ExperimentOutlined />} disabled={auth.permission === UserPermission.VISITOR}>
                            <Link to="/test-executions">
                                Execução de teste
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="execution-history" icon={<ReadOutlined />}>
                            <Link to="/execution-history">
                                Histórico de Execução
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="users" icon={<UserOutlined />} disabled={auth.permission === UserPermission.VISITOR}>
                            <Link to="/users">
                                Usuário
                            </Link>
                        </Menu.Item>
                    </Menu>
                </Sider>

                {/* Onde é renderizado todo o conteudo das paginas, sejá listagem ou crud */}
                <Content className="container" >
                    <div className="private-background-body" >
                        {props.children}
                    </div>
                </Content>

            </Layout>
        </Layout>
    );
}

export default PrivateLayout;

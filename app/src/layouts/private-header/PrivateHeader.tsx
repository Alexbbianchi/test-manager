import React from "react";
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    CoffeeOutlined
} from '@ant-design/icons';

import "./private-header.css"
import Title from "antd/lib/typography/Title";
import { Col, Row } from "antd/lib/grid";
import { useAuth } from "../../context/AuthProvider/useAuth";
import { Button, Dropdown, Menu } from "antd";
import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";
import BrowserHistory from "../../routes/BrowserHistory";

export interface IPrivateHeaderProps {
    toggle: () => void; // método usado para alterar o estado do item abaixo, de exibir ou não o menu lateral
    collapsed: boolean; // variavel usada para gerenciar o menu lateral
}

/**
 *  método toggle e prop collapsed vem na tela private-layout, passando assim como propriedade, é posssivel controlar o estado da variavel toggle
 */
const PrivateHeader: React.FC<IPrivateHeaderProps> = ({ collapsed, toggle }) => {
    // carrega nosso context, nele onde encontramos informações do usuário
    const auth = useAuth(); 

    return (
        <Row>
            {/* Botão controlador do menu lateral */}
            <Col span={2}>
                {/* Criasse um elemento do react, seria algo como um icone com função de click, 
                mas assim é possivel manter a mesma função para dois icones */}
                {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                    onClick: toggle, 
                    style: {  
                        color: 'white', 
                        fontSize: '20px'
                    }
                })}
            </Col>
            

            {/* Logo do sistema */}
            <Col span={10} style={{ 
                margin: 'auto 0'
            }}>
                <Title level={4} style={{ color: 'white' }}>
                    {"<"}<CoffeeOutlined />{">"}{`Test Manager`}
                </Title>
            </Col>


            {/* Avatr do usúario, por enquanto não terá foto do usuário */}
            <Col span={10} style={{ 
                textAlign: 'right',
                margin: 'auto 0',
            }}>
                <Dropdown overlay={
                    <Menu>
                        <Menu.Item key="0">
                            <Button type="link" 
                                onClick={() => BrowserHistory.push(`/users/edit/${auth.id}`)} >
                                Ver perfil
                            </Button>
                        </Menu.Item>
                        <Menu.Item key="1">
                            <Button type="link" onClick={() => auth.logout()} >
                                Logout
                            </Button>
                        </Menu.Item>
                    </Menu>
                }>
                    <Button type="link" style={{color: 'white'}}>
                        <UserOutlined style={{borderRadius: '50%', background: "grey", padding: '10px'}} /> {auth.name}
                    </Button>
                </Dropdown>

            </Col>
        </Row>
    );
};

export default PrivateHeader;

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
    toggle: () => void;
    collapsed: boolean;
}

const PrivateHeader: React.FC<IPrivateHeaderProps> = ({ collapsed, toggle }) => {
    const auth = useAuth(); 

    return (
        <Row>
            <Col span={2}>
                {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                    onClick: toggle, 
                    style: {  
                        color: 'white', 
                        fontSize: '20px'
                    }
                })}
            </Col>

            <Col span={10} style={{ 
                margin: 'auto 0'
            }}>
                <Title level={4} style={{ color: 'white' }}>
                    {"<"}<CoffeeOutlined />{">"}{`Test Manager`}
                </Title>
            </Col>

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

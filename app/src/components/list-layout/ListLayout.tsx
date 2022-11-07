import React from 'react';
import { Button, Col, Input, Row, Table } from 'antd';
import { SearchOutlined } from '@ant-design/icons/lib/icons';
import { Link } from 'react-router-dom';
import { ListLayoutProps } from './ListLayout.types';

const ListLayout: React.FC<ListLayoutProps> = ({ draggableBodyRow, linkTo, onSearch, colunas, dataSource, loading, hiddenNewBtn }) => {

    return (
        <>
            <Row style={{ marginBottom: '20px' }}>
                <Col span={12} offset={6}>
                    {/* Input do filtro de pesquisar */}
                    <Input placeholder="Pesquisar"
                        onChange={(value) => onSearch(value.target.value)}
                        suffix={<SearchOutlined />}
                    />
                </Col>

                <Col span={6} style={{textAlign: 'right'}} hidden={hiddenNewBtn}>
                    {/* Botão novo, irá acessar método passado por paramentro */}
                    <Link to={linkTo}>
                        <Button type="primary" size="middle">
                            NOVO
                        </Button>
                    </Link>
                </Col>
            </Row>

            {/* Renderiza uma tabela
                colunas passadas por prop
                valores passados por prop
             */}
            <Table rowKey="id" columns={colunas} dataSource={dataSource} size="middle" 
                pagination={{ 
                    defaultPageSize: 10,
                    showSizeChanger: true
                }} 
                components={{
                    body: {
                        row: draggableBodyRow, // confurações de como será exibido, é possivel aceitar o onclick e exibir pelo click
                    },
                }}
                loading={loading}
            />
        </>
    )
}

export default ListLayout;
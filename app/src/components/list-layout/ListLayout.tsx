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
                    <Input placeholder="Pesquisar"
                        onChange={(value) => onSearch(value.target.value)}
                        suffix={<SearchOutlined />}
                    />
                </Col>

                <Col span={6} style={{textAlign: 'right'}} hidden={hiddenNewBtn}>
                    <Link to={linkTo}>
                        <Button type="primary" size="middle">
                            NOVO
                        </Button>
                    </Link>
                </Col>
            </Row>

            <Table rowKey="id" columns={colunas} dataSource={dataSource} size="middle" 
                pagination={{ 
                    defaultPageSize: 10,
                    showSizeChanger: true
                }} 
                components={{
                    body: {
                        row: draggableBodyRow,
                    },
                }}
                loading={loading}
            />
        </>
    )
}

export default ListLayout;
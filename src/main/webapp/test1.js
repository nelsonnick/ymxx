import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Button ,Row,Col } from 'antd';
import Table from './component/table';

ReactDOM.render(<div>
    <Row type="flex" justify="space-between" align="bottom">
        <Col span={24}><Button type="primary">主按钮</Button></Col>
    </Row>
    <Row type="flex" justify="center" align="top">
        <Col span={24}> <Table/></Col>
    </Row>
</div>, document.getElementById('mainPage'));
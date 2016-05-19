import React from 'react';
import ReactDOM from 'react-dom';
import { DatePicker,Button ,Row,Col } from 'antd';
import 'antd/dist/antd.css';
import HelloMessage from './header';
import Login from './component/Login';
ReactDOM.render(<div>
    <Row type="flex" justify="center" align="top">
        <Col span={24}> <HelloMessage/></Col>
    </Row>
    <Row type="flex" justify="space-between" align="bottom">
        <Col span={6}><Button type="primary">主按钮</Button></Col>
        <Col span={18}><DatePicker /></Col>
    </Row>
    <Row type="flex" justify="center" align="top">
        <Col span={24}> <Login/></Col>
    </Row>
    
       
    </div>, document.getElementById('mainPage'));


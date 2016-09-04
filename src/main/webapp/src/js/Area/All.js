import { Row, Col } from 'antd';
import Top from './Top.js';
import Left from './Left.js';
import Right from './Right.js';
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
const rolePower = 'Document,DocInfo,DocChan,DocFlow,Person,PerInfo,PerChan,Analysis,DocAnal,PerAnal,OpeAnal,Control,PasCont,DepCont,UseCont,RolCont,LokDept,';
class All extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuFunctionType: '',
    };
    this.setMenuLabel = this.setMenuLabel.bind(this);
  }
  setMenuLabel(labelName) {
    this.setState(
      {
        menuFunctionType: labelName,
      }
    );
  }
  render() {
    return (
      <div>
        <Row>
          <Col span={24}><Top /></Col>
        </Row>
        <Row>
          <span style={{ 'font-size': '10px' }}>&nbsp;&nbsp;&nbsp;</span>
        </Row>
        <Row type="flex" justify="start">
          <Col span={3}><Left menuLabel={this.setMenuLabel} rolePower={rolePower} /></Col>
          <Col span={20}><Right menuFunctionType={this.state.menuFunctionType} rolePower={rolePower} /></Col>
        </Row>
      </div>
    );
  }
}
ReactDOM.render(<All />, document.body);

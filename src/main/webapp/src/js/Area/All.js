import { Row, Col } from 'antd';
import Top from './Top.js';
import Left from './Left.js';
import Right from './Right.js';
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';


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
        <Row type="flex" justify="start">
          <Col span={3}><Left menuLabel={this.setMenuLabel} /></Col>
          <Col span={20}><Right menuFunctionType={this.state.menuFunctionType} /></Col>
        </Row>
      </div>
    );
  }
}
ReactDOM.render(<All />, document.body);

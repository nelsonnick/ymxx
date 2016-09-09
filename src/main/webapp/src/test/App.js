import React from 'react';
import ReactDOM from 'react-dom';
import { TreeSelect } from 'antd';

const treeData = [{
  label: '节点一',
  value: '1',
  key: '0-0',
  children: [{
    label: '子节点一',
    value: '3',
    key: '0-0-0',
  }],
}, {
  label: '节点二',
  value: '2',
  key: '0-1',
  children: [{
    label: '子节点三',
    value: '4',
    key: '0-1-0',
  }, {
    label: '子节点四',
    value: '5',
    key: '0-1-1',
  }, {
    label: '子节点五',
    value: '6',
    key: '0-1-2',
    children: [{
      label: '子节点五一',
      value: '6',
      key: '0-0-0',
    }],
  }],
}];

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ['5'],
    };
    this.onChange = this.onChange.bind(this);
  }
  onChange(value) {
    console.log('onChange ', value);
    this.setState({ value });
  }
  render() {
    return (
      <TreeSelect
        treeData={treeData}
        value={this.state.value}
        onChange={this.onChange}
        multiple
        treeCheckable
        showCheckedStrategy={TreeSelect.SHOW_ALL}
        searchPlaceholder={"请选择"}
        style={{ width: 300 }}
      />
    );
  }
}

ReactDOM.render(<Demo />, document.body);

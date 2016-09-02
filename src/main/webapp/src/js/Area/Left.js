import SystemMenu from '../Component/SystemMenu.js';
import React from 'react';
const rolePower = [
  { 'Func': 'Document',
    'Name': '档案管理',
    'Type': 'file',
    'Stat': true,
    'Data': [
      { 'Func': 'DocInfo', 'Name': '档案信息', 'Stat': true, 'Type': 'bars' },
      { 'Func': 'DocChan', 'Name': '档案变更', 'Stat': true, 'Type': 'book' },
      { 'Func': 'DocFlow', 'Name': '档案流动', 'Stat': true, 'Type': 'mail' },
    ],
  },
  { 'Func': 'Person',
    'Name': '人员管理',
    'Type': 'team',
    'Stat': true,
    'Data': [
      { 'Func': 'PerInfo', 'Name': '人员信息', 'Stat': true, 'Type': 'bars' },
      { 'Func': 'PerChan', 'Name': '信息变更', 'Stat': true, 'Type': 'book' },
    ],
  },
  { 'Func': 'Analysis',
    'Name': '统计分析',
    'Type': 'pie-chart',
    'Stat': true,
    'Data': [
      { 'Func': 'DocAnal', 'Name': '档案分析', 'Stat': true, 'Type': 'Area-chart' },
      { 'Func': 'PerAnal', 'Name': '人员分析', 'Stat': true, 'Type': 'bar-chart' },
      { 'Func': 'OpeAnal', 'Name': '业务分析', 'Stat': true, 'Type': 'line-chart' },
    ],
  },
  { 'Func': 'Control',
    'Name': '系统管理',
    'Type': 'setting',
    'Stat': true,
    'Data': [
      { 'Func': 'PasCont', 'Name': '密码管理', 'Stat': true, 'Type': 'ellipsis' },
      { 'Func': 'DepCont', 'Name': '部门管理', 'Stat': true, 'Type': 'laptop' },
      { 'Func': 'UseCont', 'Name': '用户管理', 'Stat': true, 'Type': 'user' },
      { 'Func': 'RolCont', 'Name': '角色管理', 'Stat': true, 'Type': 'solution' },
    ],
  },
];
export default class Left extends React.Component {

  constructor(props) {
    super(props);
    this.setMenuLabel = this.setMenuLabel.bind(this);
  }

  setMenuLabel(labelName) {
    this.props.menuLabel(labelName);
  }

  render() {
    return (
      <SystemMenu menuLabel={this.setMenuLabel} rolePower={rolePower} />
    );
  }
}
Left.propTypes = {
  menuLabel: React.PropTypes.func,
};

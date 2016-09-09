import React from 'react';
import { Form, Input, TreeSelect, notification } from 'antd';
import * as AjaxFunction from '../../../Util/AjaxFunction.js';
import $ from 'jquery';
const FormItem = Form.Item;
// const ttt = [{ value: '1', label: '档案管理', key: 'Document', children: [{ value: '5', label: '档案信息', key: 'DocInfo',}, { value: '6', label: '档案变更', key: 'DocChan',}, { value: '7', label: '档案流动', key: 'DocFlow',}, ], }, { value: '2', label: '人员管理', key: 'Person', children: [{ value: '8', label: '人员信息', key: 'PerInfo',}, { value: '9', label: '信息变更', key: 'PerChan',}, ], }, { value: '3', label: '统计分析', key: 'Analysis', children: [{ value: '10', label: '档案分析', key: 'DocAnal',}, { value: '11', label: '人员分析', key: 'PerAnal',}, { value: '12', label: '业务分析', key: 'OpeAnal',}, ], }, { value: '4', label: '系统管理', key: 'Control', children: [{ value: '13', label: '密码管理', key: 'PasCont',}, { value: '14', label: '部门管理', key: 'DepCont', children: [{ value: '17', label: '查看部门', key: 'LodDept', }, { value: '18', label: '添加部门', key: 'AddDept', }, { value: '19', label: '查询部门', key: 'QuyDept', }, { value: '20', label: '获取列表', key: 'GetDept', }, { value: '21', label: '修改部门', key: 'EdiDept', }, { value: '22', label: '激活部门', key: 'ActDept', }, { value: '23', label: '注销部门', key: 'AbdDept', }, { value: '24', label: '删除部门', key: 'DelDept', }, ], }, { value: '15', label: '用户管理', key: 'UseCont',}, { value: '16', label: '角色管理', key: 'RolCont', children: [{ value: '25', label: '添加用户', key: 'AddRole', }, { value: '26', label: '查询用户', key: 'QuyRole', }, { value: '27', label: '获取列表', key: 'GetRole', }, { value: '28', label: '修改用户', key: 'EdiRole', }, { value: '29', label: '设置权限', key: 'SetRole', }, { value: '30', label: '删除用户', key: 'DelRole', }, ], }, ], }];
const openNotificationWithIcon = (type, msg, desc) => {
  notification[type]({
    message: msg,
    description: desc,
  });
};
class SetFrom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: [],
      tree: [],
    };
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    $.ajax({
      'type': 'POST',
      'url': AjaxFunction.RoleTree,
      'dataType': 'text',
      'success': (data) => {
        this.setState(
          {
            tree: eval(`(${data})`),
          }
        );
      },
      'error': () => {
        openNotificationWithIcon('error', '请求错误', '无法获取部门信息，请检查网络情况');
        this.setState(
          {
            tree: '',
          }
        );
      },
    });
  }

  onChange(value) {
    console.log('onChange ', value);
    this.setState({ value });
  }
  render() {
    const { getFieldProps } = this.props.form;
    const { roleId, roleName, roleOther } = this.props;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const roleIdProps = getFieldProps('roleId', {
      initialValue: roleId,
    });
    const roleNameProps = getFieldProps('roleName', {
      initialValue: roleName,
    });
    const roleOtherProps = getFieldProps('roleOther', {
      initialValue: roleOther,
    });
    const rolePowersProps = getFieldProps('rolePowers', {
    });
    return (
      <Form horizontal>
        <FormItem
          label=""
          {...formItemLayout}
        >
          <Input type="hidden" {...roleIdProps} />
        </FormItem>
        <FormItem
          label="角色名称"
          {...formItemLayout}
          hasFeedback
          required
        >
          <Input placeholder="请输入角色名称" disabled {...roleNameProps} />
        </FormItem>
        <FormItem
          label="其他信息"
          {...formItemLayout}
          hasFeedback
        >
          <Input type="textarea" rows="3" placeholder="其他需要填写的信息" disabled {...roleOtherProps} />
        </FormItem>
        <FormItem
          label="所选权限"
          {...formItemLayout}
          required
        >
          <TreeSelect
            {...rolePowersProps}
            value={this.state.value}
            treeData={this.state.tree}
            onChange={this.onChange}
            multiple
            treeCheckable
            showCheckedStrategy={TreeSelect.SHOW_ALL}
            searchPlaceholder={"请选择"}
          />
        </FormItem>
      </Form>
    );
  }
}

SetFrom = Form.create({})(SetFrom);
export default SetFrom;
SetFrom.propTypes = {
  form: React.PropTypes.object,
  roleId: React.PropTypes.string,
  roleName: React.PropTypes.string,
  roleOther: React.PropTypes.string,
};

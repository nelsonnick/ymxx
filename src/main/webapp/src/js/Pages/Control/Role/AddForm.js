import React from 'react';
import { Form, Input, TreeSelect } from 'antd';
import $ from 'jquery';
const FormItem = Form.Item;
import * as AjaxFunction from '../../../Util/AjaxFunction.js';
class AddFrom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      powerValue: this.props.powerValue,
      deptValue: this.props.deptValue,
      powerTree: [],
      deptTree: [],
    };
    this.roleNameCheck = this.roleNameCheck.bind(this);
    this.onChangePower = this.onChangePower.bind(this);
    this.onChangeDept = this.onChangeDept.bind(this);
  }
  componentWillReceiveProps() {
    this.setState(
      {
        powerValue: this.props.powerValue,
        deptValue: this.props.deptValue,
      }
    );
  }
  onChangePower(powerValue) {
    this.props.getPower(powerValue);
    this.setState({ powerValue });
  }
  onChangeDept(deptValue) {
    this.props.getDept(deptValue);
    this.setState({ deptValue });
  }
  roleNameCheck(rule, value, callback) {
    if (!value) {
      callback();
    } else {
      $.ajax({
        'type': 'POST',
        'url': AjaxFunction.RoleName,
        'dataType': 'text',
        'data': { 'name': value },
        'success': (data) => {
          if (data.toString() === 'OK') {
            callback();
          } else {
            callback(new Error(data.toString()));
          }
        },
        'error': () => {
          callback(new Error('无法执行后台验证，请重试'));
        },
      });
    }
  }
  render() {
    const { getFieldProps, getFieldError, isFieldValidating } = this.props.form;
    const { powerTree, deptTree } = this.props;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const roleNameProps = getFieldProps('roleName', {
      rules: [
        { required: true, whitespace: true, message: '必填项' },
        { validator: this.roleNameCheck },
      ],
    });
    const roleOtherProps = getFieldProps('roleOther', {
    });
    const powerTreeProps = getFieldProps('powerTree', {
    });
    const deptTreeProps = getFieldProps('deptTree', {
    });
    return (
      <Form horizontal>
        <FormItem
          label="角色名称"
          {...formItemLayout}
          hasFeedback
          required
          help={isFieldValidating('roleName') ? '校验中...' : (getFieldError('roleName') || [])}
        >
          <Input placeholder="请输入角色名称" {...roleNameProps} />
        </FormItem>
        <FormItem
          label="其他信息"
          {...formItemLayout}
          hasFeedback
        >
          <Input type="textarea" rows="3" placeholder="其他需要填写的信息" {...roleOtherProps} />
        </FormItem>
        <FormItem
          label="赋予权限"
          {...formItemLayout}
          required
        >
          <TreeSelect
            {...powerTreeProps}
            value={this.state.powerValue}
            treeData={powerTree}
            onChange={this.onChangePower}
            multiple
            treeCheckable
            showCheckedStrategy={TreeSelect.SHOW_ALL}
            searchPlaceholder={"请选择"}
          />
        </FormItem>
        <FormItem
          label="授权部门"
          {...formItemLayout}
          required
        >
          <TreeSelect
            {...deptTreeProps}
            value={this.state.deptValue}
            treeData={deptTree}
            onChange={this.onChangeDept}
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
AddFrom = Form.create({})(AddFrom);
export default AddFrom;
AddFrom.propTypes = {
  form: React.PropTypes.object,
  powerTree: React.PropTypes.object,
  deptTree: React.PropTypes.object,
  powerValue: React.PropTypes.string,
  deptValue: React.PropTypes.string,
  getPower: React.PropTypes.func,
  getDept: React.PropTypes.func,
};

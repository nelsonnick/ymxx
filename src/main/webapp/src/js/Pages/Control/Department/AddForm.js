import React from 'react';
import { Form, Input, Select } from 'antd';
import $ from 'jquery';
const FormItem = Form.Item;
const Option = Select.Option;
import * as AjaxFunction from '../../../Util/AjaxFunction.js';
class AddFrom extends React.Component {
  constructor(props) {
    super(props);
    this.departmentNameCheck = this.departmentNameCheck.bind(this);
    this.departmentPhoneCheck = this.departmentPhoneCheck.bind(this);
    this.departmentAddressCheck = this.departmentAddressCheck.bind(this);
  }

  departmentNameCheck(rule, value, callback) {
    if (!value) {
      callback();
    } else {
      $.ajax({
        'type': 'POST',
        'url': AjaxFunction.DepartmentName,
        'dataType': 'json',
        'data': { 'name': value },
        'success': (data) => {
          if (data === '正常') {
            callback();
          } else {
            callback(new Error(data));
          }
        },
        'error': () => {
          callback(new Error('无法执行后台验证，请重试'));
        },
      });
    }
  }
  departmentPhoneCheck(rule, value, callback) {
    if (!value) {
      callback();
    } else {
      $.ajax({
        'type': 'POST',
        'url': AjaxFunction.DepartmentPhone,
        'dataType': 'json',
        'data': { 'phone': value },
        'success': (data) => {
          if (data === '正常') {
            callback();
          } else {
            callback(new Error(data));
          }
        },
        'error': () => {
          callback(new Error('无法执行后台验证，请重试'));
        },
      });
    }
  }
  departmentAddressCheck(rule, value, callback) {
    if (!value) {
      callback();
    } else {
      $.ajax({
        'type': 'POST',
        'url': AjaxFunction.DepartmentAddress,
        'dataType': 'json',
        'data': { 'address': value },
        'success': (data) => {
          if (data === '正常') {
            callback();
          } else {
            callback(new Error(data));
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

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const departmentNameProps = getFieldProps('departmentName', {
      rules: [
        { required: true, whitespace: true, message: '必填项' },
        { validator: this.departmentNameCheck },
      ],
    });
    const departmentPhoneProps = getFieldProps('departmentPhone', {
      rules: [
        { required: true, whitespace: true, message: '必填项' },
        { validator: this.departmentPhoneCheck },
      ],
    });
    const departmentAddressProps = getFieldProps('departmentAddress', {
      rules: [
        { required: true, whitespace: true, message: '必填项' },
        { validator: this.departmentAddressCheck },
      ],
    });
    return (
      <Form horizontal>
        <FormItem
          label="部门名称"
          {...formItemLayout}
          hasFeedback
          required
          help={isFieldValidating('departmentName') ? '校验中...' : (getFieldError('departmentName') || [])}
        >
          <Input placeholder="请输入部门的中文全称" {...departmentNameProps} />
        </FormItem>
        <FormItem
          label="部门电话"
          {...formItemLayout}
          hasFeedback
          required
          help={isFieldValidating('departmentPhone') ? '校验中...' : (getFieldError('departmentPhone') || [])}
        >
          <Input placeholder="请输入8位固定电话" {...departmentPhoneProps} />
        </FormItem>
        <FormItem
          label="部门地址"
          {...formItemLayout}
          hasFeedback
          required
          help={isFieldValidating('departmentAddress') ? '校验中...' : (getFieldError('departmentAddress') || [])}
        >
          <Input placeholder="请输入详细地址" {...departmentAddressProps} />
        </FormItem>
        <FormItem
          label="部门状态"
          {...formItemLayout}
          required
        >
          <Select size="large" defaultValue="1" >
            <Option value="1">激活</Option>
            <Option value="0">注销</Option>
          </Select>
        </FormItem>
        <FormItem
          label="其他信息"
          {...formItemLayout}
          hasFeedback
        >
          <Input type="textarea" rows="3" placeholder="其他需要填写的信息" />
        </FormItem>
      </Form>
    );
  }
}
AddFrom = Form.create({})(AddFrom);
export default AddFrom;
AddFrom.propTypes = {
  form: React.PropTypes.object,
};

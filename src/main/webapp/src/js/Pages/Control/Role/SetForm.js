import React from 'react';
import { Form, Input, TreeSelect } from 'antd';
const FormItem = Form.Item;

export default class SetFrom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: [],
      rolePowers: [],
    };
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    this.setState(
      {
        rolePowers: [],
      }
    );
  }

  onChange(value) {
    console.log('onChange ', value);
    this.setState({ value });
  }
  render() {
    const { getFieldProps } = this.props.form;
    const { roleId, roleName, roleOther, tree } = this.props;
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
      initialValue: this.state.rolePowers,
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
          hasFeedback
          required
        >
          <TreeSelect
            {...rolePowersProps}
            treeData={tree}
            value={this.state.value}
            onChange={this.onChange}
            multiple
            treeCheckable
            showCheckedStrategy={TreeSelect.SHOW_ALL}
            searchPlaceholder={"请选择"}
            style={{ width: 300 }}
          />
        </FormItem>
      </Form>
    );
  }
}
SetFrom.propTypes = {
  form: React.PropTypes.object,
  roleId: React.PropTypes.string,
  roleName: React.PropTypes.string,
  roleOther: React.PropTypes.string,
  tree: React.PropTypes.object,
};

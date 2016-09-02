import React from 'react';
import { Form, Input, Select } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
class LookFrom extends React.Component {

  render() {
    const { departmentName, departmentPhone, departmentAddress, departmentState, departmentOther } = this.props;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (
      <Form horizontal>
        <FormItem
          label="部门名称"
          {...formItemLayout}
          required
        >
          <Input placeholder="请输入部门的中文全称" disabled="true" value={departmentName} />
        </FormItem>
        <FormItem
          label="部门电话"
          {...formItemLayout}
          required
        >
          <Input placeholder="请输入8位固定电话" disabled="true" value={departmentPhone} />
        </FormItem>
        <FormItem
          label="部门地址"
          {...formItemLayout}
          required
        >
          <Input placeholder="请输入详细地址" disabled="true" value={departmentAddress} />
        </FormItem>
        <FormItem
          label="部门状态"
          {...formItemLayout}
          required
        >
          <Select size="large" disabled value={departmentState} >
            <Option value="激活">激活</Option>
            <Option value="注销">注销</Option>
          </Select>
        </FormItem>
        <FormItem
          label="其他信息"
          {...formItemLayout}
        >
          <Input type="textarea" rows="3" placeholder="其他需要填写的信息" disabled="true" value={departmentOther} />
        </FormItem>
      </Form>
    );
  }
}
LookFrom = Form.create({})(LookFrom);
export default LookFrom;
LookFrom.propTypes = {
  form: React.PropTypes.object,
  departmentId: React.PropTypes.number,
  departmentName: React.PropTypes.string,
  departmentAddress: React.PropTypes.string,
  departmentPhone: React.PropTypes.string,
  departmentState: React.PropTypes.string,
  departmentOther: React.PropTypes.string,
};

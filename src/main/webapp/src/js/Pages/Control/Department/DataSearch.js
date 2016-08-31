import React from 'react';
import { Row, Form, Input, Button } from 'antd';
const FormItem = Form.Item;

class DataSearch extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.setQuery(this.props.form.getFieldValue('departmentName'));
  }

  render() {
    const { getFieldProps } = this.props.form;
    return (
      <Row type="flex" justify="end">
        <Form inline onSubmit={this.handleSubmit}>
          <FormItem label="部门名称" >
            <Input placeholder="请输入部门名称" {...getFieldProps('departmentName')} />
          </FormItem>
          <Button type="primary" htmlType="submit">查找</Button>
        </Form>
      </Row>
    );
  }
}
DataSearch = Form.create({})(DataSearch);
export default DataSearch;
DataSearch.propTypes = {
  setQuery: React.PropTypes.func,
  form: React.PropTypes.object,
};

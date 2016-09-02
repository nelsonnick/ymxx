import { Modal, Button } from 'antd';
import React from 'react';
import LookForm from './LookForm';

export default class LookLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
    this.showModal = this.showModal.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  showModal() {
    this.setState({
      visible: true,
    });
  }

  handleCancel() {
    this.refs.LookForm.resetFields();
    this.setState({
      visible: false,
    });
  }

  render() {
    const { departmentId, departmentName, departmentPhone, departmentAddress, departmentState, departmentOther } = this.props;
    return (
      <span>
        <a onClick={this.showModal}>详情</a>
        <Modal
          maskClosable={false}
          title="详情"
          visible={this.state.visible}
          onOk={this.handleCancel}
          confirmLoading={this.state.confirmLoading}
          onCancel={this.handleCancel}
          footer={[
            <Button key="submit" type="primary" loading={this.state.loading} onClick={this.handleCancel}>返 回</Button>,
          ]}
        >
          <LookForm
            ref="LookForm"
            departmentId={departmentId}
            departmentName={departmentName}
            departmentAddress={departmentAddress}
            departmentPhone={departmentPhone}
            departmentState={departmentState}
            departmentOther={departmentOther}
          />
        </Modal>
      </span>
    );
  }
}
LookLink.propTypes = {
  departmentId: React.PropTypes.number,
  departmentName: React.PropTypes.string,
  departmentAddress: React.PropTypes.string,
  departmentPhone: React.PropTypes.string,
  departmentState: React.PropTypes.string,
  departmentOther: React.PropTypes.string,
};

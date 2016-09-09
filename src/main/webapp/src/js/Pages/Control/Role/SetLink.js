import { Modal, Button, notification } from 'antd';
import React from 'react';
import SetForm from './SetForm';
import * as AjaxFunction from '../../../Util/AjaxFunction.js';
import $ from 'jquery';

const openNotificationWithIcon = (type, msg, desc) => {
  notification[type]({
    message: msg,
    description: desc,
  });
};
export default class SetLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
    this.showModal = this.showModal.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  showModal() {
    this.setState(
      {
        visible: true,
      }
    );
  }
  handleOk() {
    $.ajax({
      'type': 'POST',
      'url': AjaxFunction.RoleSet,
      'dataType': 'text',
      'data': {
        'other': '',
      },
      'success': (data) => {
        if (data.toString() === 'OK') {
          this.setState({
            visible: false,
            confirmLoading: false,
          });
          // this.props.afterEdit();
          this.refs.SetForm.resetFields();
          openNotificationWithIcon('success', '修改成功', '修改成功，请进行后续操作');
        } else {
          openNotificationWithIcon('error', '修改失败', data.toString());
          this.setState({
            confirmLoading: false,
          });
        }
      },
      'error': () => {
        openNotificationWithIcon('error', '请求错误', '无法完成修改操作，请检查网络情况');
        this.setState({
          confirmLoading: false,
        });
      },
    });
  }
  handleReset() {
    this.refs.SetForm.resetFields();
  }
  handleCancel() {
    this.refs.SetForm.resetFields();
    this.setState({
      visible: false,
    });
  }

  render() {
    const { roleId, roleName, roleOther } = this.props;
    return (
      <span>
        <a onClick={this.showModal} className="btn btn-default btn-xs">权限设置</a>
        <Modal
          maskClosable={false}
          title="详情"
          visible={this.state.visible}
          onOk={this.handleCancel}
          confirmLoading={this.state.confirmLoading}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>返 回</Button>,
            <Button key="reset" type="ghost" size="large" onClick={this.handleReset}>重 置</Button>,
            <Button key="submit" type="primary" size="large" loading={this.state.loading} onClick={this.handleOk}>提 交</Button>,
          ]}
        >
          <SetForm
            ref="SetForm"
            roleId={roleId.toString()}
            roleName={roleName}
            roleOther={roleOther}
          />
        </Modal>
      </span>
    );
  }
}
SetLink.propTypes = {
  roleId: React.PropTypes.string,
  roleName: React.PropTypes.string,
  roleOther: React.PropTypes.string,
};

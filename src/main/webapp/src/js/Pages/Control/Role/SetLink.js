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
      tree: [],
    };
    this.showModal = this.showModal.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  showModal() {
    $.ajax({
      'type': 'POST',
      'url': AjaxFunction.RoleTree,
      'dataType': 'text',
      'success': (data) => {
        this.setState(
          {
            tree: eval(`(${data})`),
            visible: true,
          }
        );
      },
      'error': () => {
        openNotificationWithIcon('error', '请求错误', '无法获取部门信息，请检查网络情况');
        this.setState(
          {
            tree: '',
            visible: false,
          }
        );
      },
    });
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
            <Button key="submit" type="primary" loading={this.state.loading} onClick={this.handleCancel}>返 回</Button>,
          ]}
        >
          <SetForm
            ref="SetForm"
            roleId={roleId.toString()}
            roleName={roleName}
            roleOther={roleOther}
            tree={this.state.tree}
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

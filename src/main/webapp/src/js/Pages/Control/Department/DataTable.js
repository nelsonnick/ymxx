import React from 'react';
import { Table, Popconfirm, message, notification } from 'antd';
// import { Button } from 'react-bootstrap';
import { Button } from 'amazeui-react';
import $ from 'jquery';
import EditLink from './EditLink.js';
import LookLink from './LookLink.js';
import * as AjaxFunction from '../../../Util/AjaxFunction.js';
const openNotificationWithIcon = (type, msg, desc) => {
  notification[type]({
    message: msg,
    description: desc,
  });
};
export default class DataTable extends React.Component {
  constructor(props) {
    super(props);
    this.abandon = this.abandon.bind(this);
    this.active = this.active.bind(this);
    this.delete = this.delete.bind(this);
    this.cancel = this.cancel.bind(this);
    this.afterEdit = this.afterEdit.bind(this);
  }

  active(DepartmentId) {
    $.ajax({
      'type': 'POST',
      'url': AjaxFunction.DepartmentActive,
      'dataType': 'text',
      'data': {
        'id': DepartmentId,
      },
      'success': (data) => {
        if (data.toString() === 'OK') {
          this.props.afterState();
          openNotificationWithIcon('success', '激活成功', '激活成功，请进行后续操作');
        } else {
          openNotificationWithIcon('error', '激活失败', data.toString());
        }
      },
      'error': () => {
        openNotificationWithIcon('error', '请求错误', '无法完成修改操作，请检查网络情况');
      },
    });
  }

  abandon(DepartmentId) {
    $.ajax({
      'type': 'POST',
      'url': AjaxFunction.DepartmentAbandon,
      'dataType': 'text',
      'data': {
        'id': DepartmentId,
      },
      'success': (data) => {
        if (data.toString() === 'OK') {
          this.props.afterState();
          openNotificationWithIcon('success', '注销成功', '注销成功，请进行后续操作');
        } else {
          openNotificationWithIcon('error', '注销失败', data.toString());
        }
      },
      'error': () => {
        openNotificationWithIcon('error', '请求错误', '无法完成注销操作，请检查网络情况');
      },
    });
  }
  delete(DepartmentId) {
    $.ajax({
      'type': 'POST',
      'url': AjaxFunction.DepartmentDelete,
      'dataType': 'text',
      'data': {
        'id': DepartmentId,
      },
      'success': (data) => {
        if (data.toString() === 'OK') {
          this.props.afterDelete();
          openNotificationWithIcon('success', '删除成功', '删除成功，请进行后续操作');
        } else {
          openNotificationWithIcon('error', '删除失败', data.toString());
        }
      },
      'error': () => {
        openNotificationWithIcon('error', '请求错误', '无法完成修改操作，请检查网络情况');
      },
    });
  }
  afterEdit() {
    this.props.afterState();
  }
  cancel() {
    message.error('点击了取消');
  }
  render() {
    const { tableData, loading, rolePower } = this.props;

    const columns = [{
      title: '部门名称',
      dataIndex: 'name',
      key: 'name',
      width: 150,
    }, {
      title: '办公电话',
      dataIndex: 'phone',
      key: 'phone',
      width: 150,
    }, {
      title: '办公地点',
      dataIndex: 'address',
      key: 'address',
      width: 200,
    }, {
      title: '当前状态',
      dataIndex: 'state',
      key: 'state',
      width: 100,
    }, {
      title: '操作',
      key: 'operation',
      width: 150,
      render: (text, record) => {
        const operate = [];
        if (rolePower.indexOf('LokDept,') >= 0) {
          operate.push(
            <LookLink
              departmentId={record.id}
              departmentName={record.name}
              departmentAddress={record.address}
              departmentPhone={record.phone}
              departmentState={record.state}
              departmentOther={record.other}
            />
          );
          operate.push(<span className="ant-divider" />);
        } else {
          operate.push(<span>&nbsp;</span>);
        }
// xiamianyaojixu
// kjkhk
        operate.push(
          <EditLink
            departmentId={record.id}
            departmentName={record.name}
            departmentAddress={record.address}
            departmentPhone={record.phone}
            departmentState={record.state}
            departmentOther={record.other}
            afterEdit={this.afterEdit}
          />
        );
        operate.push(<span className="ant-divider" />);
        if (record.state.toString() === '激活') {
          operate.push(<Popconfirm title={`确定要注销部门<${record.name}>？`} okText="注销" onConfirm={this.abandon.bind(this, record.id)} onCancel={this.cancel}>
            <Button className="am-btn am-btn-success am-round am-btn-xs">注销</Button>
          </Popconfirm>);
          operate.push(<span className="ant-divider" />);
        } else if (record.state.toString() === '注销') {
          operate.push(<Popconfirm title={`确定要激活部门<${record.name}>？`} okText="激活" onConfirm={this.active.bind(this, record.id)} onCancel={this.cancel}>
            <a href="#">激活</a>
          </Popconfirm>);
          operate.push(<span className="ant-divider" />);
        } else {
          operate.push(<span className="ant-divider" />);
        }
        operate.push(<Popconfirm title={`确定要删除部门<${record.name}>？`} okText="删除" onConfirm={this.delete.bind(this, record.id)} onCancel={this.cancel}>
          <a href="#">删除</a>
        </Popconfirm>);
        operate.push(<span className="ant-divider" />);
        return (
          <span>
            {operate}
          </span>
        );
      },
    }];

    return (
      <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)' }}>
        <Table
          scroll={{ y: 480 }}
          useFixedHeader="true"
          rowKey={record => record.id}
          columns={columns}
          dataSource={tableData}
          loading={loading}
          pagination={false}
        />
      </div>
    );
  }
}

DataTable.propTypes = {
  tableData: React.PropTypes.array,
  afterState: React.PropTypes.func,
  afterEdit: React.PropTypes.func,
  afterDelete: React.PropTypes.func,
  loading: React.PropTypes.bool,
  rolePower: React.PropTypes.string,
};

import React from 'react';
import { Row, Col, notification } from 'antd';
import DataTable from './DataTable.js';
import DataSearch from './DataSearch.js';
import DataPagination from './DataPagination.js';
import AddButton from './AddButton.js';
import * as AjaxFunction from '../../../Util/AjaxFunction.js';
import $ from 'jquery';
// const tableDat = [
//   { key: '1',
//     name: '胡彦斌',
//     phone: '0531-87654321',
//     address: '西湖区湖底公园1号',
//     state: '注销',
//   },
//   { key: '2',
//     name: '李大嘴',
//     phone: '0531-87654321',
//     address: '西湖区湖底公园2号',
//     state: '激活',
//   },
// ];

const openNotificationWithIcon = (type, msg, desc) => {
  notification[type]({
    message: msg,
    description: desc,
  });
};

export default class DepCont extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      DataTable: [],     // 当前页的具体数据
      PageSize: '10',    // 当前每页的条数
      PageNumber: '1',   // 当前页的页码
      DataCount: '0',    // 当前数据的总数量
      QueryString: '',   // 当前的搜索字符
    };
    this.getQuery = this.getQuery.bind(this);
    this.onShowSizeChange = this.onShowSizeChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.PageChange = this.PageChange.bind(this);
    this.AfterDelete = this.AfterDelete.bind(this);
    this.AfterAdd = this.AfterAdd.bind(this);
    this.AfterEditAndState = this.AfterEditAndState.bind(this);
  }

  componentWillMount() {
    $.ajax({
      'type': 'POST',
      'url': AjaxFunction.DepartmentQuery,
      'dataType': 'json',
      'data': {
        'PageNumber': '1',
        'PageSize': '10',
        'QueryString': '',
      },
      'success': (data) => {
        this.setState(
          {
            DataTable: data,
            PageNumber: '1',
            PageSize: '10',
            QueryString: '',
          }
        );
      },
      'error': () => {
        openNotificationWithIcon('error', '请求错误', '无法完成刷新列表，请检查网络情况');
        // this.setState(
        //   {
        //     DataTable: tableDat, // 这里暂时用演示数据
        //   }
        // );
      },
    });
    $.ajax({
      'type': 'POST',
      'url': AjaxFunction.DepartmentTotalCount,
      'dataType': 'json',
      'data': {
        'PageNumber': this.state.PageNumber,
        'PageSize': this.state.PageSize,
        'QueryString': this.state.QueryString,
      },
      'success': (data) => {
        this.setState(
          {
            DataCount: data,
          }
        );
      },
      'error': () => {
        openNotificationWithIcon('error', '请求错误', '无法完成数据读取，请检查网络情况');
        this.setState(
          {
            DataCount: '0',
          }
        );
      },
    });
  }
  onChange(PageNumbers) {
    $.ajax({
      'type': 'POST',
      'url': AjaxFunction.DepartmentQuery,
      'dataType': 'json',
      'data': {
        'PageNumber': PageNumbers,
        'PageSize': this.state.PageSize,
        'QueryString': this.state.QueryString,
      },
      'success': (data) => {
        this.setState(
          {
            DataTable: data,
            PageNumber: PageNumbers,
          }
        );
      },
      'error': () => {
        openNotificationWithIcon('error', '请求错误', '无法完成刷新列表，请检查网络情况');
        this.setState(
          {
            DataTable: [],
          }
        );
      },
    });
  }
  onShowSizeChange(PageNumbers, PageSizes) {
    $.ajax({
      'type': 'POST',
      'url': AjaxFunction.DepartmentQuery,
      'dataType': 'json',
      'data': {
        'PageNumber': PageNumbers,
        'PageSize': PageSizes,
        'QueryString': this.state.QueryString,
      },
      'success': (data) => {
        this.setState(
          {
            DataTable: data,
            PageNumber: PageNumbers,
            PageSize: PageSizes,
          }
        );
      },
      'error': () => {
        openNotificationWithIcon('error', '请求错误', '无法完成刷新列表，请检查网络情况');
        this.setState(
          {
            DataTable: [],
          }
        );
      },
    });
  }
  getQuery(QueryStrings = '') {
    $.ajax({
      'type': 'POST',
      'url': AjaxFunction.DepartmentQuery,
      'dataType': 'json',
      'data': {
        'PageNumber': '1',
        'PageSize': this.state.PageSize,
        'QueryString': QueryStrings,
      },
      'success': (data) => {
        this.setState(
          {
            PageNumber: '1',
            DataTable: data,
            QueryString: QueryStrings,
          }
        );
      },
      'error': () => {
        openNotificationWithIcon('error', '请求错误', '无法完成刷新列表，请检查网络情况');
        this.setState(
          {
            DataTable: [],
          }
        );
      },
    });
    console.log(this.state.DataCount);
    $.ajax({
      'type': 'POST',
      'url': AjaxFunction.DepartmentTotalCount,
      'dataType': 'json',
      'data': {
        'QueryString': this.state.QueryString,
      },
      'success': (data) => {
        this.setState(
          {
            DataCount: data,
          }
        );
      },
      'error': () => {
        openNotificationWithIcon('error', '请求错误', '无法完成数据读取，请检查网络情况');
        this.setState(
          {
            DataCount: '0',
          }
        );
      },
    });
    console.log(this.state.DataCount);
  }
  PageChange(page) {
    this.setState({
      PageNumber: page,
    });
    $.ajax({
      'type': 'POST',
      'url': AjaxFunction.DepartmentQuery,
      'dataType': 'json',
      'data': {
        'PageNumber': this.state.PageNumber,
        'PageSize': this.state.PageSize,
        'QueryString': this.state.QueryString,
      },
      'success': (data) => {
        this.setState(
          {
            DataTable: data,
          }
        );
      },
      'error': () => {
        openNotificationWithIcon('error', '请求错误', '无法完成刷新列表，请检查网络情况');
        this.setState(
          {
            DataTable: [],
          }
        );
      },
    });
  }
  AfterDelete() {
    $.ajax({
      'type': 'POST',
      'url': AjaxFunction.DepartmentQuery,
      'dataType': 'json',
      'data': {
        'PageNumber': this.state.PageNumber,
        'PageSize': this.state.PageSize,
        'QueryString': this.state.QueryString,
      },
      'success': (data) => {
        this.setState(
          {
            DataTable: data,
          }
        );
      },
      'error': () => {
        openNotificationWithIcon('error', '请求错误', '无法完成刷新列表，请检查网络情况');
        this.setState(
          {
            DataTable: [],
          }
        );
      },
    });
    $.ajax({
      'type': 'POST',
      'url': AjaxFunction.DepartmentTotalCount,
      'dataType': 'json',
      'success': (data) => {
        this.setState(
          {
            DataCount: data,
          }
        );
      },
      'error': () => {
        openNotificationWithIcon('error', '请求错误', '无法完成数据读取，请检查网络情况');
        this.setState(
          {
            DataCount: '0',
          }
        );
      },
    });
  }
  AfterAdd() {
    $.ajax({
      'type': 'POST',
      'url': AjaxFunction.DepartmentQuery,
      'dataType': 'json',
      'data': {
        'PageNumber': '1',
        'PageSize': this.state.PageSize,
        'QueryString': '',
      },
      'success': (data) => {
        this.setState(
          {
            DataTable: data,
          }
        );
      },
      'error': () => {
        openNotificationWithIcon('error', '请求错误', '无法完成刷新列表，请检查网络情况');
        this.setState(
          {
            DataTable: [],
          }
        );
      },
    });
    $.ajax({
      'type': 'POST',
      'url': AjaxFunction.DepartmentTotalCount,
      'dataType': 'json',
      'success': (data) => {
        this.setState(
          {
            DataCount: data,
          }
        );
      },
      'error': () => {
        openNotificationWithIcon('error', '请求错误', '无法完成数据读取，请检查网络情况');
        this.setState(
          {
            DataCount: '0',
          }
        );
      },
    });
  }

  AfterEditAndState() {
    $.ajax({
      'type': 'POST',
      'url': AjaxFunction.DepartmentPaginate,
      'dataType': 'json',
      'data': {
        'PageNumber': this.state.PageNumber,
        'PageSize': this.state.PageSize,
        'QueryString': this.state.QueryString,
      },
      'success': (data) => {
        this.setState(
          {
            DataTable: data,
          }
        );
      },
      'error': () => {
        openNotificationWithIcon('error', '请求错误', '无法完成刷新列表，请检查网络情况');
        this.setState(
          {
            DataTable: [],
          }
        );
      },
    });
  }

  render() {
    return (
      <div>
        <Row type="flex" justify="start">
          <Col span={12}><AddButton /></Col>
          <Col span={12}><DataSearch setQuery={this.getQuery} /></Col>
        </Row>
        <Row>
          <span style={{ 'font-size': '5px' }}>&nbsp;&nbsp;&nbsp;</span>
        </Row>
        <Row>
          <DataTable tableData={this.state.DataTable} />
        </Row>
        <Row>
          <span style={{ 'font-size': '20px' }}>&nbsp;&nbsp;&nbsp;</span>
        </Row>
        <Row>
          <DataPagination PageNumber={this.state.PageNumber} onShowSizeChange={this.onShowSizeChange} onChange={this.onChange} DataCount={this.state.DataCount} />
        </Row>
      </div>
    );
  }
}

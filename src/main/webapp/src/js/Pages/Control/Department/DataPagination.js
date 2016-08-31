import React from 'react';
import { Pagination, Select, Row } from 'antd';

export default class DataPagination extends React.Component {
  render() {
    const { DataCount, onShowSizeChange, onChange, PageNumber } = this.props;
    return (
      <Row type="flex" justify="end">
        <Pagination
          showQuickJumper
          showSizeChanger
          onShowSizeChange={onShowSizeChange}
          onChange={onChange}
          defaultCurrent={1}
          total={DataCount}
          PageNow={PageNumber}
          showTotal={total => `共 ${total} 条`}
          selectComponentClass={Select}
        />
      </Row>
    );
  }
}
DataPagination.propTypes = {
  DataCount: React.PropTypes.string,
  PageNumber: React.PropTypes.string,
  onShowSizeChange: React.PropTypes.func,
  onChange: React.PropTypes.func,
};

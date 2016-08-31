import React from 'react';
import { Pagination, Select, Row } from 'antd';

export default class DataPagination extends React.Component {
  render() {
    const { DataCount, onShowSizeChange, PageNow } = this.props;
    return (
      <Row type="flex" justify="end">
        <Pagination
          showQuickJumper
          showSizeChanger
          onShowSizeChange={onShowSizeChange}
          defaultCurrent={1}
          total={DataCount}
          PageNow={PageNow}
          showTotal={total => `共 ${total} 条`}
          selectComponentClass={Select}
        />
      </Row>
    );
  }
}
DataPagination.propTypes = {
  DataCount: React.PropTypes.string,
  PageNow: React.PropTypes.string,
  onShowSizeChange: React.PropTypes.func,
};

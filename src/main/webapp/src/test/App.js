import React from 'react';
import ReactDOM from 'react-dom';
import { Popconfirm, message } from 'antd';
function confirm(test) {
  console.log(test);
}

function cancel() {
  confirm('c');
  message.error('点击了取消');
}

ReactDOM.render(<Popconfirm title="确定要删除这个任务吗？" onCancel={cancel}>
  <a href="#">删除</a>
</Popconfirm>, document.body);

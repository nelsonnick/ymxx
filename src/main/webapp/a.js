import React from 'react';
import ReactDOM from 'react-dom';
import { DatePicker,Button  } from 'antd';
import 'antd/dist/antd.css';

ReactDOM.render(<div>

    <Button type="primary">主按钮</Button>
    <Button>次按钮</Button>
    <Button type="ghost">幽灵按钮</Button>
    <Button type="dashed">虚线按钮</Button>
    <DatePicker />
    </div>, document.getElementById('s'));

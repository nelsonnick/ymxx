import React from 'react';
import ReactDOM from 'react-dom';

var HelloWorld = React.createClass({
    render: function () {return (<div>Hello WTS</div>);}
});

ReactDOM.render(<HelloWorld/>,document.getElementById('t'));

import SystemMenu from '../Component/SystemMenu.js';
import React from 'react';

export default class Left extends React.Component {

  constructor(props) {
    super(props);
    this.setMenuLabel = this.setMenuLabel.bind(this);
  }

  setMenuLabel(labelName) {
    this.props.menuLabel(labelName);
  }

  render() {
    return (
      <SystemMenu menuLabel={this.setMenuLabel} rolePower={this.props.rolePower} />
    );
  }
}
Left.propTypes = {
  menuLabel: React.PropTypes.func,
  rolePower: React.PropTypes.string,
};

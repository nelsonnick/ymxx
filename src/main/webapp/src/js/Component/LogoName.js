import React from 'react';
const a = {
  'font-size': '45px',
  color: '#00A0E8',
};
function LogoName({ name }) {
  return <div style={a} >{name}</div>;
}

LogoName.propTypes = {
  name: React.PropTypes.required,
};

export default LogoName;

import React from 'react';
import Blank from '../Pages/Others/Blank.js';
import DocInfo from '../Pages/Document/Information/DocInfo.js';
import DocChan from '../Pages/Document/Change/DocChan.js';
import DocFlow from '../Pages/Document/Flow/DocFlow.js';
import PerInfo from '../Pages/Person/Information/PerInfo.js';
import PerChan from '../Pages/Person/Change/PerChan.js';
import DocAnal from '../Pages/Analysis/Document/DocAnal.js';
import PerAnal from '../Pages/Analysis/Person/PerAnal.js';
import OpeAnal from '../Pages/Analysis/Operation/OpeAnal.js';
import PasCont from '../Pages/Control/Password/PassCont.js';
import DepCont from '../Pages/Control/Department/Main.js';
import UseCont from '../Pages/Control/User/UserCont.js';
import RolCont from '../Pages/Control/Role/RoleCont.js';
export default class Right extends React.Component {
  render() {
    let tableCase;
    switch (this.props.menuFunctionType) {
      case 'DocInfo':
        tableCase = <DocInfo rolePower={this.props.rolePower} />;
        break;
      case 'DocChan':
        tableCase = <DocChan rolePower={this.props.rolePower} />;
        break;
      case 'DocFlow':
        tableCase = <DocFlow rolePower={this.props.rolePower} />;
        break;
      case 'PerInfo':
        tableCase = <PerInfo rolePower={this.props.rolePower} />;
        break;
      case 'PerChan':
        tableCase = <PerChan rolePower={this.props.rolePower} />;
        break;
      case 'DocAnal':
        tableCase = <DocAnal rolePower={this.props.rolePower} />;
        break;
      case 'PerAnal':
        tableCase = <PerAnal rolePower={this.props.rolePower} />;
        break;
      case 'OpeAnal':
        tableCase = <OpeAnal rolePower={this.props.rolePower} />;
        break;
      case 'PasCont':
        tableCase = <PasCont rolePower={this.props.rolePower} />;
        break;
      case 'DepCont':
        tableCase = <DepCont rolePower={this.props.rolePower} />;
        break;
      case 'UseCont':
        tableCase = <UseCont rolePower={this.props.rolePower} />;
        break;
      case 'RolCont':
        tableCase = <RolCont rolePower={this.props.rolePower} />;
        break;
      default:
        tableCase = <Blank rolePower={this.props.rolePower} />;
    }

    return (
      <div>
        {tableCase}
      </div>
    );
  }
}
Right.propTypes = {
  menuFunctionType: React.PropTypes.string,
  rolePower: React.PropTypes.string,
};

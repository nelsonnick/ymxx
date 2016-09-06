import React from 'react';
import { Form, Input, Select, Cascader } from 'antd';
import $ from 'jquery';
const FormItem = Form.Item;
const Option = Select.Option;
import * as AjaxFunction from '../../../Util/AjaxFunction.js';
// const openNotificationWithIcon = (type, msg, desc) => {
//   notification[type]({
//     message: msg,
//     description: desc,
//   });
// };

const op = [{ value: '1', label: '槐荫区职业介绍中心', children: [{ value: '3', label: '西市场人社中心', }, { value: '4', label: '五里沟人社中心', }, { value: '5', label: '道德街人社中心', }, { value: '6', label: '营市街人社中心', }, { value: '7', label: '青年公园人社中心', }, { value: '8', label: '中大槐树人社中心', }, { value: '9', label: '振兴街人社中心', }, { value: '10', label: '南辛庄人社中心', }, { value: '11', label: '段店北路人社中心', }, { value: '12', label: '匡山人社中心', }, { value: '13', label: '张庄人社中心', }, { value: '14', label: '美里湖人社中心', }, { value: '15', label: '吴家堡人社中心', }, { value: '16', label: '腊山人社中心', }, { value: '17', label: '玉清湖人社中心', }, { value: '18', label: '兴福人社中心', },], },{ value: '2', label: '槐荫区人才交流', },{ value: '19', label: '市中区就业办', children: [{ value: '20', label: '四里村人社中心', }, { value: '21', label: '大观园人社中心', }, { value: '22', label: '杆石桥人社中心', }, { value: '23', label: '魏家庄人社中心', }, { value: '24', label: '泺源人社中心', }, { value: '25', label: '六里山人社中心', }, { value: '26', label: '二七新村人社中心', }, { value: '27', label: '七里山人社中心', }, { value: '28', label: '舜玉人社中心', }, { value: '29', label: '舜耕人社中心', }, { value: '30', label: '王官庄人社中心', }, { value: '31', label: '白马山人社中心', }, { value: '32', label: '七贤人社中心', }, { value: '33', label: '十六里河人社中心', }, { value: '34', label: '兴隆人社中心', }, { value: '35', label: '党家人社中心', }, { value: '36', label: '陡沟人社中心', },], },{ value: '37', label: '天桥区就业办', children: [{ value: '38', label: '堤口路人社中心', }, { value: '39', label: '制锦市人社中心', }, { value: '40', label: '纬北路人社中心', }, { value: '41', label: '工人新村北村人社', }, { value: '42', label: '工人新村南村人社', }, { value: '43', label: '官扎营人社中心', }, { value: '44', label: '宝华街人社中心', }, { value: '45', label: '北坦街人社中心', }, { value: '46', label: '天桥东街人社中心', }, { value: '47', label: '无影山人社中心', }, { value: '48', label: '药山人社中心', }, { value: '49', label: '北园人社中心', }, { value: '50', label: '泺口人社中心', }, { value: '51', label: '桑梓店人社中心', }, { value: '52', label: '大桥人社中心', },], }, ];

class AddFrom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: '',
    };
    this.departmentNameCheck = this.departmentNameCheck.bind(this);
    this.departmentPhoneCheck = this.departmentPhoneCheck.bind(this);
    this.departmentAddressCheck = this.departmentAddressCheck.bind(this);
  }
  // componentWillMount() {
  //   $.ajax({
  //     'type': 'POST',
  //     'url': AjaxFunction.DepartmentCascade,
  //     'dataType': 'text',
  //     'success': (data) => {
  //       this.setState(
  //         {
  //           options: data,
  //         }
  //       );
  //       console.log(this.state.options);
  //     },
  //     'error': () => {
  //       openNotificationWithIcon('error', '请求错误', '无法完成刷新列表，请检查网络情况');
  //       this.setState(
  //         {
  //           options: '',
  //         }
  //       );
  //     },
  //   });
  // }
  departmentNameCheck(rule, value, callback) {
    if (!value) {
      callback();
    } else {
      $.ajax({
        'type': 'POST',
        'url': AjaxFunction.DepartmentName,
        'dataType': 'text',
        'data': { 'name': value },
        'success': (data) => {
          if (data.toString() === 'OK') {
            callback();
          } else {
            callback(new Error(data.toString()));
          }
        },
        'error': () => {
          callback(new Error('无法执行后台验证，请重试'));
        },
      });
    }
  }
  departmentPhoneCheck(rule, value, callback) {
    if (!value) {
      callback();
    } else {
      $.ajax({
        'type': 'POST',
        'url': AjaxFunction.DepartmentPhone,
        'dataType': 'text',
        'data': { 'phone': value },
        'success': (data) => {
          if (data.toString() === 'OK') {
            callback();
          } else {
            callback(new Error(data.toString()));
          }
        },
        'error': () => {
          callback(new Error('无法执行后台验证，请重试'));
        },
      });
    }
  }
  departmentAddressCheck(rule, value, callback) {
    if (!value) {
      callback();
    } else {
      $.ajax({
        'type': 'POST',
        'url': AjaxFunction.DepartmentAddress,
        'dataType': 'text',
        'data': { 'address': value },
        'success': (data) => {
          if (data.toString() === 'OK') {
            callback();
          } else {
            callback(new Error(data.toString()));
          }
        },
        'error': () => {
          callback(new Error('无法执行后台验证，请重试'));
        },
      });
    }
  }
  render() {
    const { getFieldProps, getFieldError, isFieldValidating } = this.props.form;

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const departmentNameProps = getFieldProps('departmentName', {
      rules: [
        { required: true, whitespace: true, message: '必填项' },
        { validator: this.departmentNameCheck },
      ],
    });
    const departmentPhoneProps = getFieldProps('departmentPhone', {
      rules: [
        { required: true, whitespace: true, message: '必填项' },
        { validator: this.departmentPhoneCheck },
      ],
    });
    const departmentAddressProps = getFieldProps('departmentAddress', {
      rules: [
        { required: true, whitespace: true, message: '必填项' },
        { validator: this.departmentAddressCheck },
      ],
    });
    const departmentFatherProps = getFieldProps('departmentFather', {
    });
    const departmentStateProps = getFieldProps('departmentState', {
      initialValue: '激活',
    });
    const departmentOtherProps = getFieldProps('departmentOther', {
    });
    return (
      <Form horizontal>
        <FormItem
          label="部门名称"
          {...formItemLayout}
          hasFeedback
          required
          help={isFieldValidating('departmentName') ? '校验中...' : (getFieldError('departmentName') || [])}
        >
          <Input placeholder="请输入部门的中文全称" {...departmentNameProps} />
        </FormItem>
        <FormItem
          label="部门电话"
          {...formItemLayout}
          hasFeedback
          required
          help={isFieldValidating('departmentPhone') ? '校验中...' : (getFieldError('departmentPhone') || [])}
        >
          <Input placeholder="请输入8位固定电话" {...departmentPhoneProps} />
        </FormItem>
        <FormItem
          label="部门地址"
          {...formItemLayout}
          hasFeedback
          required
          help={isFieldValidating('departmentAddress') ? '校验中...' : (getFieldError('departmentAddress') || [])}
        >
          <Input placeholder="请输入详细地址" {...departmentAddressProps} />
        </FormItem>
        <FormItem
          label="上级部门"
          {...formItemLayout}
          required
        >
          <Cascader options={op} changeOnSelect placeholder="请选择上级部门" {...departmentFatherProps} />
        </FormItem>
        <FormItem
          label="部门状态"
          {...formItemLayout}
          required
        >
          <Select size="large" {...departmentStateProps} >
            <Option value="激活">激活</Option>
            <Option value="注销">注销</Option>
          </Select>
        </FormItem>
        <FormItem
          label="其他信息"
          {...formItemLayout}
          hasFeedback
        >
          <Input type="textarea" rows="3" placeholder="其他需要填写的信息" {...departmentOtherProps} />
        </FormItem>
      </Form>
    );
  }
}
AddFrom = Form.create({})(AddFrom);
export default AddFrom;
AddFrom.propTypes = {
  form: React.PropTypes.object,
};

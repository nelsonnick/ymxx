/*
Navicat MySQL Data Transfer

Source Server         : 档案
Source Server Version : 50713
Source Host           : localhost:3306
Source Database       : ymxx

Target Server Type    : MYSQL
Target Server Version : 50713
File Encoding         : 65001

Date: 2016-09-09 16:11:54
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for department
-- ----------------------------
DROP TABLE IF EXISTS `department`;
CREATE TABLE `department` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `other` varchar(255) DEFAULT NULL,
  `level` int(11) DEFAULT NULL,
  `father` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `father_id` (`father`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of department
-- ----------------------------
INSERT INTO `department` VALUES ('1', '顶级部门', '', '', '激活', '', '0', null);
INSERT INTO `department` VALUES ('2', '槐荫区职业介绍中心', '87957286', '北小辛庄西街24号', '激活', '', '1', '1');
INSERT INTO `department` VALUES ('3', '西市场人社中心', '87939268', '经三路291号(市华联南)', '激活', '', '2', '2');
INSERT INTO `department` VALUES ('4', '五里沟人社中心', '87920528', '经四纬八路478号(海佑重华东临)', '激活', '', '2', '2');
INSERT INTO `department` VALUES ('5', '道德街人社中心', '87958181', '经六路538号(槐荫区文体中心)-1楼', '激活', '', '2', '2');
INSERT INTO `department` VALUES ('6', '营市街人社中心', '87188556', '营市西街29号(老皮鞋厂)', '激活', '', '2', '2');
INSERT INTO `department` VALUES ('7', '青年公园人社中心', '87912400', '岔路街111号(槐荫国税对面)', '激活', '', '2', '2');
INSERT INTO `department` VALUES ('8', '中大槐树人社中心', '87163043', '经四路681号(十二中对面)', '激活', '', '2', '2');
INSERT INTO `department` VALUES ('9', '振兴街人社中心', '87106819', '经十路23237号振兴花园(振兴街综合惠民服务中心)', '激活', '', '2', '2');
INSERT INTO `department` VALUES ('10', '南辛庄人社中心', '87190681', '南辛中街70号(南辛派出所西邻)', '激活', '', '2', '2');
INSERT INTO `department` VALUES ('11', '段店北路人社中心', '87525356', '段兴西路8号(段店北路街道办事处内)', '激活', '', '2', '2');
INSERT INTO `department` VALUES ('12', '匡山人社中心', '85985498', '匡山小区外海商铺10号', '激活', '', '2', '2');
INSERT INTO `department` VALUES ('13', '张庄人社中心', '87524298', '段北路157号(张庄办事处内)', '激活', '', '2', '2');
INSERT INTO `department` VALUES ('14', '美里湖人社中心', '85993679', '西沙小区美里湖惠民服务大厅(美里湖办事处对面)', '激活', '', '2', '2');
INSERT INTO `department` VALUES ('15', '吴家堡人社中心', '85982386', '济齐路149号(吴家堡办事处对面)', '激活', '', '2', '2');
INSERT INTO `department` VALUES ('16', '腊山人社中心', '87589089', '济兖路462号(腊山办事处附属楼)', '激活', '', '2', '2');
INSERT INTO `department` VALUES ('17', '玉清湖人社中心', '87589791', '经十路3333号(玉清湖办事处内)', '激活', '', '2', '2');
INSERT INTO `department` VALUES ('18', '兴福人社中心', '87589491', '齐州路兴福佳苑东门北200米', '激活', '', '2', '2');
INSERT INTO `department` VALUES ('19', '市中区就业办', '58698570', '英雄山路8号', '激活', '', '1', '1');
INSERT INTO `department` VALUES ('20', '四里村人社中心', '82900255', '英雄山路10-2号（八一国美后面）', '激活', '', '2', '19');
INSERT INTO `department` VALUES ('21', '大观园人社中心', '87081155', '经五小纬二路53-3号', '激活', '', '2', '19');
INSERT INTO `department` VALUES ('22', '杆石桥人社中心', '82078259', '乐山南区6号', '激活', '', '2', '19');
INSERT INTO `department` VALUES ('23', '魏家庄人社中心', '86108265', '馆驿街新区8号楼', '激活', '', '2', '19');
INSERT INTO `department` VALUES ('24', '泺源人社中心', '86115001', '经八路东头（民族市场对面）', '激活', '', '2', '19');
INSERT INTO `department` VALUES ('25', '六里山人社中心', '82569259', '玉函路266号（伟东四区附近）', '激活', '', '2', '19');
INSERT INTO `department` VALUES ('26', '二七新村人社中心', '82861735', '陈庄大街16号', '激活', '', '2', '19');
INSERT INTO `department` VALUES ('27', '七里山人社中心', '82746599', '七里山西路15-3（市残联对面）', '激活', '', '2', '19');
INSERT INTO `department` VALUES ('28', '舜玉人社中心', '82746612', '舜玉南区101号楼南侧', '激活', '', '2', '19');
INSERT INTO `department` VALUES ('29', '舜耕人社中心', '89737732', '阳光舜城5区6号楼', '激活', '', '2', '19');
INSERT INTO `department` VALUES ('30', '王官庄人社中心', '87197255', '青龙山北路东头', '激活', '', '2', '19');
INSERT INTO `department` VALUES ('31', '白马山人社中心', '87191829', '白马山西路39号', '激活', '', '2', '19');
INSERT INTO `department` VALUES ('32', '七贤人社中心', '87192884', '济微路118号', '激活', '', '2', '19');
INSERT INTO `department` VALUES ('33', '十六里河人社中心', '82791186', '英雄山南路39号', '激活', '', '2', '19');
INSERT INTO `department` VALUES ('34', '兴隆人社中心', '82792825', '二环南路兴隆名酒市场对面', '激活', '', '2', '19');
INSERT INTO `department` VALUES ('35', '党家人社中心', '87591820', '104国道镇政府东侧', '激活', '', '2', '19');
INSERT INTO `department` VALUES ('36', '陡沟人社中心', '87599812', '都够村北', '激活', '', '2', '19');
INSERT INTO `department` VALUES ('37', '天桥区就业办', '85954390', '无影山东路31号', '激活', '', '1', '1');
INSERT INTO `department` VALUES ('38', '堤口路人社中心', '85980664', '无影山西路9号', '激活', '', '2', '37');
INSERT INTO `department` VALUES ('39', '制锦市人社中心', '81601038', '锦屏街8号', '激活', '', '2', '37');
INSERT INTO `department` VALUES ('40', '纬北路人社中心', '55692062', '盛世名门小区5号楼旁', '激活', '', '2', '37');
INSERT INTO `department` VALUES ('41', '工人新村北村人社', '85872771', '标山小区7号楼西侧', '激活', '', '2', '37');
INSERT INTO `department` VALUES ('42', '工人新村南村人社', '85872876', '济洛路123号', '激活', '', '2', '37');
INSERT INTO `department` VALUES ('43', '官扎营人社中心', '85911890', '济洛路154-12号', '激活', '', '2', '37');
INSERT INTO `department` VALUES ('44', '宝华街人社中心', '85064494', '官扎营西街宝丰巷9号', '激活', '', '2', '37');
INSERT INTO `department` VALUES ('45', '北坦街人社中心', '81778115', '北坦大街25号', '激活', '', '2', '37');
INSERT INTO `department` VALUES ('46', '天桥东街人社中心', '85872892', '义合西街3号', '激活', '', '2', '37');
INSERT INTO `department` VALUES ('47', '无影山人社中心', '85872783', '无影山东路10号', '激活', '', '2', '37');
INSERT INTO `department` VALUES ('48', '药山人社中心', '85768609', '药山办事处西一站路南张庄商业街', '激活', '', '2', '37');
INSERT INTO `department` VALUES ('49', '北园人社中心', '85869200', '西泺河路18号', '激活', '', '2', '37');
INSERT INTO `department` VALUES ('50', '泺口人社中心', '85736538', '泺安路11号太平洋小区', '激活', '', '2', '37');
INSERT INTO `department` VALUES ('51', '桑梓店人社中心', '88077817', '桑梓店镇政府西40米文体中心1楼', '激活', '', '2', '37');
INSERT INTO `department` VALUES ('52', '大桥人社中心', '88097645', '大桥镇政府建委1楼', '激活', '', '2', '37');
INSERT INTO `department` VALUES ('53', '槐荫区人才交流中心', '87954100', '营市东街24号', '激活', '', '1', '1');

-- ----------------------------
-- Table structure for power
-- ----------------------------
DROP TABLE IF EXISTS `power`;
CREATE TABLE `power` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ename` varchar(255) DEFAULT NULL,
  `cname` varchar(255) DEFAULT NULL,
  `level` int(11) DEFAULT NULL,
  `father` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of power
-- ----------------------------
INSERT INTO `power` VALUES ('1', 'Document', '档案管理', '1', '0');
INSERT INTO `power` VALUES ('2', 'Person', '人员管理', '1', '0');
INSERT INTO `power` VALUES ('3', 'Analysis', '统计分析', '1', '0');
INSERT INTO `power` VALUES ('4', 'Control', '系统管理', '1', '0');
INSERT INTO `power` VALUES ('5', 'DocInfo', '档案信息', '2', '1');
INSERT INTO `power` VALUES ('6', 'DocChan', '档案变更', '2', '1');
INSERT INTO `power` VALUES ('7', 'DocFlow', '档案流动', '2', '1');
INSERT INTO `power` VALUES ('8', 'PerInfo', '人员信息', '2', '2');
INSERT INTO `power` VALUES ('9', 'PerChan', '信息变更', '2', '2');
INSERT INTO `power` VALUES ('10', 'DocAnal', '档案分析', '2', '3');
INSERT INTO `power` VALUES ('11', 'PerAnal', '人员分析', '2', '3');
INSERT INTO `power` VALUES ('12', 'OpeAnal', '业务分析', '2', '3');
INSERT INTO `power` VALUES ('13', 'PasCont', '密码管理', '2', '4');
INSERT INTO `power` VALUES ('14', 'DepCont', '部门管理', '2', '4');
INSERT INTO `power` VALUES ('15', 'UseCont', '用户管理', '2', '4');
INSERT INTO `power` VALUES ('16', 'RolCont', '角色管理', '2', '4');
INSERT INTO `power` VALUES ('17', 'LodDept', '查看部门', '3', '14');
INSERT INTO `power` VALUES ('18', 'AddDept', '添加部门', '3', '14');
INSERT INTO `power` VALUES ('19', 'QuyDept', '查询部门', '3', '14');
INSERT INTO `power` VALUES ('20', 'GetDept', '获取列表', '3', '14');
INSERT INTO `power` VALUES ('21', 'EdiDept', '修改部门', '3', '14');
INSERT INTO `power` VALUES ('22', 'ActDept', '激活部门', '3', '14');
INSERT INTO `power` VALUES ('23', 'AbdDept', '注销部门', '3', '14');
INSERT INTO `power` VALUES ('24', 'DelDept', '删除部门', '3', '14');
INSERT INTO `power` VALUES ('25', 'AddRole', '添加用户', '3', '16');
INSERT INTO `power` VALUES ('26', 'QuyRole', '查询用户', '3', '16');
INSERT INTO `power` VALUES ('27', 'GetRole', '获取列表', '3', '16');
INSERT INTO `power` VALUES ('28', 'EdiRole', '修改用户', '3', '16');
INSERT INTO `power` VALUES ('29', 'SetRole', '设置权限', '3', '16');
INSERT INTO `power` VALUES ('30', 'DelRole', '删除用户', '3', '16');

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `other` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of role
-- ----------------------------

-- ----------------------------
-- Table structure for rolepower
-- ----------------------------
DROP TABLE IF EXISTS `rolepower`;
CREATE TABLE `rolepower` (
  `rid` int(11) DEFAULT NULL,
  `pid` int(11) DEFAULT NULL,
  KEY `role_id` (`rid`),
  KEY `power_id` (`pid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of rolepower
-- ----------------------------

-- ----------------------------
-- Table structure for userdepartment
-- ----------------------------
DROP TABLE IF EXISTS `userdepartment`;
CREATE TABLE `userdepartment` (
  `uid` int(11) DEFAULT NULL,
  `did` int(11) DEFAULT NULL,
  KEY `role_id` (`uid`),
  KEY `power_id` (`did`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of userdepartment
-- ----------------------------

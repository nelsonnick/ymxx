package com.wts.controller;

import com.jfinal.core.Controller;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Page;
import com.wts.entity.*;
import com.wts.util.IDNumber;

import java.util.ArrayList;
import java.util.List;

import static com.wts.util.EncryptUtils.encodeMD5String;

public class UserController extends Controller {
    /**
     * 查询用户
     *@param: PageNumber
     *@param: PageSize
     *@param: UserName
     *@param: UserDept
     */
    public void query() {
        if(getPara("UserDept")==null){
            Page<User> user = User.dao.paginate(getParaToInt("PageNumber"), getParaToInt("PageSize"), getPara("UserName"));
            renderJson(user.getList());
        }else {
            Department department = Department.dao.findById(getPara("UserDept"));
            if (department.get("level").toString().equals("3")){
                Page<User> user = User.dao.paginate2(getParaToInt("PageNumber"), getParaToInt("PageSize"), getPara("UserName"), getPara("UserDept"));
                renderJson(user.getList());
            } else if (department.get("level").toString().equals("2")){
                List<Department> departments = Department.dao.find(
                        "select * from department where father=?", department.get("id"));
                List<User> users = new ArrayList<>();
                users.addAll(User.dao.paginate2(getParaToInt("PageNumber"), getParaToInt("PageSize"), getPara("UserName"), getPara("UserDept")).getList());
                for (int i=0;i<departments.size();i++) {
                    users.addAll(User.dao.paginate2(getParaToInt("PageNumber"), getParaToInt("PageSize"), getPara("UserName"), departments.get(i).get("id").toString()).getList());
                }
                renderJson(users);
            } else {
                List<User> users = new ArrayList<>();
                List<Department> departments1 = Department.dao.find(
                        "select * from department where father=?", department.get("id"));
                users.addAll(User.dao.paginate2(getParaToInt("PageNumber"), getParaToInt("PageSize"), getPara("UserName"), getPara("UserDept")).getList());
                for (int i=0;i<departments1.size();i++) {
                    List<Department> departments2 = Department.dao.find(
                            "select * from department where father=?", departments1.get(i).get("id").toString());
                    users.addAll(User.dao.paginate2(getParaToInt("PageNumber"), getParaToInt("PageSize"), getPara("UserName"), departments1.get(i).get("id").toString()).getList());
                    for (int j=0;j<departments2.size();j++) {
                        users.addAll(User.dao.paginate2(getParaToInt("PageNumber"), getParaToInt("PageSize"), getPara("UserName"), departments2.get(j).get("id").toString()).getList());
                    }
                }
                renderJson(users);
            }
        }
    }
    /**
     * 查询角色数量
     *@param: UserName
     *@param: UserDept
     */
    public void count() {
        if(getPara("UserDept")==null){
            String count = Db.queryLong("select count(*) from user where name like '%"+ getPara("UserName") +"%'").toString();
            renderText(count);
        }else {
            Department department = Department.dao.findById(getPara("UserDept"));

            if (department.get("level").toString().equals("3")){
                String count = Db.queryLong("select count(*) from user where name like '%"+ getPara("UserName") +"%' AND did = '"+getPara("UserDept")+"'").toString();
                renderText(count);
            } else if (department.get("level").toString().equals("2")){
                int countNumber = 0;
                List<Department> departments = Department.dao.find(
                        "select * from department where father=?", department.get("id"));
                countNumber = countNumber + Db.queryLong("select count(*) from user where name like '%"+ getPara("UserName") +"%' AND did = '"+getPara("UserDept")+"'").intValue();
                for (int i=0;i<departments.size();i++) {
                    countNumber = countNumber + Db.queryLong("select count(*) from user where name like '%"+ getPara("UserName") +"%' AND did = '"+departments.get(i).get("id").toString()+"'").intValue();
                }
                renderJson(countNumber);
            } else {
                int countNumber = 0;
                List<Department> departments1 = Department.dao.find(
                        "select * from department where father=?", department.get("id"));
                countNumber = countNumber + Db.queryLong("select count(*) from user where name like '%"+ getPara("UserName") +"%' AND did = '"+getPara("UserDept")+"'").intValue();
                for (int i=0;i<departments1.size();i++) {
                    List<Department> departments2 = Department.dao.find(
                            "select * from department where father=?", departments1.get(i).get("id").toString());
                    countNumber = countNumber + Db.queryLong("select count(*) from user where name like '%"+ getPara("UserName") +"%' AND did = '"+departments1.get(i).get("id").toString()+"'").intValue();
                    for (int j=0;j<departments2.size();j++) {
                        countNumber = countNumber +Db.queryLong("select count(*) from user where name like '%"+ getPara("UserName") +"%' AND did = '"+departments2.get(j).get("id").toString()+"'").intValue();
                    }
                }
                renderJson(countNumber);
            }
        }
    }
    /**
     * 查询全部部门
     */
    public void cascade() {
        String children = " children: [";
        String cascadeString="";
        String cascadeString1;
        String cascadeString2;
        String cascadeString3;
        String cascadeString4="";
        String cascadeString5;
        String cascadeString6="";
        List<Department> department1 = Department.dao.find("select * from department where father=? and state=?", "1","激活");
        if (department1.size()==0){
            cascadeString = "";
        } else {
            for(int i = 0; i < department1.size(); i++) {
                cascadeString1 = "{ value: '" + department1.get(i).get("id").toString()+"', label: '"+department1.get(i).get("name").toString()+"',";
                if (Department.dao.find("select * from department where father=?", department1 .get(i).get("id")).size()==0){
                    cascadeString2 = "";
                } else {
                    List<Department> department2 = Department.dao.find("select * from department where father=? and state=?", department1 .get(i).get("id"),"激活");
                    for(int j = 0; j < department2 .size(); j++) {
                        cascadeString3 = "{ value: '" + department2.get(j).get("id").toString()+"', label: '"+department2.get(j).get("name").toString()+"',";
                        if (Department.dao.find("select * from department where father=?", department2 .get(j).get("id")).size()==0) {
                            cascadeString5 = "";
                        } else {
                            List<Department> department3 = Department.dao.find("select * from department where father=? and state=?", department2 .get(j).get("id"),"激活");
                            for(int k = 0; k < department3 .size(); k++) {
                                cascadeString6 = cascadeString6 + "{ value: '" + department3.get(k).get("id").toString()+"', label: '"+department3.get(k).get("name").toString()+"' }, ";
                            }
                            cascadeString5 = children + cascadeString6 + "], ";
                            cascadeString6="";
                        }
                        cascadeString4= cascadeString4 + cascadeString3 + cascadeString5 + "}, ";
                    }
                    cascadeString2 = children + cascadeString4 + "], ";
                    cascadeString3="";
                    cascadeString5="";
                }
                cascadeString = cascadeString + cascadeString1 + cascadeString2 +"}, ";
                cascadeString1="";
                cascadeString2="";
                cascadeString3="";
                cascadeString4="";
                cascadeString5="";
                cascadeString6="";
            }
        }
        renderText("["+cascadeString.substring(0,cascadeString.length()-1)+"]");
    }
    /**
     * 核查用户真实姓名
     *@param: name
     */
    public void name() {
        List<User> user2 = User.dao.find(
                "select * from user where login=?", getPara("login"));
        if (!getPara("name").matches("[\u4e00-\u9fa5]+")) {
            renderText("真实姓名必须为汉字!");
        } else if (user2.size() != 0) {
            renderText("该登录名称已有其他工作人员使用，请更换!");
        } else if (getPara("name").length()<2) {
            renderText("真实姓名必须在两个汉字以上，请使用其他名称!");
        } else {
            renderText("OK");
        }
    }
    /**
     * 核查用户证件号码
     *@param: number
     */
    public void number() {
        renderText(IDNumber.checkIDNumber(getPara("number")));
    }
    /**
     * 核查用户联系电话
     *@param: name
     */
    public void phone() {
        if (!getPara("phone").matches("\\d{11}")) {
            renderText("联系电话必须为11位数字!");
        } else {
            renderText("OK");
        }
    }
    /**
     * 核查用户登录名称
     *@param: name
     */
    public void login() {
        if (!getPara("login").matches("[a-zA-Z0-9]{4,12}")) {
            renderText("登录名称必须为4到12位的数字或字母组合!");
        } else {
            renderText("OK");
        }
    }
    /**
     * 核查用户所属部门
     *@param: name
     */
    public void dept() {
        if (getPara("dept").equals("")) {
            renderText("所属部门尚未选择!");
        } else {
            renderText("OK");
        }
    }
    /**
     * 核查用户所属部门
     *@param: did
     */
    public void depts() {
        Department department = Department.dao.findById(getPara("did"));
        if (department.get("level").toString().equals("1")){
            renderText("['"+getPara("did")+"']");
        } else if (department.get("level").toString().equals("2")){
            renderText("['"+department.get("father").toString()+"','"+getPara("did")+"']");
        } else {
            Department department1 = Department.dao.findById(department.get("father"));
            renderText("['"+department1.get("id").toString()+"','"+department.get("father").toString()+"','"+getPara("did")+"']");
        }
    }
    /**
     * 新增用户
     */
    public void add() {
        List<User> user1 = User.dao.find(
                "select * from user where number=?", getPara("number"));
        List<User> user2 = User.dao.find(
                "select * from user where login=?", getPara("login"));
        if (!getPara("name").matches("[\u4e00-\u9fa5]+")) {
            renderText("用户名称必须为汉字!");
        } else if (user1.size() != 0) {
            renderText("该证件号码数据库中已存在，请核实!");
        } else if (user2.size() != 0) {
            renderText("该登录名称已有其他工作人员使用，请更换!");
        } else if (getPara("name").length()<2) {
            renderText("用户名称必须为两个以上汉字，请核实!");
        } else if (!getPara("login").matches("[a-zA-Z0-9]{4,12}")) {
            renderText("登录名称必须为4到12位的数字或字母组合!");
        } else if (!getPara("phone").matches("\\d{11}")) {
            renderText("联系电话必须为11位数字!");
        } else if (!IDNumber.availableIDNumber(getPara("number"))){
            renderText("证件号码错误，请核实！");
        }else {
            User user = new User();
            user.set("name", getPara("name").trim())
                    .set("number", getPara("number").trim())
                    .set("phone", getPara("phone").trim())
                    .set("login", getPara("login").trim())
                    .set("did", getPara("did").trim())
                    .set("state", getPara("state").trim())
                    .set("pass", encodeMD5String(getPara("number").substring(getPara("number").length()-6,getPara("number").length()).trim()))
                    .set("other", getPara("other").trim());
            if (user.save()) {
                renderText("OK");
            } else {
                renderText("发生未知错误，请检查数据库！");
            }
        }
    }
    /**
     * 修改用户
     */
    public void edit(){
        User user = User.dao.findById(getPara("id"));
        if (user == null) {
            renderText("要修改的用户不存在，请刷新页面后再试！");
        } else {
            if (user.get("name").equals(getPara("name"))
                    && user.get("other").equals(getPara("other"))
                    && user.get("number").equals(getPara("number"))
                    && user.get("phone").equals(getPara("phone"))
                    && user.get("login").equals(getPara("login"))
                    && user.get("state").equals(getPara("state"))
                    && user.get("did").equals(getPara("did"))
                    ) {
                renderText("未找到修改内容，请核实后再修改！");
            } else if (!user.get("number").equals(getPara("number"))
                    && User.dao.find("select * from user where number=?", getPara("number")).size() > 0
                    ){
                renderText("该证件号码已绑定为其他工作人员，请重新修改！");
            } else if (!getPara("name").matches("[\u4e00-\u9fa5]+")) {
                renderText("用户真实姓名必须为汉字!");
            } else if (getPara("name").length()<2) {
                renderText("用户名称必须为两个以上汉字，请核实!");
            } else if (!getPara("login").matches("[a-zA-Z0-9]{4,12}")) {
                renderText("登录名称必须为4到12位的数字或字母组合!");
            } else if (!getPara("phone").matches("\\d{11}")) {
                renderText("联系电话必须为11位数字!");
            } else if (!IDNumber.availableIDNumber(getPara("number"))){
                renderText("证件号码错误，请核实！");
            } else {
                if (user
                        .set("name",getPara("name"))
                        .set("number",getPara("number"))
                        .set("phone",getPara("phone"))
                        .set("login",getPara("login"))
                        .set("did",getPara("did"))
                        .set("other",getPara("other"))
                        .update()) {
                    renderText("OK");
                } else{
                    renderText("发生未知错误，请检查数据库！");
                }
            }
        }
    }
    /**
     * 注销用户
     */
    public void abandon(){
        User user = User.dao.findById(getPara("id"));
        if (user == null) {
            renderText("要注销的用户不存在，请刷新页面后再试！");
        }else if (user.get("state").equals("注销")){
            renderText("该用户已注销！");
        }else{
            if (User.dao.findById(getPara("id")).set("state", "注销").update()){
                renderText("OK");
            } else {
                renderText("发生未知错误，请检查数据库！");
            }
        }
    }
    /**
     * 激活用户
     */
    public void active(){
        User user = User.dao.findById(getPara("id"));
        if (user == null) {
            renderText("要激活的用户不存在，请刷新页面后再试！");
        }else if (user.get("state").equals("激活")){
            renderText("该用户已激活！");
        }else{
            if (user.set("state", "激活").update()){
                renderText("OK");
            } else {
                renderText("发生未知错误，请检查数据库！");
            }
        }
    }
    /**
     * 删除用户
     */
    public void delete(){
        User user = User.dao.findById(getPara("id"));
        if (user == null) {
            renderText("要删除的用户不存在，请刷新页面后再试！");
        }else if (user.get("state").equals("删除")){
            renderText("该用户已删除！");
        }else{
            if (user.set("state", "删除").update()){
                renderText("OK");
            } else {
                renderText("发生未知错误，请检查数据库！");
            }
        }
    }
    /**
     * 重置密码
     */
    public void reset(){
        User user = User.dao.findById(getPara("id"));
        if (user == null) {
            renderText("要重置的用户不存在，请刷新页面后再试！");
        }else{
            if (user.set("pass", encodeMD5String(user.get("number").toString().substring(user.get("number").toString().length()-6,user.get("number").toString().length()).trim())).update()){
                renderText("OK");
            } else {
                renderText("发生未知错误，请检查数据库！");
            }
        }
    }
    /**
     * 角色树
     */
    public void roleTree(){
        List<Role> roles = Role.dao.find("select * from role");
        String cascadeString1 = "";
        for(int i = 0; i < roles.size(); i++) {
            cascadeString1 = cascadeString1 + "{ label: '" + roles.get(i).get("name").toString()+"', value: '"+roles.get(i).get("id").toString()+"',key: '"+roles.get(i).get("id").toString()+"' },";
        }
        renderText("["+cascadeString1.substring(0,cascadeString1.length()-1)+"]");
    }
    /**
     * 当前角色
     */
    public void roleNow(){
        List<UserRole> userRoles = UserRole.dao.find("select * from userrole where uid=?",getPara("id"));
        String cascadeString1 = "";
        if (userRoles.size()>0) {
            for (int i = 0; i < userRoles.size(); i++) {
                cascadeString1 = cascadeString1 + "'" + userRoles.get(i).get("rid").toString() + "',";
            }
            renderText("[" + cascadeString1.substring(0, cascadeString1.length() - 1) + "]");
        } else {
            renderText("[]");
        }
    }
    /**
     * 当前角色
     */
    public void set(){
        String[] roles = getParaValues("role[]");
        if (roles!=null) {
            Db.update("delete from userrole where uid = ?", getPara("id"));
            for (int i = 0; i < roles.length; i++) {
                UserRole userRole = new UserRole();
                userRole.set("uid", getPara("id").trim())
                        .set("rid", roles[i]).save();
            }
            renderText("OK");
        }else{
            renderText("当前用户未指定角色，请指定");
        }
    }
}

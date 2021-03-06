package com.wts.controller;

import com.jfinal.aop.Before;
import com.jfinal.core.Controller;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Page;
import com.jfinal.plugin.activerecord.tx.Tx;
import com.wts.entity.*;

import java.util.List;

public class RoleController extends Controller {

    /**
     * 核查角色名称
     *@param: name
     */
    public void name() {
        List<Role> roles = Role.dao.find(
                "select * from role where name=?", getPara("name"));
        if (!getPara("name").matches("[\u4e00-\u9fa5]+")) {
            renderText("部门名称必须为汉字!");
        } else if (roles.size() != 0) {
            renderText("该部门名称数据库中已存在，请使用其他名称!");
        } else {
            renderText("OK");
        }
    }
    /**
     * 核查角色名称
     *@param: names
     */
    public void names() {
        if (!getPara("name").matches("[\u4e00-\u9fa5]+")) {
            renderText("部门名称必须为汉字!");
        } else {
            renderText("OK");
        }
    }
    /**
     * 新增角色
     */
    public void add() {
        List<Role> roles = Role.dao.find(
                "select * from role where name=?", getPara("name"));
        if (!getPara("name").matches("[\u4e00-\u9fa5]+")) {
            renderText("角色名称必须为汉字!");
        } else if (roles.size() != 0) {
            renderText("该角色名称数据库中已存在，请使用其他名称!");
        } else {
            Role role = new Role();
            role.set("name", getPara("name").trim())
                    .set("other", getPara("other").trim());
            if (role.save()) {
                renderText("OK");
            } else {
                renderText("发生未知错误，请检查数据库！");
            }
        }
    }
    /**
     * 修改权限
     */
    @Before(Tx.class)
    public void set() {
        Role role = Role.dao.findById(getPara("id"));
        if (role == null) {
            renderText("要修改的角色不存在，请刷新页面后再试！");
        } else if(getParaValues("power[]")==null){
            renderText("权限未选择，请选择后再试！");
        } else if(getParaValues("department[]")==null){
            renderText("部门未选择，请选择后再试！");
        }  else {
            String[] powers = getParaValues("power[]");
            String[] departments = getParaValues("department[]");
            Db.update("delete from rolepower where rid = ?", getPara("id"));
            Db.update("delete from roledept where rid = ?", getPara("id"));
            for (int i=0;i<powers.length;i++) {
                RolePower rolePower = new RolePower();
                rolePower.set("rid", getPara("id").trim())
                        .set("pid", powers[i]).save();
            }
            for (int j=0;j<departments.length;j++) {
                RoleDept roleDept = new RoleDept();
                roleDept.set("rid", getPara("id").trim())
                        .set("did", departments[j]).save();
            }
            renderText("OK");
        }
    }
    /**
     * 查询角色
     *@param: PageNumber
     *@param: PageSize
     *@param: QueryString
     */
    public void query() {
        Page<Role> roles=Role.dao.paginate(getParaToInt("PageNumber"),getParaToInt("PageSize"),getPara("QueryString"));
        renderJson(roles.getList());
    }

    /**
     * 查询角色数量
     *@param: QueryString
     */
    public void count() {
        String count = Db.queryLong("select count(*) from role where name like '%"+ getPara("QueryString") +"%'").toString();
        renderText(count);
    }
    /**
     * 删除角色
     */
    // 这个地方还需要判断跟用户表的关联情况
    public void delete(){
        Role role = Role.dao.findById(getPara("id"));
        if (role == null) {
            renderText("要删除的角色不存在，请刷新页面后再试！");
        }else{
            if (Role.dao.deleteById(getPara("id"))){
                renderText("OK");
            } else {
                renderText("发生未知错误，请检查数据库！");
            }
        }
    }
    /**
     * 修改角色
     */
    public void edit(){
        Role role = Role.dao.findById(getPara("id"));
        if (role == null) {
            renderText("要修改的角色不存在，请刷新页面后再试！");
        } else {
            if (role.get("name").equals(getPara("name"))
                    && role.get("other").equals(getPara("other"))
                    ) {
                renderText("未找到修改内容，请核实后再修改！");
            } else if (!role.get("name").equals(getPara("name"))
                    && Role.dao.find("select * from role where name=?", getPara("name")).size() > 0
                    ){
                renderText("该角色名称已存在，请重新修改！");
            } else if (!getPara("name").matches("[\u4e00-\u9fa5]+")) {
                renderText("角色名称必须为汉字!");
            } else {
                if (role
                        .set("name",getPara("name"))
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
     * 权限树
     */
    public void power() {
        String children = " children: [";
        String cascadeString = "";
        String cascadeString1;
        String cascadeString2;
        String cascadeString3;
        String cascadeString4 = "";
        String cascadeString5;
        String cascadeString6 = "";
        List<Power> power1 = Power.dao.find("select * from power where father=0");
        if (power1.size() == 0) {
            cascadeString = "";
        } else {
            for (int i = 0; i < power1.size(); i++) {
                cascadeString1 = "{ value: '" + power1.get(i).get("id").toString() + "', label: '" + power1.get(i).get("cname").toString() + "', key: '" + power1.get(i).get("ename").toString() + "',";
                if (Power.dao.find("select * from power where father=?", power1.get(i).get("id")).size() == 0) {
                    cascadeString2 = "";
                } else {
                    List<Power> power2 = Power.dao.find("select * from power where father=?", power1.get(i).get("id"));
                    for (int j = 0; j < power2.size(); j++) {
                        cascadeString3 = "{ value: '" + power2.get(j).get("id").toString() + "', label: '" + power2.get(j).get("cname").toString() + "', key: '" + power2.get(j).get("ename").toString() + "',";
                        if (Power.dao.find("select * from power where father=?", power2.get(j).get("id")).size() == 0) {
                            cascadeString5 = "";
                        } else {
                            List<Power> power3 = Power.dao.find("select * from power where father=?", power2.get(j).get("id"));
                            for (int k = 0; k < power3.size(); k++) {
                                cascadeString6 = cascadeString6 + "{ value: '" + power3.get(k).get("id").toString() + "', label: '" + power3.get(k).get("cname").toString() + "', key: '" + power3.get(k).get("ename").toString() + "', }, ";
                            }
                            cascadeString5 = children + cascadeString6 + "], ";
                            cascadeString6 = "";
                        }
                        cascadeString4 = cascadeString4 + cascadeString3 + cascadeString5 + "}, ";
                    }
                    cascadeString2 = children + cascadeString4 + "], ";
                    cascadeString3 = "";
                    cascadeString5 = "";
                }
                cascadeString = cascadeString + cascadeString1 + cascadeString2 + "}, ";
                cascadeString1 = "";
                cascadeString2 = "";
                cascadeString3 = "";
                cascadeString4 = "";
                cascadeString5 = "";
                cascadeString6 = "";
            }
        }
        renderText("["+cascadeString.substring(0,cascadeString.length()-2)+"]");
    }
    /**
     * 当前权限
     */
    public void powers() {
        List<RolePower> rolepower = RolePower.dao.find("select * from rolepower where rid=?",getPara("id"));
        String[] a = new String[rolepower.size()];
        String powers="";
        for (int i=0;i<a.length;i++) {
            a[i] = rolepower.get(i).get("pid").toString();
            powers = powers + "'" + a[i] + "',";
        }
        renderText("["+powers+"]");
    }
    /**
     * 部门树
     */
    public void dept() {
        String children = " children: [";
        String cascadeString = "";
        String cascadeString1;
        String cascadeString2;
        String cascadeString3;
        String cascadeString4 = "";
        String cascadeString5;
        String cascadeString6 = "";
        List<Department> department1 = Department.dao.find("select * from department where father=1");
        if (department1.size() == 0) {
            cascadeString = "";
        } else {
            for (int i = 0; i < department1.size(); i++) {
                cascadeString1 = "{ value: '" + department1.get(i).get("id").toString() + "', label: '" + department1.get(i).get("name").toString() + "', key: '" + department1.get(i).get("name").toString() + "',";
                if (Department.dao.find("select * from department where father=?", department1.get(i).get("id")).size() == 0) {
                    cascadeString2 = "";
                } else {
                    List<Department> department2 = Department.dao.find("select * from department where father=?", department1.get(i).get("id"));
                    for (int j = 0; j < department2.size(); j++) {
                        cascadeString3 = "{ value: '" + department2.get(j).get("id").toString() + "', label: '" + department2.get(j).get("name").toString() + "', key: '" + department2.get(j).get("name").toString() + "',";
                        if (Department.dao.find("select * from department where father=?", department2.get(j).get("id")).size() == 0) {
                            cascadeString5 = "";
                        } else {
                            List<Department> department3 = Department.dao.find("select * from department where father=?", department2.get(j).get("id"));
                            for (int k = 0; k < department3.size(); k++) {
                                cascadeString6 = cascadeString6 + "{ value: '" + department3.get(k).get("id").toString() + "', label: '" + department3.get(k).get("name").toString() + "', key: '" + department3.get(k).get("name").toString() + "', }, ";
                            }
                            cascadeString5 = children + cascadeString6 + "], ";
                            cascadeString6 = "";
                        }
                        cascadeString4 = cascadeString4 + cascadeString3 + cascadeString5 + "}, ";
                    }
                    cascadeString2 = children + cascadeString4 + "], ";
                    cascadeString3 = "";
                    cascadeString5 = "";
                }
                cascadeString = cascadeString + cascadeString1 + cascadeString2 + "}, ";
                cascadeString1 = "";
                cascadeString2 = "";
                cascadeString3 = "";
                cascadeString4 = "";
                cascadeString5 = "";
                cascadeString6 = "";
            }
        }
        renderText("["+cascadeString.substring(0,cascadeString.length()-2)+"]");
    }
    /**
     * 当前部门
     */
    public void depts() {
        List<RoleDept> roleDept = RoleDept.dao.find("select * from roledept where rid=?",getPara("id"));
        String[] a = new String[roleDept.size()];
        String roleDepts="";
        for (int i=0;i<a.length;i++) {
            a[i] = roleDept.get(i).get("did").toString();
            roleDepts = roleDepts + "'" + a[i] + "',";
        }
        renderText("["+roleDepts+"]");
    }
}



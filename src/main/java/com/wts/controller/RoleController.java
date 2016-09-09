package com.wts.controller;

import com.jfinal.core.Controller;
import com.wts.entity.Role;

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
     * 新增角色
     */
    public void add() {
        List<Role> roles = Role.dao.find(
                "select * from role where name=?", getPara("name"));
        if (!getPara("name").matches("[\u4e00-\u9fa5]+")) {
            renderText("部门名称必须为汉字!");
        } else if (roles.size() != 0) {
            renderText("该部门名称数据库中已存在，请使用其他名称!");
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

}



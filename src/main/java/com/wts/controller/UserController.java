package com.wts.controller;

import com.jfinal.core.Controller;
import com.jfinal.plugin.activerecord.Page;
import com.wts.entity.Department;
import com.wts.entity.User;

public class UserController extends Controller {

    /**
     * 查询部门
     *@param: PageNumber
     *@param: PageSize
     *@param: QueryString
     */
    public void query() {
        Page<User> users= User.dao.paginate(getParaToInt("PageNumber"),getParaToInt("PageSize"),getPara("QueryString"),getPara("QueryString"));
        renderJson(users.getList());
    }
}

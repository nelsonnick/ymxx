package com.wts.controller;


import com.jfinal.core.Controller;
import com.jfinal.plugin.activerecord.Page;
import com.wts.entity.Department;

public class DepartmentController extends Controller {

	/**
	 * 主界面
	 * */
    public void g() {
        render("dist/index.html");
    }

	public void query() {
        Page<Department> departments=Department.dao.paginate(getParaToInt("PageNow"),getParaToInt("PageSize"),getPara("QueryString"));
        System.out.println(departments.getList());
        renderJson(departments.getList());
    }


}



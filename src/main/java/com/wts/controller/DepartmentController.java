package com.wts.controller;


import com.jfinal.core.Controller;
import com.wts.entity.Department;

import java.util.List;

public class DepartmentController extends Controller {

	/**
	 * 主界面
	 * */

	public void getList() {
        List<Department> departments=Department.dao.find("select * from department where id = ?",getPara("id") );
        System.out.println(departments);
        System.out.println(getPara("id") );
        renderJson(departments);
    }
    public void g() {
        render("dist/index.html");
    }

}



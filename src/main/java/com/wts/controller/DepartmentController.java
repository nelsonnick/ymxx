package com.wts.controller;


import com.jfinal.core.Controller;
import com.wts.entity.Department;

import java.util.List;

public class DepartmentController extends Controller {

	/**
	 * 主界面
	 * */

	public void getList() {
        List<Department> departments=Department.dao.find("select * from department");
        System.out.println(departments);
        renderJson(departments);
    }

}



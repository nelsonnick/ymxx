package com.wts.controller;


import com.jfinal.core.Controller;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Page;
import com.wts.entity.Department;

import static com.jfinal.plugin.activerecord.Db.queryLong;

public class DepartmentController extends Controller {

	/**
	 * 主界面
	 * */
    public void g() {
        render("dist/index.html");
    }

    /**
     * 查询部门
     *@param: PageNumber
     *@param: PageSize
     *@param: QueryString
     */
	public void query() {
        Page<Department> departments=Department.dao.paginate(getParaToInt("PageNumber"),getParaToInt("PageSize"),getPara("QueryString"));
        renderJson(departments.getList());
    }
    /**
     * 查询部门数量
     *@param: QueryString
     */
    public void totalCount() {
        String totalCount = Db.queryLong("select count(*) from department where name like '%"+ getPara("QueryString") +"%'").toString();
        System.out.println(getPara("QueryString"));
        System.out.println("select count(*) from department where name like '%"+ getPara("QueryString") +"%'");
        renderText(totalCount);
    }

}



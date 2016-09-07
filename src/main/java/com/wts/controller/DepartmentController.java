package com.wts.controller;

import com.jfinal.core.Controller;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Page;
import com.wts.entity.Department;
import org.apache.poi.util.StringUtil;
import org.apache.poi.util.SystemOutLogger;

import java.util.List;

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
    public void count() {
        String count = Db.queryLong("select count(*) from department where name like '%"+ getPara("QueryString") +"%' and state<>'删除' and name<>'顶级部门'").toString();
        renderText(count);
    }

    /**
     * 核查部门名称
     *@param: name
     */
    public void name() {
        List<Department> departments = Department.dao.find(
                "select * from department where name=?", getPara("name"));
        if (!getPara("name").matches("[\u4e00-\u9fa5]+")) {
            renderText("部门名称必须为汉字!");
        } else if (getPara("name").length() < 3) {
            renderText("部门名称必须超过3个汉字!");
        } else if (departments.size() != 0) {
            renderText("该部门名称数据库中已存在，请使用其他名称!");
        } else {
            renderText("OK");
        }
    }
    /**
     * 核查部门名称
     *@param: names
     */
    public void names() {
        if (!getPara("name").matches("[\u4e00-\u9fa5]+")) {
            renderText("部门名称必须为汉字!");
        } else if (getPara("name").length() < 3) {
            renderText("部门名称必须超过3个汉字!");
        } else {
            renderText("OK");
        }
    }
    /**
     * 核查部门电话
     */
    public void phone() {
        if (!getPara("phone").matches("\\d{8}")) {
            renderText("部门电话必须为8位数字!");
        } else {
            renderText("OK");
        }
    }

    /**
     * 核查部门地址
     */
    public void address() {
        if (getPara("address").length() < 3) {
            renderText("部门地址必须超过3个字符!");
        } else {
            renderText("OK");
        }
    }
    /**
     * 核查父级部门
     */
    public void father() {
        if(!getPara("father").toString().equals("0")){
            if(Integer.parseInt(Department.dao.findById(getPara("father")).get("level").toString())>2){
                renderText("上级部门不得超过两级！");
            }
            renderText("OK");
        }
        renderText("OK");
    }
    /**
     * 新增部门
     */
    public void add() {
        List<Department> departments = Department.dao.find(
                "select * from department where name=?", getPara("name"));
        if (!getPara("name").matches("[\u4e00-\u9fa5]+")) {
            renderText("部门名称必须为汉字!");
        } else if (getPara("name").length() < 3) {
            renderText("部门名称必须超过3个汉字!");
        } else if (departments.size() != 0) {
            renderText("该部门名称数据库中已存在，请使用其他名称!");
        } else if (!getPara("phone").matches("\\d{8}")) {
            renderText("部门电话必须为8位数字!");
        } else if (getPara("address").length() < 3) {
            renderText("部门地址必须超过3个字符!");
        } else {
            Department department = new Department();
            department.set("name", getPara("name").trim())
                    .set("phone", getPara("phone").trim())
                    .set("address", getPara("address").trim())
                    .set("state", getPara("state").trim())
                    .set("other", getPara("other").trim());
            if (department.save()) {
                renderText("OK");
            } else {
                renderText("发生未知错误，请检查数据库！");
            }
        }
    }

    /**
     * 注销部门
     */
    public void abandon(){
        Department department = Department.dao.findById(getPara("id"));
        if (department == null) {
            renderText("要注销的部门不存在，请刷新页面后再试！");
        }else if (department.get("state").equals("注销")){
            renderText("该部门已注销！");
        }else{
            if (Department.dao.findById(getPara("id")).set("state", "注销").update()){
                renderText("OK");
            } else {
                renderText("发生未知错误，请检查数据库！");
            }
        }
    }

    /**
     * 激活部门
     */
    public void active(){
        Department department = Department.dao.findById(getPara("id"));
        System.out.println(getPara("id"));
        if (department == null) {
            renderText("要激活的部门不存在，请刷新页面后再试！");
        }else if (department.get("state").equals("激活")){
            renderText("该部门已激活！");
        }else{
            if (department.set("state", "激活").update()){
                renderText("OK");
            } else {
                renderText("发生未知错误，请检查数据库！");
            }
        }
    }

    /**
     * 删除部门
     */
    public void delete(){
        Department department = Department.dao.findById(getPara("id"));
        if (department == null) {
            renderText("要删除的部门不存在，请刷新页面后再试！");
        }else if (department.get("state").equals("删除")){
            renderText("该部门已删除！");
        }else{
            if (department.set("state", "删除").update()){
                renderText("OK");
            } else {
                renderText("发生未知错误，请检查数据库！");
            }
        }
    }
    /**
     * 修改部门
     */
    public void edit(){
        Department department = Department.dao.findById(getPara("id"));

        if (department == null) {
            renderText("要修改的部门不存在，请刷新页面后再试！");
        } else {
            if (department.get("name").equals(getPara("name"))
                && department.get("phone").equals(getPara("phone"))
                && department.get("address").equals(getPara("address"))
                && department.get("other").equals(getPara("other"))
                    ) {
                renderText("未找到修改内容，请核实后再修改！");
            } else if (!department.get("name").equals(getPara("name"))
                    && Department.dao.find("select * from department where name=?", getPara("name")).size() > 0
                    ){
                renderText("该部门名称已存在，请重新修改！");
            } else {
                if (department
                        .set("name",getPara("name"))
                        .set("phone",getPara("phone"))
                        .set("address",getPara("address"))
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
     * 部门级联
     */
    public void cascade() {
        String a="";
        String cascadeString="";
        String cascadeString1="";
        String cascadeString2="";
        String cascadeString3="";
        String cascadeString4="";
        String cascadeString5="";
        List<Department> department1 = Department.dao.find("select * from department where father=? and state=?", "1","激活");
        for(int i = 0; i < department1 .size(); i++) {
            cascadeString1 = "{ value: '" + department1.get(i).get("id").toString()+"', label: '"+department1.get(i).get("name").toString()+"',";
            if (Department.dao.find("select * from department where father=?", department1 .get(i).get("id")).size()!=0){
                cascadeString2 = " children: [";
                List<Department> department2 = Department.dao.find("select * from department where father=? and state=?", department1 .get(i).get("id"),"激活");
                for(int j = 0; j < department2 .size(); j++) {
                    cascadeString3 = "{ value: '" + department2.get(j).get("id").toString()+"', label: '"+department2.get(j).get("name").toString()+"',";
                    if (Department.dao.find("select * from department where father=?", department2 .get(j).get("id")).size()!=0) {
                        cascadeString4 = " children: [";
                        List<Department> department3 = Department.dao.find("select * from department where father=? and state=?", department2 .get(j).get("id"),"激活");
                        for(int k = 0; k < department3 .size(); k++) {
                            cascadeString5 = "{ value: '" + department3.get(k).get("id").toString()+"', label: '"+department3.get(k).get("name").toString()+"',";
                            cascadeString4 = cascadeString4 + cascadeString5+ "}, ";
                        }
                        cascadeString3 = cascadeString3 + cascadeString4 + "}, ";
                    }
                    cascadeString2 = cascadeString2 + cascadeString3 + " }, ";
                    cascadeString4 = "";
                }
                a = cascadeString2 + "],";
            }
            cascadeString = cascadeString + cascadeString1 + a + " },";
            cascadeString2 = "";
            a="";
        }
        renderText("[{ value:'1'， label：'无上级部门' }，"+cascadeString+"]");
    }
}

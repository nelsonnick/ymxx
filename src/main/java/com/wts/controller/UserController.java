package com.wts.controller;

import com.jfinal.core.Controller;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Page;
import com.wts.entity.Department;
import com.wts.entity.RolePower;
import com.wts.entity.User;

import java.util.ArrayList;
import java.util.List;

public class UserController extends Controller {

    /**
     * 查询用户
     *@param: PageNumber
     *@param: PageSize
     *@param: UserName
     *@param: UserDept
     */
    public void query() {
        if(getParaValues("UserDept[]")==null){
            Page<User> user = User.dao.paginate(getParaToInt("PageNumber"), getParaToInt("PageSize"), getPara("UserName"));
            renderJson(user.getList());
        }else {
            String[] userDepts = getParaValues("UserDept[]");
            List<User> users = new ArrayList<>();
            for (int i=0;i<userDepts.length;i++) {
                users.addAll(User.dao.paginate2(getParaToInt("PageNumber"), getParaToInt("PageSize"), getPara("UserName"), userDepts[i]).getList());
            }
            renderJson(users);
        }
    }
    /**
     * 查询角色数量
     *@param: UserName
     *@param: UserDept
     */
    public void count() {
        if(getParaValues("UserDept")==null){
            String count = Db.queryLong("select count(*) from user where name like '%"+ getPara("UserName") +"%'").toString();
            renderText(count);
        }else {
            String[] userDepts = getParaValues("UserDept[]");
            int countNumber = 0;
            for (int i=0;i<userDepts.length;i++) {
                countNumber = countNumber +Db.queryInt("select count(*) from user where name like '%"+ getPara("UserName") +"%' AND did = '"+userDepts[i]+"'");
            }
            renderText(String.valueOf(countNumber));
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
}

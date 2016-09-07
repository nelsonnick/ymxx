package com.wts.entity;

import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.Page;
/**
 * Department model.

 mysql> desc department;
 +-------------+--------------+------+-----+---------+----------------+
 | Field       | Type         | Null | Key | Default | Extra          |
 +-------------+--------------+------+-----+---------+----------------+
 | id          | int(11)      | NO   | PRI | NULL    | auto_increment |
 | name        | varchar(255) | NO   |     | NULL    |                |
 | phone       | varchar(255) | NO   |     | NULL    |                |
 | address     | varchar(255) | NO   |     | NULL    |                |
 | state       | int(11)      | NO   |     | NULL    |                |
 | other       | varchar(255) | NO   |     | NULL    |                |
 | level       | int(11)      | NO   |     | NULL    |                |
 | father      | int(11)      | NO   |     | NULL    |                |
 +-------------+--------------+------+-----+---------+----------------+

 */
public class Department extends Model<Department> {
    public static final Department dao = new Department();
    public Page<Department> paginate(int pageNumber, int pageSize,String query) {
        return paginate(pageNumber, pageSize, "SELECT d1.id,d1.name,d1.phone,d1.address,d1.state,d1.other,d1.level,d2.id AS father,d2.name AS fathers",
                "FROM department d1 INNER JOIN department d2 ON d1.father = d2.id WHERE d1.name LIKE '%"+query+"%' AND d1.state<>'删除' AND d1.name<>'顶级部门' ORDER BY d1.id DESC");
    }

 }



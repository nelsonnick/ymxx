package com.wts.entity;

import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.Page;

/**
 * Role model.

 mysql> desc department;
 +-------------+--------------+------+-----+---------+----------------+
 | Field       | Type         | Null | Key | Default | Extra          |
 +-------------+--------------+------+-----+---------+----------------+
 | id          | int(11)      | NO   | PRI | NULL    | auto_increment |
 | ename       | varchar(255) | NO   |     | NULL    |                |
 | cname       | varchar(255) | NO   |     | NULL    |                |
 | level       | varchar(255) | NO   |     | NULL    |                |
 | father      | varchar(255) | NO   |     | NULL    |                |
 +-------------+--------------+------+-----+---------+----------------+

 */
public class Power extends Model<Power> {
    public static final Power dao = new Power();
    public Page<Power> paginate(int pageNumber, int pageSize) {
        return paginate(pageNumber, pageSize, "SELECT *",
                "FROM power ORDER BY power.id DESC");
    }

 }



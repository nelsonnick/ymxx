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
 | name        | varchar(255) | NO   |     | NULL    |                |
 | other       | varchar(255) | NO   |     | NULL    |                |
 +-------------+--------------+------+-----+---------+----------------+

 */
public class Role extends Model<Role> {
    public static final Role dao = new Role();
    public Page<Role> paginate(int pageNumber, int pageSize, String query) {
        return paginate(pageNumber, pageSize, "SELECT *",
                "FROM role WHERE role.name LIKE '%"+query+"%' ORDER BY role.id DESC");
    }

 }



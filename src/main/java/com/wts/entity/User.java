package com.wts.entity;

import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.Page;

/**
 * User model.

 mysql> desc department;
 +-------------+--------------+------+-----+---------+----------------+
 | Field       | Type         | Null | Key | Default | Extra          |
 +-------------+--------------+------+-----+---------+----------------+
 | id          | int(11)      | NO   | PRI | NULL    | auto_increment |
 | name        | varchar(255) | NO   |     | NULL    |                |
 | number      | varchar(255) | NO   |     | NULL    |                |
 | login       | varchar(255) | NO   |     | NULL    |                |
 | pass        | varchar(255) | NO   |     | NULL    |                |
 | phone       | varchar(255) | NO   |     | NULL    |                |
 | did         | int(11)      | NO   |     | NULL    |                |
 | state       | varchar(255) | NO   |     | NULL    |                |
 | other       | varchar(255) | NO   |     | NULL    |                |
 +-------------+--------------+------+-----+---------+----------------+

 */
public class User extends Model<User> {
    public static final User dao = new User();
    public Page<User> paginate(int pageNumber, int pageSize, String query) {
        return paginate(pageNumber, pageSize, "SELECT user.*,department.name AS dname",
                "FROM user INNER JOIN department ON user.did=department.id WHERE user.name LIKE '%"+query+"%' ORDER BY user.id DESC");
    }

 }



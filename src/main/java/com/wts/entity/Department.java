package com.wts.entity;

import com.jfinal.plugin.activerecord.Model;

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
 +-------------+--------------+------+-----+---------+----------------+

 */
public class Department extends Model<Department> {
    public static final Department dao = new Department();
 }



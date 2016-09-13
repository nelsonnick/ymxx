package com.wts.entity;

import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.Page;

/**
 * UserRole model.

 mysql> desc department;
 +-------------+--------------+------+-----+---------+----------------+
 | Field       | Type         | Null | Key | Default | Extra          |
 +-------------+--------------+------+-----+---------+----------------+
 | uid         | int(11)      | NO   |     | NULL    |                |
 | rid         | int(11)      | NO   |     | NULL    |                |
 +-------------+--------------+------+-----+---------+----------------+

 */
public class UserRole extends Model<UserRole> {
    public static final UserRole dao = new UserRole();

 }



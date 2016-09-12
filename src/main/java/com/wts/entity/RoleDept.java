package com.wts.entity;

import com.jfinal.plugin.activerecord.Model;

/**
 * Role model.

 mysql> desc department;
 +-------------+--------------+------+-----+---------+----------------+
 | Field       | Type         | Null | Key | Default | Extra          |
 +-------------+--------------+------+-----+---------+----------------+
 | rid         | int(11)      | NO   |     | NULL    |                |
 | did         | int(11)      | NO   |     | NULL    |                |
 +-------------+--------------+------+-----+---------+----------------+

 */
public class RoleDept extends Model<RoleDept> {
    public static final RoleDept dao = new RoleDept();

 }



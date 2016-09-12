package com.wts.entity;

import com.jfinal.plugin.activerecord.Model;

/**
 * Role model.

 mysql> desc department;
 +-------------+--------------+------+-----+---------+----------------+
 | Field       | Type         | Null | Key | Default | Extra          |
 +-------------+--------------+------+-----+---------+----------------+
 | rid         | int(11)      | NO   |     | NULL    |                |
 | pid         | int(11)      | NO   |     | NULL    |                |
 +-------------+--------------+------+-----+---------+----------------+

 */
public class RolePower extends Model<RolePower> {
    public static final RolePower dao = new RolePower();

 }



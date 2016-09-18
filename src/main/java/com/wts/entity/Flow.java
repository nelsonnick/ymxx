package com.wts.entity;

import com.jfinal.plugin.activerecord.Model;

/**
 * Flow model.

 mysql> desc flow;
 +-------------+--------------+------+-----+---------+----------------+
 | Field       | Type         | Null | Key | Default | Extra          |
 +-------------+--------------+------+-----+---------+----------------+
 | id          | int(11)      | NO   | PRI | NULL    | auto_increment |
 | did         | int(11)      | NO   |     | NULL    |                |
 | uid         | int(11)      | NO   |     | NULL    |                |
 | time        | datetime     | NO   |     | NULL    |                |
 +-------------+--------------+------+-----+---------+----------------+

 */
public class Flow extends Model<Flow> {
    public static final Flow dao = new Flow();


 }



package com.wts.entity;

import com.jfinal.plugin.activerecord.Model;

/**
 * Information model.

 mysql> desc information;
 +-------------+--------------+------+-----+---------+----------------+
 | Field       | Type         | Null | Key | Default | Extra          |
 +-------------+--------------+------+-----+---------+----------------+
 | id          | int(11)      | NO   | PRI | NULL    | auto_increment |
 | did         | int(11)      | NO   |     | NULL    |                |
 | uid         | int(11)      | NO   |     | NULL    |                |
 | time        | datetime     | NO   |     | NULL    |                |
 +-------------+--------------+------+-----+---------+----------------+

 */
public class Information extends Model<Information> {
    public static final Information dao = new Information();


 }



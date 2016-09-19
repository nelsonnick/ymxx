package com.wts.entity;

import com.jfinal.plugin.activerecord.Model;

/**
 * Person model.

 mysql> desc person;
 +-------------+--------------+------+-----+---------+----------------+
 | Field       | Type         | Null | Key | Default | Extra          |
 +-------------+--------------+------+-----+---------+----------------+
 | id          | int(11)      | NO   | PRI | NULL    | auto_increment |
 | number     | varchar(255) | NO   |     | NULL    |                |
 +-------------+--------------+------+-----+---------+----------------+

 */
public class Person extends Model<Person> {
    public static final Person dao = new Person();


 }



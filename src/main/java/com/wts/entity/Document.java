package com.wts.entity;

import com.jfinal.plugin.activerecord.Model;

/**
 * Document model.

 mysql> desc document;
 +-------------+--------------+------+-----+---------+----------------+
 | Field       | Type         | Null | Key | Default | Extra          |
 +-------------+--------------+------+-----+---------+----------------+
 | id          | int(11)      | NO   | PRI | NULL    | auto_increment |
 | dnumber     | varchar(255) | NO   |     | NULL    |                |
 +-------------+--------------+------+-----+---------+----------------+

 */
public class Document extends Model<Document> {
    public static final Document dao = new Document();


 }



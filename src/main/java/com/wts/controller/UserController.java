package com.wts.controller;


import com.jfinal.core.Controller;
import com.wts.entity.User;

import java.util.List;

public class UserController extends Controller {

	/**
	 * 主界面
	 * */

	public void h() {
        List<User> users = User.dao.find("select * from user");
		//render("/home.html");
        renderJson("users", users);
    }

}



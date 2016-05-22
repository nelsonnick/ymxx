package com.wts.controller;


import com.jfinal.core.Controller;

public class UserController extends Controller {

	/**
	 * 主界面
	 * */

	public void homeUI() {

		render("/home.html");
	}
	public void index() {

		renderText("此方法是一个action");
	}
	
}



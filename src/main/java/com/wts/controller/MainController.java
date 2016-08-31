package com.wts.controller;


import com.jfinal.core.Controller;

public class MainController extends Controller {

	/**
	 * 主界面
	 * */
    public void main() {
        render("dist/index.html");
    }

}



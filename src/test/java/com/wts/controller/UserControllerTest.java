package com.wts.controller;

import com.jfinal.core.Controller;
import com.wts.entity.User;
import org.junit.Test;

import java.util.List;

public class UserControllerTest  {

    @Test
    public void testH() {
        UserController u= new UserController();
        u.h();
        System.out.println();
    }
}

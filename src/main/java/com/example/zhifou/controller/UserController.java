package com.example.zhifou.controller;

import com.example.zhifou.VO.ResultVO;
import com.example.zhifou.entity.AnswerInfo;
import com.example.zhifou.entity.QuestionInfo;
import com.example.zhifou.entity.UserInfo;
import com.example.zhifou.service.AnswerService;
import com.example.zhifou.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpSession;
import java.util.*;

@Controller
@RequestMapping("/user")
public class UserController {
    @Autowired
    UserService userService;
    @Autowired
    AnswerService answerService;

    @GetMapping("/register")
    public String register(){
        return "zhifou_register";
    }

    @GetMapping("/main")
    public String mainPage(){
        return "zhifou_main";
    }

    @PostMapping("/login")
    @ResponseBody
    public String login(@RequestBody Map<String,String> map, HttpSession session){
        String userUserName = map.get("userUserName");
        String userPassword = map.get("userPassword");
        UserInfo userInfo = userService.login(userUserName,userPassword);
        session.setAttribute("userInfo",userInfo);
        if(userInfo!=null){
            return "success";
        }
        else{
            return "failed";
        }
    }

    @PostMapping("/register/load")
    @ResponseBody
    public String registerLoad(@RequestBody Map<String,String> map){
        String userUserName = map.get("userUserName");
        String userPassword = map.get("userPassword");
        String userNickName = map.get("userNickName");
        UserInfo userInfo = userService.register(userUserName,userPassword,userNickName);
        if(userInfo!=null){
            return "success";
        }
        else{
            return "failed";
        }
    }





}

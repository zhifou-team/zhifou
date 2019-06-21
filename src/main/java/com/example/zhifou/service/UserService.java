package com.example.zhifou.service;

import com.example.zhifou.entity.UserAnswer;
import com.example.zhifou.entity.UserInfo;
import com.example.zhifou.entity.UserQuestion;
import com.example.zhifou.repository.UserAnswerRepository;
import com.example.zhifou.repository.UserInfoRepository;
import com.example.zhifou.repository.UserQuestionRepository;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
@Service
public class UserService {
    @Autowired
    private UserInfoRepository userInfoRepository;
    @Autowired
    private UserAnswerRepository userAnswerRepository;
    @Autowired
    private UserQuestionRepository userQuestionRepository;

    public UserInfo findByUserId(int userId) {
        return userInfoRepository.findByUserId(userId);
    }

    public UserInfo save(UserInfo userInfo) {
        return userInfoRepository.save(userInfo);
    }



    public UserQuestion save(UserQuestion userQuestion) {
        return userQuestionRepository.save(userQuestion);
    }

    public UserAnswer save(UserAnswer userAnswer){
        return userAnswerRepository.save(userAnswer);
    }

    public UserInfo register(String userUserName, String userPassword,String userNickname){
        UserInfo userInfo = new UserInfo();
        UserInfo check = userInfoRepository.findByUserUsername(userUserName);
        if(check != null){
            return null;
        }
        //System.out.println(check);
        userInfo.setUserUsername(userUserName);
        userInfo.setUserPassword(userPassword);
        userInfo.setUserNickname(userNickname);
        userInfo.setCreateTime(new Date());
        userInfo.setUpdateTime(new Date());
        save(userInfo);
        return userInfo;
    }

    public UserInfo login(String userUserName, String userPassword){
        UserInfo userInfo = userInfoRepository.findByUserUsername(userUserName);
        System.out.println(userInfo);
        if(userInfo!=null && userInfo.getUserPassword().equals(userPassword)){
            return userInfo;
        }
        else{
            return null;
        }
    }

    public void delete(UserInfo userInfo) {
        userInfoRepository.delete(userInfo);
    }

}
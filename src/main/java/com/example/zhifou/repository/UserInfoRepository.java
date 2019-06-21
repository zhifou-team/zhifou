package com.example.zhifou.repository;

import com.example.zhifou.entity.UserInfo;
import com.example.zhifou.entity.UserQuestion;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserInfoRepository extends JpaRepository<UserInfo,Integer> {
    UserInfo findByUserId(int userId);
    UserInfo findByUserUsername(String userUserName);

}

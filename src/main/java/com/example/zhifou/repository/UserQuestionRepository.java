package com.example.zhifou.repository;

import com.example.zhifou.entity.UserQuestion;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserQuestionRepository extends JpaRepository<UserQuestion,Integer>{

}

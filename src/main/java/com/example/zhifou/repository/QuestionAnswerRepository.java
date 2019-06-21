package com.example.zhifou.repository;

import com.example.zhifou.entity.QuestionAnswer;
import com.example.zhifou.entity.QuestionInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionAnswerRepository extends JpaRepository<QuestionAnswer,Integer> {
    public QuestionAnswer findByAnswerId(int id);
}

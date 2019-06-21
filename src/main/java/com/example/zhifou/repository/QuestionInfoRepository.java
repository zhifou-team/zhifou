package com.example.zhifou.repository;

import com.example.zhifou.entity.QuestionInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionInfoRepository extends JpaRepository<QuestionInfo,Integer> {
    public QuestionInfo findQuestionInfoByQuestionId(int id);
}

package com.example.zhifou.repository;

import com.example.zhifou.entity.AnswerInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnswerInfoRepository extends JpaRepository<AnswerInfo,Integer> {
    public AnswerInfo findAnswerInfoByAnswerId(int id);
}

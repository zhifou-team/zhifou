package com.example.zhifou.service;

import com.example.zhifou.entity.QuestionAnswer;
import com.example.zhifou.entity.QuestionInfo;
import com.example.zhifou.repository.QuestionAnswerRepository;
import com.example.zhifou.repository.QuestionInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class QuestionService {
    @Autowired
    private QuestionAnswerRepository questionAnswerRepository;
    @Autowired
    private QuestionInfoRepository questionInfoRepository;

    public QuestionAnswer save(QuestionAnswer questionAnswer){
        return questionAnswerRepository.save(questionAnswer);
    }

    public QuestionInfo save(QuestionInfo questionInfo){
        return questionInfoRepository.save(questionInfo);
    }
    public QuestionInfo findQuestionInfoById(int id){
        return questionInfoRepository.findQuestionInfoByQuestionId(id);
    }



}

package com.example.zhifou.service;

import com.example.zhifou.entity.AnswerInfo;
import com.example.zhifou.entity.QuestionAnswer;
import com.example.zhifou.entity.QuestionInfo;
import com.example.zhifou.repository.AnswerInfoRepository;
import com.example.zhifou.repository.QuestionAnswerRepository;
import com.example.zhifou.repository.UserInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnswerService {
    @Autowired
    private AnswerInfoRepository answerInfoRepository;
    @Autowired
    private QuestionAnswerRepository questionAnswerRepository;
    @Autowired
    private QuestionService questionService;

    public List<AnswerInfo> findAllAnswer(){
        return answerInfoRepository.findAll();
    }

    public AnswerInfo saveAnswerInfo(AnswerInfo answerInfo){
        return answerInfoRepository.save(answerInfo);
    }

    public QuestionInfo findQuestionInfo(AnswerInfo answerInfo){
        int id = answerInfo.getAnswerId();
        QuestionAnswer questionAnswer = questionAnswerRepository.findByAnswerId(id);
        return questionService.findQuestionInfoById(questionAnswer.getQuestionId());
    }
    public AnswerInfo findAnswerInfoById(int id){
        return answerInfoRepository.findAnswerInfoByAnswerId(id);
    }



}

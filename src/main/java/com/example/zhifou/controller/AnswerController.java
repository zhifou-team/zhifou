package com.example.zhifou.controller;

import com.example.zhifou.VO.ResultVO;
import com.example.zhifou.entity.AnswerInfo;
import com.example.zhifou.entity.QuestionInfo;
import com.example.zhifou.service.AnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Controller
@RequestMapping("/answer")
public class AnswerController {
    @Autowired
    AnswerService answerService;

    @PostMapping("/full")
    @ResponseBody
    public ResultVO showFull(@RequestParam("answerId") int answerId){
        ResultVO result = new ResultVO();
        AnswerInfo answerInfo = answerService.findAnswerInfoById(answerId);
        result.setCode(1);
        result.setMsg("已成功");
        result.setData(answerInfo.getAnswerDescription());
        return result;
    }


    @GetMapping("/part")
    @ResponseBody
    public ResultVO findAllAnswer(){
        ResultVO result = new ResultVO();
        List<AnswerInfo> answerInfoList = answerService.findAllAnswer();
        ArrayList<HashMap> maps = new ArrayList<HashMap>();
        int count = 0;
        for(AnswerInfo answerInfo : answerInfoList){
            QuestionInfo questionInfo = answerService.findQuestionInfo(answerInfo);
            HashMap map = new HashMap();
            map.put("questionTitle",questionInfo.getQuestionTitle());
            map.put("answerStar",answerInfo.getAnswerStar());
            map.put("answerExtraction",answerInfo.getAnswerExtraction());
            map.put("answerId",answerInfo.getAnswerId());
            maps.add(map);
            count++;
            if(count > 20){
                break;
            }
        }
        //result.setCode(1);
        //result.setMsg("已成功");
        result.setData(maps);
        return result;
    }

}

package com.example.zhifou.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.example.zhifou.entity.AnswerInfo;
import com.example.zhifou.entity.QuestionAnswer;
import com.example.zhifou.entity.QuestionInfo;
import com.example.zhifou.entity.UserInfo;
import com.example.zhifou.service.AnswerService;
import com.example.zhifou.service.QuestionService;
import com.example.zhifou.service.UserService;
import com.example.zhifou.utils.StringUtil;
import com.mysql.cj.xdevapi.JsonArray;
import org.hibernate.Session;
import org.hibernate.SessionBuilder;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.io.*;
import java.util.Date;
import java.util.Map;
@Controller
@RequestMapping("/json")
public class JsonController {
    @Autowired
    UserService userService;
    @Autowired
    AnswerService answerService;
    @Autowired
    QuestionService questionService;
    @RequestMapping("/test")
    public String test() throws IOException {
        writeToDB();
        return "zhifou_main";
    }

    public void writeToDB() throws IOException{
        File file = new File("C:\\Users\\DELL-PC\\Documents\\GitHub\\zhifouWeb\\src\\main\\resources\\json");
        File[] files = file.listFiles();
        int fileNumber = 1;
        int j = 1;
        for(File fileIndex: files) {
            System.out.println(fileIndex);
            String jsonString = readJsonFile(fileIndex.getAbsolutePath());
            JSONObject jsonObject = JSON.parseObject(jsonString);
            String questionTitle = jsonObject.getString("title");
            int answerFollowers = jsonObject.getInteger("followers");
            JSONArray answers = jsonObject.getJSONArray("answers");
            for (int i = j; i < answers.size(); i++) {
                j++;
                JSONObject answer = answers.getJSONObject(i);
                String userNickname = answer.getString("userNickname");
                String userDescription = answer.getString("userDescription");
                String userImageUrl = answer.getString("userImageUrl");
                String answerExtraction = answer.getString("answerExtraction");
                int answerStar = answer.getInteger("answerStar");
                String answerDescription = answer.getString("answerDescription");
                UserInfo userInfo = new UserInfo();
                userInfo.setUserId(i);
                userInfo.setUserNickname(userNickname);
                userInfo.setUserDescription(userDescription);
                userInfo.setUserUsername(StringUtil.createUserUsername());
                userInfo.setUserPassword(StringUtil.createUserUsername());
                userInfo.setUserImageUrl(userImageUrl);
                userInfo.setCreateTime(new Date());
                userInfo.setUpdateTime(new Date());
                userService.save(userInfo);

                AnswerInfo answerInfo = new AnswerInfo();
                answerInfo.setAnswerId(i);
                answerInfo.setAnswerStar(answerStar);
                answerInfo.setAnswerExtraction(answerExtraction);
                answerInfo.setAnswerDescription(answerDescription);
                answerInfo.setCreateTime(new Date());
                answerInfo.setUpdateTime(new Date());
                answerInfo.setUserNickname(userNickname);
                answerService.saveAnswerInfo(answerInfo);

                QuestionAnswer questionAnswer = new QuestionAnswer();
                questionAnswer.setQuestionId(fileNumber);
                questionAnswer.setAnswerId(i);
                questionAnswer.setQaId(i);
                questionService.save(questionAnswer);

            }
            QuestionInfo questionInfo = new QuestionInfo();
            questionInfo.setCreateTime(new Date());
            questionInfo.setUpdateTime(new Date());
            questionInfo.setQuestionDescription(" ");
            questionInfo.setQuestionFollowers(0);
            questionInfo.setQuestionId(fileNumber);
            questionInfo.setQuestionTitle(questionTitle);
            questionInfo.setUserId(1);
            questionService.save(questionInfo);
        }
    }
    /**
     * 读取json文件，返回json串
     * @param fileName
     * @return
     */
    public static String readJsonFile(String fileName) throws IOException {
        String jsonStr = "";
        try {
            File jsonFile = new File(fileName);
            FileReader fileReader = new FileReader(jsonFile);

            Reader reader = new InputStreamReader(new FileInputStream(jsonFile),"utf-8");
            int ch = 0;
            StringBuffer sb = new StringBuffer();
            while ((ch = reader.read()) != -1) {
                sb.append((char) ch);
            }
            fileReader.close();
            reader.close();
            jsonStr = sb.toString();
            return jsonStr;
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
}

package com.example.zhifou.entity;

import com.sun.javafx.beans.IDProperty;
import lombok.Data;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.Date;

@Data
@Entity
@DynamicUpdate
public class AnswerInfo {
    @Id
    private int answerId;
    private String answerExtraction;
    private String answerDescription;
    private int answerStar;
    private String userNickname;
    private Date createTime;
    private Date updateTime;


}

package com.example.zhifou.entity;

import lombok.Data;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.Date;

@Data
@Entity
@DynamicUpdate
public class QuestionInfo {
    @Id
    private int questionId;
    private String questionTitle;
    private String questionDescription;
    private int  questionFollowers;
    private int userId;
    private Date createTime;
    private Date updateTime;
}

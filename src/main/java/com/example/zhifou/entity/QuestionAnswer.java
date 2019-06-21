package com.example.zhifou.entity;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;

@Data
@Entity
public class QuestionAnswer {
    @Id
    private int qaId;
    private int questionId;
    private int answerId;
}

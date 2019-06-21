package com.example.zhifou.entity;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;

@Data
@Entity
public class UserQuestion {
    @Id
    private int uqId;
    private int userId;
    private int questionId;
}

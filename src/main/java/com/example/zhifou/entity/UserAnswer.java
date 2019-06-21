package com.example.zhifou.entity;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;

@Data
@Entity
public class UserAnswer {
    @Id
    private int uaId;
    private int userId;
    private int answerId;
}

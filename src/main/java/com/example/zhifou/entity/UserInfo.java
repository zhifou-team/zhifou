package com.example.zhifou.entity;

import lombok.Data;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.Date;

@Data
@DynamicUpdate
@Entity
public class UserInfo {
    @Id
    private int userId;
    private String userUsername;
    private String userPassword;
    private String userNickname;
    private String userDescription;
    private String userImageUrl;
    private Date createTime;
    private Date updateTime;

}

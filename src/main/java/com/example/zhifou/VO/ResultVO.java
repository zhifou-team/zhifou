package com.example.zhifou.VO;


import lombok.Data;

@Data
public class ResultVO {
    // 0 表示失败， 1表示成功；
    private int code;
    private String msg;
    private Object data;
}

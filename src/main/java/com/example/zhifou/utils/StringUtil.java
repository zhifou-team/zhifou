package com.example.zhifou.utils;

import org.junit.Test;

import java.math.BigDecimal;
import java.util.Random;

public class StringUtil {

    public static String createUserUsername(){
        Random random = new Random();
        Integer integer1 = new Integer(10000+random.nextInt(89999));
        String string1 = integer1.toString();
        Integer integer2 = new Integer(10000+random.nextInt(89999));
        String string2 = integer2.toString();
        String string = "1"+ string1 + string2;
        return string;
    }
}

package com.EatingTracker.back.controller ;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.EatingTracker.back.service.MealService;

import org.springframework.web.bind.annotation.RequestParam;
import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;

@RestController
@RequestMapping("/meal")
public class MealController{


    @Autowired
    MealService mealService;

    @GetMapping()
    public String getMethodName(@RequestParam String param) {
        mealService.createMeal(param);
        return new String("created");
    }
    

}
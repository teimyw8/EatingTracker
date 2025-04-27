package com.EatingTracker.back.controllers;
import org.springframework.web.bind.annotation.*;

import com.EatingTracker.back.services.MealService;
import com.EatingTracker.back.models.Meal;

import org.springframework.beans.factory.annotation.Autowired;


@RestController
@RequestMapping("/meal")
public class MealController{


    @Autowired
    MealService mealService;

    @PostMapping()
    public String addMeal(@RequestBody Meal newMeal) {
        mealService.addMeal(newMeal);
        return "created";
    }


    

}
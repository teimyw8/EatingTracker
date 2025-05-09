package com.EatingTracker.back.controllers;
import org.springframework.web.bind.annotation.*;

import com.EatingTracker.back.services.MealService;
import com.EatingTracker.back.models.MealModel;
import com.EatingTracker.back.models.MealModel;

import org.springframework.beans.factory.annotation.Autowired;


@RestController
@RequestMapping("/meal")
public class MealController{

    // TODO HOOKUP TO SERVICE METHODS AND DECIDE RESPONSE FORMAT

    @Autowired
    MealService mealService;

    @PostMapping()
    public String addMeal(@RequestBody MealModel newMeal) {
        mealService.addMeal(newMeal);
        return "created";
    }

    @GetMapping()
    public String getMeal(@RequestParam String id) {
        return new String();
    }

    @GetMapping("/all")
    public String getAllMeal(@RequestParam String max) {
        return new String();
    }

    @PostMapping("/edit")
    public String editMeal(@RequestBody String id){
        return new String();

    }

    @PostMapping("/delete")
    public String deleteMeal(@RequestBody String id){
        return new String();

    }
    

}
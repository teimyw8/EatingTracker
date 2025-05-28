package com.EatingTracker.back.controllers;
import org.springframework.web.bind.annotation.*;

import com.EatingTracker.back.services.MealService;

import exceptions.IngrNotFoundException;

import com.EatingTracker.back.entities.Meal;
import com.EatingTracker.back.models.MealModel;
import com.EatingTracker.back.models.MealModel;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;


@RestController
@RequestMapping("/meal")
public class MealController{

    // TODO HOOKUP TO SERVICE METHODS AND DECIDE RESPONSE FORMAT

    @Autowired
    MealService mealService;

    @PostMapping()
    public ResponseEntity<Meal> addMeal(@RequestBody MealModel newMeal) {
        
        try {
            ResponseEntity<Meal> response = mealService.addMeal(newMeal);
            return response;
        } catch (IngrNotFoundException e){
            System.out.println("Exception caught :  " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
       
    }

    @GetMapping()
    public ResponseEntity<MealModel> getMeal(@RequestParam UUID id) {
        return mealService.getMeal(id);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Meal>> getAllMeal(@RequestParam Optional<Integer> max) {
        return mealService.getAllMeal(max);
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
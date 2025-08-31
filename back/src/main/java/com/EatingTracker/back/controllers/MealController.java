package com.EatingTracker.back.controllers;
import org.springframework.web.bind.annotation.*;

import com.EatingTracker.back.services.MealService;

import exceptions.IngrNotFoundException;

import com.EatingTracker.back.entities.Meal;
import com.EatingTracker.back.models.EditMealObject;
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
@CrossOrigin("http://localhost:3000")
@RequestMapping("/meal")
public class MealController{

    

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

    //TODO 
    @PostMapping("/edit")
    public ResponseEntity<MealModel> editMeal(@RequestBody EditMealObject body ){
        //System.out.println();
        return mealService.editMeal(body.getId(), body.getNewMeal());
    }

    //TODO
    @DeleteMapping
    public ResponseEntity<String> deleteMeal(@RequestParam String id){
        
        return mealService.deleteMeal(id);
    }
    

}
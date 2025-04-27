package com.EatingTracker.back.services;

import com.EatingTracker.back.models.Meal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.EatingTracker.back.repositories.MealRepository;
import com.EatingTracker.back.entities.MealEnt;

@Service
public class MealService {

    
    @Autowired 
    MealRepository mealRepository;

    public void addMeal(Meal x){
        Meal newMeal = x;

        try{
            //mealRepository.saveAndFlush(newMeal);
            System.out.printf("Meal with name %s added", x);
            
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }

        
    }
}

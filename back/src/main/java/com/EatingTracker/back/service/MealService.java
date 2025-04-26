package com.EatingTracker.back.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.EatingTracker.back.repository.MealRepository;
import com.EatingTracker.back.model.Meal;

@Service
public class MealService {

    
    @Autowired 
    MealRepository mealRepository;

    public void createMeal(String x){
        Meal newMeal = new Meal(x);
        try{
            mealRepository.saveAndFlush(newMeal);
            System.out.printf("Meal with name %s added", x);
            
        } catch (Exception e) {
System.out.println(e.getMessage());
        }

        
    }
}

package com.EatingTracker.back.services;

import com.EatingTracker.back.models.MealModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.EatingTracker.back.repositories.MealRepository;
import com.EatingTracker.back.entities.Meal;

@Service
public class MealService {

    //      TODO ALL

    @Autowired 
    MealRepository mealRepository;

    public void addMeal(MealModel x){
        MealModel newMeal = x;

        try{
            //mealRepository.saveAndFlush(newMeal);
            System.out.printf("Meal with name %s added", x);
            
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }

        
    }

    public void getMeal(int id){

    }

    public void getAllMeal(int max){

    }

    public void editMeal(int id){

    }

    public void delMeal(int id) {
        
    }
}


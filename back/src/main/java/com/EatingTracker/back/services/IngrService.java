package com.EatingTracker.back.services;

import com.EatingTracker.back.entities.Ingr;
import com.EatingTracker.back.helpers.IngrHelper;
import com.EatingTracker.back.models.IngrModel;
import com.EatingTracker.back.repositories.IngrRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.EatingTracker.back.repositories.MealRepository;
import com.EatingTracker.back.entities.Meal;

@Service
public class IngrService {

    // TODO ALL
    @Autowired
    IngrRepository ingrRepository;

    public void addIngr(IngrModel x){
        Ingr newEnt = IngrHelper.toIngrEnt(x);

        try{
            ingrRepository.saveAndFlush(newEnt);
            System.out.printf("Ingr with name %s added", newEnt.getName());

        } catch (Exception e) {
            System.out.println(e.getMessage());
        }


    }

    public void getIngr(int id){

    }

    public void getAllIngr(int max){

    }

    public void editIngr(int id){

    }

    public void delIngr(int id) {

    }
}

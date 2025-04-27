package com.EatingTracker.back.services;

import com.EatingTracker.back.entities.IngrEnt;
import com.EatingTracker.back.helpers.IngrHelper;
import com.EatingTracker.back.models.Ingr;
import com.EatingTracker.back.repositories.IngrRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.EatingTracker.back.repositories.MealRepository;
import com.EatingTracker.back.entities.MealEnt;

@Service
public class IngrService {


    @Autowired
    IngrRepository ingrRepository;

    public void addIngr(Ingr x){
        IngrEnt newEnt = IngrHelper.toIngrEnt(x);

        try{
            ingrRepository.saveAndFlush(newEnt);
            System.out.printf("Ingr with name %s added", newEnt.getName());

        } catch (Exception e) {
            System.out.println(e.getMessage());
        }


    }
}

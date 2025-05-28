package com.EatingTracker.back.models;

import java.util.UUID;

import com.EatingTracker.back.entities.MealIngr;

public class MealIngrModel {
    private String ingrId;
    private float amm;

    public MealIngrModel(){

    }

    public MealIngrModel(String ingrId, float getAmm){
        this.ingrId = ingrId;
    }   

    public MealIngrModel(MealIngr mealIngr){
        this.ingrId = mealIngr.getIngrId().toString();
        this.amm = mealIngr.getAmm();
    }

    public String getIngrId() {
        return ingrId;
    }

    public float getAmm() {
        return amm;
    }
    
    
}

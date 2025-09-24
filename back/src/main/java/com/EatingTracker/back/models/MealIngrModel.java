package com.EatingTracker.back.models;

import java.util.UUID;

import com.EatingTracker.back.entities.MealIngr;

public class MealIngrModel {
    private String ingrId;
    private float amm;
    private IngrModel ingr;

    public MealIngrModel(){

    }

    public MealIngrModel(float amm, IngrModel ingr) {
        this.amm = amm;
        this.ingr = ingr;
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

    public IngrModel getIngr() {
        return ingr;
    }

    public void setIngr(IngrModel ingr) {
        this.ingr = ingr;
    }

    public void setIngrId(String ingrId) {
        this.ingrId = ingrId;
    }

    public void setAmm(float amm) {
        this.amm = amm;
    }
}

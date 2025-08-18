package com.EatingTracker.back.models;

import java.util.List;

import com.EatingTracker.back.entities.Meal;

public class MealModel {
    private String id; 
    private String name;
    private List<MealIngrModel> ingrs;

        
    public MealModel(){}

    public MealModel(Meal meal, List<MealIngrModel> ingrs) {
        this.id = meal.getId().toString();
        this.name = meal.getName();
        this.ingrs = ingrs;
    }

    public MealModel(String name, List<MealIngrModel> ingrs) {
        this.name = name;
        this.ingrs = ingrs;
    }

    public MealModel(String id, String name, List<MealIngrModel> ingrs) {
        this.id = id;
        this.name = name;
        this.ingrs = ingrs;
    }

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public List<MealIngrModel> getIngrs() {
        return ingrs;
    }
    public void setIngrs(List<MealIngrModel> ingrs) {
        this.ingrs = ingrs;
    }

}

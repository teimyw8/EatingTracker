package com.EatingTracker.back.models;

import java.util.List;

public class MealModel {

    private String name;
    private List<MealIngrModel> ingrs;

        
    public MealModel(){}

    public MealModel(String name, List<MealIngrModel> ingrs) {
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

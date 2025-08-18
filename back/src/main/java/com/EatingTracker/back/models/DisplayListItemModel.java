package com.EatingTracker.back.models;

public class DisplayListItemModel {
    private int type;
    private MealModel meal;
    private IngrModel ingr;

    public DisplayListItemModel() {}

    public DisplayListItemModel(int type, MealModel meal) {
        this.type = type;
        this.meal = meal;  
    }


    public DisplayListItemModel(int type,  IngrModel ingr) {
        this.type = type;
        this.ingr = ingr;
    }

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }

    public MealModel getMeal() {
        return meal;
    }

    public void setMeal(MealModel meal) {
        this.meal = meal;
    }

    public IngrModel getIngr() {
        return ingr;
    }

    public void setIngr(IngrModel ingr) {
        this.ingr = ingr;
    }

    

}

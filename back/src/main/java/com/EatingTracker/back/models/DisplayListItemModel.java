package com.EatingTracker.back.models;

import com.EatingTracker.back.entities.EatenItemType;

public class DisplayListItemModel {
    private EatenItemType type;
    private MealModel meal;
    private IngrModel ingr;
    private boolean isClicked;

    public DisplayListItemModel() {}

    public DisplayListItemModel(EatenItemType type, MealModel meal) {
        this.type = type;
        this.meal = meal;
        this.isClicked = false;
    }


    public DisplayListItemModel(EatenItemType type,  IngrModel ingr) {
        this.type = type;
        this.ingr = ingr;
        this.isClicked = false;
    }

    public EatenItemType getType() {
        return type;
    }

    public void setType(EatenItemType type) {
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

package com.EatingTracker.back.models;

public class EditMealObject {
    private String id;
    private MealModel newMeal;

    public EditMealObject() {
    }
    public EditMealObject(String id, MealModel newMeal) {
        this.id = id;
        this.newMeal = newMeal;
    }
    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
    public MealModel getNewMeal() {
        return newMeal;
    }
    public void setNewMeal(MealModel newMeal) {
        this.newMeal = newMeal;
    }

    
}

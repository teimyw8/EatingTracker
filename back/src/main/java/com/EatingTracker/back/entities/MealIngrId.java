package com.EatingTracker.back.entities;

import java.io.Serializable;
import java.util.UUID;

public class MealIngrId implements Serializable {

    private UUID mealid;

    private UUID ingrid;

    public MealIngrId(){

    }

    public MealIngrId(UUID mealId, UUID ingrId) {
        this.mealid = mealId;
        this.ingrid = ingrId;
    }

    
}

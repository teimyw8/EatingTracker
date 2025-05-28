package com.EatingTracker.back.entities;

import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;

@Entity
@IdClass(MealIngrId.class)
@Table(name="mealingr")
public class MealIngr {

    @Id
    @Column
    private UUID ingrid;

    @Id
    @Column
    private UUID mealid;

    @Column
    private float amm;

    public MealIngr(){
        
    }

    public MealIngr(UUID ingrId, UUID mealId, float amm) {
        this.ingrid = ingrId;
        this.mealid = mealId;
        this.amm = amm;
    }

    public UUID getIngrId() {
        return ingrid;
    }

    public void setIngrId(UUID ingrId) {
        this.ingrid = ingrId;
    }

    public UUID getMealId() {
        return mealid;
    }

    public void setMealId(UUID mealId) {
        this.mealid = mealId;
    }

    public float getAmm() {
        return amm;
    }

    public void setAmm(float amm) {
        this.amm = amm;
    }

    
    
}

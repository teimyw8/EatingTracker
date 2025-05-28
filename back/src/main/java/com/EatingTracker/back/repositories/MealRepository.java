package com.EatingTracker.back.repositories;

import com.EatingTracker.back.entities.Meal;

import java.util.UUID;

import org.springframework.data.jpa.repository.*;



public interface MealRepository extends JpaRepository<Meal, UUID> {
    
    
}
 

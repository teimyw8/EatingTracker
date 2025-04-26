package com.EatingTracker.back.repository;

import com.EatingTracker.back.model.Meal;
import org.springframework.data.jpa.repository.*;



public interface MealRepository extends JpaRepository<Meal, Long> {
    
}
 

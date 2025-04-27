package com.EatingTracker.back.repositories;

import com.EatingTracker.back.entities.MealEnt;
import org.springframework.data.jpa.repository.*;



public interface MealRepository extends JpaRepository<MealEnt, Long> {
    
}
 

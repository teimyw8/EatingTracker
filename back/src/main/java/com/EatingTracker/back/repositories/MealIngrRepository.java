package com.EatingTracker.back.repositories;

import com.EatingTracker.back.entities.MealIngr;
import com.EatingTracker.back.entities.MealIngrId;
import com.EatingTracker.back.models.MealIngrModel;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.*;

public interface MealIngrRepository extends JpaRepository<MealIngr, MealIngrId> {

    List<MealIngr> findByMealid(UUID mealid);

    public static List<MealIngrModel> mealIngrListToModel(List<MealIngr> mealIngrs){
        //TODO null check throw bad request
        List<MealIngrModel> modelList = new ArrayList<MealIngrModel>();
        for (MealIngr mealIngr : mealIngrs){
            modelList.add(new MealIngrModel(mealIngr));
        }

        return modelList;

    }
}
